import { root } from './schema';
import * as client from './client';
import symbols from './symbols';

export const init = () => {
  return root.set({ currencies: {} });
}

export const parse = ({ name, value }) => {
  switch (name) {
    case 'symbol': {
      return root.currencies.one({ id: symbols[value] });
    }
  }
}

export const CurrencyCollection = {
  async one({ args }) {
    const result = await client.get(`/ticker/${args.id}`);
    return result[0];
  },
  async items() {
    return client.get(`/ticker/`);
  },
}

export const Currency = {
  async self({ source }) {
    return root.currencies.one({ id: source.id });
  },
  priceUsd({ source }) {
    return source['price_usd'];
  },
  priceBtc({ source }) {
    return source['price_btc'];
  },
  volumeUsd24h({ source }) {
    return source['24h_volume_usd'];
  },
  marketCapUsd({ source }) {
    return source['market_cap_usd'];
  },
  availableSupply({ source }) {
    return source['available_supply'];
  },
  totalSupply({ source }) {
    return source['total_supply'];
  },
  maxSupply({ source }) {
    return source['max_supply'];
  },
  percentChange1h({ source }) {
    return source['percent_change_1h'];
  },
  percentChange24h({ source }) {
    return source['percent_change_24h'];
  },
  percentChange7d({ source }) {
    return source['percent_change_7d'];
  },
  lastUpdated({ source }) {
    return source['last_updated'];
  }
}
