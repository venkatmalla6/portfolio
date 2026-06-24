// Netlify Serverless Function: github-proxy.js
// This runs SERVER-SIDE on Netlify — the token is NEVER sent to the browser.
// The browser calls /.netlify/functions/github-proxy?endpoint=repos
// This function calls GitHub API with the token and returns the data.

export const handler = async (event) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'venkatmalla6';

  // CORS headers — only allow requests from your own domain
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Restrict to your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' };
  }

  const endpoint = event.queryStringParameters?.endpoint || 'repos';

  const githubHeaders = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${GITHUB_USERNAME}-portfolio`,
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  };

  try {
    let url;
    if (endpoint === 'repos') {
      url = 'https://api.github.com/user/repos?type=all&per_page=100&sort=updated';
    } else if (endpoint === 'user') {
      url = `https://api.github.com/users/${GITHUB_USERNAME}`;
    } else {
      return { statusCode: 400, headers: corsHeaders, body: 'Invalid endpoint' };
    }

    const response = await fetch(url, { headers: githubHeaders });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`GitHub API error ${response.status}: ${errText}`);
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: `GitHub API error: ${response.status}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        // Cache for 5 minutes to avoid rate limits
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Proxy error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
