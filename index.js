import * as client from './client';
import { parse as parseUrl } from 'url';
import symbols from './symbols';

const { root } = program.refs;

export const init = () => {
  return root.set({ currencies: {} });
}

export const parse = ({ name, value }) => {
  switch (name) {
    case 'symbol': {
      return root.currencies.one({ id: symbols[value] });
    }
    case 'url': {
      const { pathname: path } = parseUrl(value, true);
      const parts = path.split('/');
      if (parts.length >= 3) {
        return root.currencies.one({ id: parts[2] });
      }
      break;
    }
  }
}

export const CurrencyCollection = {
  async one({ args }) {
    const result = await client.get(`/ticker/${args.id}`);
    return result[0];
  },

  async page({ self, args }) {
    // Get the items in this page
    let query = { limit: args.pageSize || 100, start: args.start || 0 };
    const items = await client.get(`/ticker/`, query);

    // Compute a ref to the next page
    const start = (args.start || 0) + items.length;
    const next = root.currencies.page({ ...args, start })

    return { items, next }
  },

  async count() {
    const result = await client.get(`/global/`);
    return result.active_currencies + result.active_assets;
  }
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
