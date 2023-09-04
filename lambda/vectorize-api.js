const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const apiUrl = 'https://api.vectorizer.ai/api/v1/vectorize';
    const apiHeaders = {
        "Authorization": `Basic ${process.env.VECTORIZER_API_KEY}`,
        "Content-Type": "multipart/form-data"   // Set the Content-Type for file upload
    };

    try {
        // Forward the received binary image data to the Vectorize API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: apiHeaders,
            body: event.body   // This should contain the binary data of the image
        });

        // Check for non-JSON responses
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') === -1) {
            // Not a JSON response
            return {
                statusCode: response.status,
                body: await response.text()
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error vectorizing the image. ${error.message}`
        };
    }
};
