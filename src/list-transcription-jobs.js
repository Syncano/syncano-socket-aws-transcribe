import Server from '@syncano/core';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = new Server(ctx);
  try {
    const { statusCode, data } = await callEndpoint('listTranscriptionJobs', ctx.args, ctx.config);
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
