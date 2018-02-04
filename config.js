const { dependencies, endpoints, environment, expressions, imports, schema } = program;

expressions
  .add('symbol', '^[A-Z]{3,5}$')
  .add('url', '^https://coinmarketcap.com/currencies/.*$')

schema.type('Root')
  .field('currencies', 'CurrencyCollection')

schema.type('CurrencyCollection')
  .computed('one', 'Currency')
    .param('id', 'String')
  .computed('page', 'CurrencyPage')
    .param('start', 'Int')
    .param('pageSize', 'Int')
  .computed('count', 'Int')

schema.type('CurrencyPage')
  .field('next', 'CurrencyPage*')
  .field('items', '[Currency]')

schema.type('Currency')
  .computed('self', 'Currency*')
  .field('id', 'String')
  .field('name', 'String')
  .field('symbol', 'String')
  .field('rank', 'Int')
  .computed('priceUsd', 'Float')
  .computed('priceBtc', 'Float')
  .computed('volumeUsd24h', 'Float')
  .computed('marketCapUsd', 'Float')
  .computed('availableSupply', 'Float')
  .computed('totalSupply', 'Float')
  .computed('maxSupply', 'Float')
  .computed('percentChange1h', 'Float')
  .computed('percentChange24h', 'Float')
  .computed('percentChange7d', 'Float')
  .computed('lastUpdated', 'Int')


