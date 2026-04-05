const ALL_COIN_IDS = [
  "bitcoin", "ethereum", "solana", "binancecoin", "tether",
  "usd-coin", "tron", "litecoin", "dogecoin", "the-open-network",
].join(",");

interface PriceCache {
  data: Record<string, { idr: number; idr_24h_change: number }> | null;
  fetchedAt: number;
}

const priceCache: PriceCache = { data: null, fetchedAt: 0 };
const CACHE_TTL_MS = 60_000;

let inflight: Promise<PriceCache["data"]> | null = null;

async function fetchFromCoinGecko(attempt = 1): Promise<PriceCache["data"]> {
  const url =
    `https://api.coingecko.com/api/v3/simple/price` +
    `?ids=${ALL_COIN_IDS}&vs_currencies=idr&include_24hr_change=true`;
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "x-cg-demo-api-key": "CG-xgQhVXDYUW4FKzXgP8UfhTgC",
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    return res.json() as Promise<PriceCache["data"]>;
  } catch (err) {
    if (attempt < 3) {
      await new Promise(r => setTimeout(r, attempt * 1_500));
      return fetchFromCoinGecko(attempt + 1);
    }
    throw err;
  }
}

export async function getPrices(): Promise<PriceCache["data"]> {
  const now = Date.now();
  if (priceCache.data && now - priceCache.fetchedAt < CACHE_TTL_MS) {
    return priceCache.data;
  }
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const fresh = await fetchFromCoinGecko();
      priceCache.data = fresh;
      priceCache.fetchedAt = Date.now();
      return fresh;
    } catch {
      return priceCache.data;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
