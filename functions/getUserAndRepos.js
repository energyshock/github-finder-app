const github = require('./github');

const handler = async event => {
  const login = event.queryStringParameters.q;
  try {
    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos`),
    ]);

    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
      body: JSON.stringify({ user: user.data, repos: repos.data }),
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
