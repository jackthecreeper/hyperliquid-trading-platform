const fetch = require('node-fetch');

// CoinMarketCap API configuration
const CMC_API_KEY = process.env.CMC_API_KEY;

// Netlify serverless function handler
exports.handler = async (event, context) => {
  // CORS headers configuration
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-CMC_PRO_API_KEY',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Construct URL with query parameters
    const url = new URL('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');
    url.searchParams.append('start', '1');
    url.searchParams.append('limit', '100');
    url.searchParams.append('convert', 'USD');
    
    // Fetch data from CoinMarketcap API
                const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
                // Add detailed error handling for API requests
                if (!response.ok) {
                    throw new Error(`CoinMarketCap API responded with status ${response.status}`);
                }
                
                // Process the data to match the format expected by the frontend
                const cryptoData = data.data.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.quote.USD.price,
      change24h: crypto.quote.USD.percent_change_24h,
      marketCap: crypto.quote.USD.market_cap
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        data: cryptoData
      })
    };
  } catch (error) {
    console.error('Error fetching crypto prices:', error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to fetch cryptocurrency prices',
        details: error.message
      })
    };
  }
};
