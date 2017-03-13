var request = require('request');

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
    var url     = params.kwargs.url;
    var headers = params.kwargs.headers || {};
    var query   = params.kwargs.params || {};
    var data    = params.kwargs.data;
    var method  = (params.kwargs.method || 'GET').toUpperCase();
    var cookie  = params.kwargs.cookie;

    var j = request.jar();

    if (cookie && cookie.length)
        j.setCookie(request.cookie(cookie));

    var options = {
        method: method,
        uri: url,
        formData: data,
        headers: headers,
        qs: query,
        jar: j
    }

    return request(options, callback);
};
