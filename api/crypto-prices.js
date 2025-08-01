const axios = require('axios');

// CoinMarketCap API configuration
const CMC_API_KEY = process.env.CMC_API_KEY || '92fe215e-edac-4a39-9b6c-f4bb30805ec4';
const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-CMC_PRO_API_KEY');
  res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight request for 24 hours

  if (req.method === 'GET') {
    try {
      const response = await axios.get(CMC_API_URL, {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          start: '1',
          limit: '100',
          convert: 'USD'
        }
      });

      // Process the data to match the format expected by the frontend
      const cryptoData = response.data.data.map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.quote.USD.price,
        change24h: crypto.quote.USD.percent_change_24h,
        marketCap: crypto.quote.USD.market_cap
      }));

      res.status(200).json({
        status: 'success',
        data: cryptoData
      });
    } catch (error) {
      console.error('Error fetching crypto prices:', error.message);
      
      // Send error response
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch cryptocurrency prices',
        details: error.message
      });
    }
  } else if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
};
