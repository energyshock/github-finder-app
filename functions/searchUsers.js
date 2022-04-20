const github = require('./github');

const handler = async event => {
  const params = new URLSearchParams(event.queryStringParameters);
  try {
    const response = await github.get(`/search/users?${params}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data.items),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;

    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
