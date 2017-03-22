# Distributed Scraper
[![stdlib service](http://badge.stdlib.com/service/?service=scrape&username=nemo&version=0.1.7)](https://stdlib.com/services/nemo/scrape)

This is a scraper function that automatically pulls in [metadata](https://github.com/wikimedia/html-metadata) from the page, as well as supports simple HTML querying using [cheerio](https://github.com/cheeriojs/cheerio).

It's built on top of [stdlib](https://stdlib.com) which makes it highly distributed and scalable.

## Usage

You can either use the ready service that's deployed on stdlib [here](http://stdlib.com/services/nemo/scrape), or fork this repository and launch your own version on [stdlib](https://stdlib.com).

### Example

For example, a simple scrape to pick up my own email address from Github (and a bunch of extra metadata):

```bash
lib nemo.scrape --url https://github.com/nemo --query "li[itemprop='email'] a"
```

```javascript
{ metadata:
   { general:
      { description: 'nemo has 36 repositories available. Follow their code on GitHub.',
        title: 'nemo (Nima Gardideh) · GitHub',
        lang: 'en' },
     openGraph:
      { app_id: '1401488693436528',
        image: [Object],
        site_name: 'GitHub',
        type: 'profile',
        title: 'nemo (Nima Gardideh)',
        url: 'https://github.com/nemo',
        description: 'nemo has 36 repositories available. Follow their code on GitHub.',
        username: 'nemo' },
     schemaOrg: { items: [Object] },
     twitter:
      { image: [Object],
        site: '@github',
        card: 'summary',
        title: 'nemo (Nima Gardideh)',
        description: 'nemo has 36 repositories available. Follow their code on GitHub.' } },
  url: 'https://github.com/nemo',
  query: 'li[itemprop=\'email\'] a',
  query_value: 'nima@halfmoon.ws'
}
```

You can view the function specification [here](http://stdlib.com/services/nemo/scrape).


# Notes
Note that this scraper does not support sites that are single page Javascript applications. You should also follow robot.txt rules when you're scraping websites. Use responsibly.

# License
MIT
