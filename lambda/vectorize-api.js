
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const apiUrl = 'https://api.vectorizer.ai/api/v1/vectorize';
    const apiHeaders = {
        ...event.headers,
        "Authorization": `Basic ${process.env.VECTORIZER_API_KEY}`
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: apiHeaders,
            body: event.body
        });

        // If response is not OK, return the response as text
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: await response.text()
            };
        }

        // Return the JSON response
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error vectorizing the image: ${error.message}`
        };
    }
};
