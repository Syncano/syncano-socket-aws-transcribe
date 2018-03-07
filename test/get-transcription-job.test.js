import request from 'supertest';
import { expect } from 'chai';
import nock from 'nock';
import 'dotenv/config';

import { GET_TRANSCRIBE_RESPONSE } from './utils/helpers';

const args = {
  TranscriptionJobName: 'job1-test'
};

describe('get-transcription-job', () => {
  const { GET_TRANSCRIBE_URL } = process.env;

  it('should return detail of a transcription job if valid TranscriptionJobName supplied', (done) => {
    nock(GET_TRANSCRIBE_URL)
      .post('/', args)
      .reply(200, GET_TRANSCRIBE_RESPONSE);

    request(GET_TRANSCRIBE_URL)
      .post('/')
      .send(args)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const transcribeJob = res.body;
        expect(transcribeJob).to.have.property('TranscriptionJob');
        expect(transcribeJob.TranscriptionJob).to.have.property('TranscriptionJobName');
        expect(transcribeJob.TranscriptionJob.TranscriptionJobName).to.equal('job-test');
        expect(transcribeJob.TranscriptionJob).to.have.property('TranscriptionJobStatus');
        expect(transcribeJob.TranscriptionJob).to.have.property('LanguageCode');
        expect(transcribeJob.TranscriptionJob.LanguageCode).to.equal('en-US');
        expect(transcribeJob.TranscriptionJob).to.have.property('Transcript');
        done();
      });

    nock.cleanAll();
  });
});
