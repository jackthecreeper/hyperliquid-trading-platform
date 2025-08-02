const fetch = require('node-fetch');

// Netlify serverless function handler
exports.handler = async (event, context) => {
  // CORS headers configuration
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
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
    // Construct URL with query parameters for CoinGecko API
    const url = new URL('https://api.coingecko.com/api/v3/coins/markets');
    url.searchParams.append('vs_currency', 'usd');
    url.searchParams.append('order', 'market_cap_desc');
    url.searchParams.append('per_page', '20');
    url.searchParams.append('page', '1');
    url.searchParams.append('sparkline', 'false');
    
    // Fetch data from CoinGecko API
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // Add detailed error handling for API requests
    if (!response.ok) {
      throw new Error(`CoinGecko API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the data to match the format expected by the frontend
    const cryptoData = data.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.current_price,
      change24h: crypto.price_change_percentage_24h,
      marketCap: crypto.market_cap,
      image: crypto.image
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
