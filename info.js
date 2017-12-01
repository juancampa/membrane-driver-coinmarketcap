const { dependencies, endpoints, environment, expressions, imports, schema } = program;

program.name = 'coinmarketcap';

expressions
  .add('symbol', '^[A-Z]{3,5}$')

schema.type('Root')
  .field('currencies', 'CurrencyCollection')

schema.type('CurrencyCollection')
  .computed('one', 'Currency')
    .param('id', 'String')
  .computed('items', '[Currency]')

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


