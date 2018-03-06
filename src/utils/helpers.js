import AWS from 'aws-sdk';

/**
 * aws transcribe config
 * @param {object} awsParameters
 * @returns { object }
 */
const awsTranscribeConfig = (awsParameters) => {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = awsParameters;
  return new AWS.TranscribeService({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  });
};

/**
 * Do the request for endpoint
 * @param {string} endpoint
 * @param {object} params
 * @param {object} awsConfig
 * @returns {Object} response result
 */
const callEndpoint = (endpoint, params, awsConfig) => {
  return new Promise((resolve, reject) => {
    awsTranscribeConfig(awsConfig)[endpoint](params, (error, data) => {
      if (error) {
        console.log(error, error.stack); // an error occurred
        const statusCode = (error.statusCode) ? error.statusCode : 400;
        reject({ error, statusCode });
      } else {
        resolve({ data, statusCode: 200 });
      }
    });
  });
};

export default callEndpoint;
