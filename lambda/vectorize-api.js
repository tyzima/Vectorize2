
const request = require('request');

exports.handler = function(event, context, callback) {
    if (event.httpMethod !== 'POST') {
        callback(null, { statusCode: 405, body: 'Method Not Allowed' });
        return;
    }

    const apiUrl = 'https://api.vectorizer.ai/api/v1/vectorize';

    const formData = {
        image: event.body // assuming the image is being sent as binary in the body
        // TODO: Add more upload options here based on the API's parameters
    };

    request.post({
        url: apiUrl,
        formData: formData,
        auth: {user: 'vkvnbyc5irrvjbi', pass: 'u8uqg816t4bq8kqnov8gielo6hf2sordh1fndodm2imas8otovti'},
        followAllRedirects: true,
        encoding: null
    }, function(error, response, body) {
        if (error) {
            callback(null, {
                statusCode: 500,
                body: `Error vectorizing the image: ${error.message}`
            });
        } else if (!response || response.statusCode != 200) {
            callback(null, {
                statusCode: response && response.statusCode,
                body: body.toString('utf8')
            });
        } else {
            callback(null, {
                statusCode: 200,
                body: body.toString('utf8') // Assuming the response is SVG or textual data
            });
        }
    });
};
