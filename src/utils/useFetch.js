const fetch = require('node-fetch');
const config = require('../config');

async function useFetch(url, method = 'GET', body) {
    const response = await fetch(`https://projectmodern.gg/functions/${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'secret': config.secret,
        },
        body: JSON.stringify(body),
    });
  
    const data = await response.json();
  
    if (data && data.error || response.status === 500) throw new Error(data.error || 'There was a problem with our server. Try again later.');
  
    return data;
  }
  
  module.exports = useFetch;