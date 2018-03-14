import request from 'supertest';
import { expect } from 'chai';
import nock from 'nock';
import 'dotenv/config';

const args = {
  LanguageCode: 'en-US',
  Media: {
    MediaFileUri: 'https://s3.us-east-1.amazonaws.com/bucket-test/video.mp4'
  },
  MediaFormat: 'mp4',
  TranscriptionJobName: 'job-test'
};

const START_TRANSCRIBE_RESPONSE = {
  TranscriptionJob: {
    TranscriptionJobName: 'job-test',
    TranscriptionJobStatus: 'IN_PROGRESS',
    LanguageCode: 'en-US',
    MediaFormat: 'mp4',
    Media: {
      MediaFileUri: 'https://s3.us-east-1.amazonaws.com/bucket-test/video.mp4'
    },
    CreationTime: '2018-03-07T08:48:19.232Z'
  }
};

describe('start-transcription-job', () => {
  const { START_TRANSCRIBE_URL } = process.env;

  it('should start a transcription job if valid parameters supplied', (done) => {
    nock(START_TRANSCRIBE_URL)
      .post('/', args)
      .reply(200, START_TRANSCRIBE_RESPONSE);

    request(START_TRANSCRIBE_URL)
      .post('/')
      .send(args)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const transcribeJob = res.body;
        expect(transcribeJob).to.have.property('TranscriptionJob');
        expect(transcribeJob.TranscriptionJob).to.have.property('TranscriptionJobStatus');
        expect(transcribeJob.TranscriptionJob.TranscriptionJobStatus).to.equal('IN_PROGRESS');
        expect(transcribeJob.TranscriptionJob).to.have.property('LanguageCode');
        expect(transcribeJob.TranscriptionJob.LanguageCode).to.equal('en-US');
        expect(transcribeJob.TranscriptionJob).to.have.property('MediaFormat');
        expect(transcribeJob.TranscriptionJob.MediaFormat).to.equal('mp4');
        done();
      });

    nock.cleanAll();
  });
});
