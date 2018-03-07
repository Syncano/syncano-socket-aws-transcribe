import request from 'supertest';
import { expect } from 'chai';
import nock from 'nock';
import 'dotenv/config';

import { LIST_TRANSCRIBE_RESPONSE } from './utils/helpers';

const args = {
  Status: 'IN_PROGRESS'
};

describe('list-transcription-jobs', () => {
  const { LIST_TRANSCRIBE_URL } = process.env;

  it('should return lists transcription jobs with the specified status', (done) => {
    nock(LIST_TRANSCRIBE_URL)
      .post('/', args)
      .reply(200, LIST_TRANSCRIBE_RESPONSE);

    request(LIST_TRANSCRIBE_URL)
      .post('/')
      .send(args)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const transcribedJobList = res.body;
        expect(transcribedJobList).to.have.property('Status');
        expect(transcribedJobList.Status).to.equal('IN_PROGRESS');
        expect(transcribedJobList).to.have.property('TranscriptionJobSummaries');
        expect(transcribedJobList.TranscriptionJobSummaries).to.be.an.instanceof(Array);
        done();
      });

    nock.cleanAll();
  });
});
