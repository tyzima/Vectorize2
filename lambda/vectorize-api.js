const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const API_URL = "https://api.vectorizer.ai/api/v1/vectorize";
  const API_KEY = process.env.VECTORIZER_API_KEY;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + API_KEY,
      "Content-Type": "multipart/form-data"
    },
    body: event.body
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
