import Syncano from '@syncano/core';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const { TranscriptionJobName } = ctx.args;
  try {
    const { statusCode, data } = await callEndpoint('getTranscriptionJob', { TranscriptionJobName }, ctx.config);
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
