const _ = require('lodash');
const request = require('request');
const cheerio = require('cheerio');
const parseAll = require('html-metadata').parseAll;


/**
* Your function call
* @param {Object} params Execution parameters
*   Members
*   - {Array} args Arguments passed to function
*   - {Object} kwargs Keyword arguments (key-value pairs) passed to function
*   - {String} remoteAddress The IPv4 or IPv6 address of the caller
*
* @param {Function} callback Execute this to end the function call
*   Arguments
*   - {Error} error The error to show if function fails
*   - {Any} returnValue JSON serializable (or Buffer) return value
*/
module.exports = (params, callback) => {
    var url = params.kwargs.url || params.args[0];
    var query = params.kwargs.query || params.args[1];
    var userAgent = params.kwargs.userAgent || params.args[2];

    var options = {
        url: url,
        headers: {
            'User-Agent': userAgent || 'stdlib/request/scraper v0.1'
        }
    };

    request(options, function(err, response, body) {
      if (err) return callback(err)
      if (response.statusCode !== 200) return callback(null, body);
      var $ = cheerio.load(body);

      parseAll($, (err, metadata) => {
        if (err) return callback(err);

        var result = {
            metadata: metadata
        };

        function performQuery(q) {
          if (!q) return null;
          if (!q.length) return null;

          var matches = $(q);
          if (matches.length)
            return matches.toArray().map((el) => ($(el).text()))
          else
            return matches.text();
        }

        result.url = url;

        if (_.isArray(query)) {
          result.query = [];
          result.query_value = [];
          result.query_error = [];

          _.each(query, (q) => {
            try {
              let data = performQuery(q);
              result.query.push(q);
              result.query_value.push(data);
            }
            catch (e) {
              result.query_error.push(e && e.message || e)
            };
          });

        } else if (query && query.length) {
          result.query = query;
          try {
            result.query_value = performQuery(query);
          } catch (e) {
            result.query_error = e && e.message || e;
          }
        }

        return callback(null, result);
      });
    });
};
