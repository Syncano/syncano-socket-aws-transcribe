import { expect } from 'chai';
import { run } from 'syncano-test';
import 'dotenv/config';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, TEST_S3_VIDEO } = process.env;

const config = { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION };

const args = {
  LanguageCode: 'en-US',
  Media: {
    MediaFileUri: TEST_S3_VIDEO
  },
  MediaFormat: 'mp4',
  TranscriptionJobName: `${Math.random().toString(36).substr(2, 9)}_${Math.floor(Date.now())}`
};

describe('start-transcription-job', () => {
  it('should start a transcription job if valid parameters supplied', async () => {
    const { data: transcribeJob, code } = await run('start-transcription-job', { args, config });
    expect(code).to.equal(200);
    expect(transcribeJob).to.have.property('TranscriptionJob');
    expect(transcribeJob.TranscriptionJob).to.have.property('TranscriptionJobStatus');
    expect(transcribeJob.TranscriptionJob.TranscriptionJobStatus).to.equal('IN_PROGRESS');
    expect(transcribeJob.TranscriptionJob).to.have.property('LanguageCode');
    expect(transcribeJob.TranscriptionJob.LanguageCode).to.equal('en-US');
    expect(transcribeJob.TranscriptionJob).to.have.property('MediaFormat');
    expect(transcribeJob.TranscriptionJob.MediaFormat).to.equal('mp4');
  });

  it('should return message "MissingRequiredParameter" if no LanguageCode passed', async () => {
    const { LanguageCode, ...argsValidation } = args;
    const { data, code } = await run('start-transcription-job', { args: argsValidation, config });
    expect(code).to.equal(400);
    expect(data).to.have.property('message');
    expect(data).to.have.property('time');
    expect(data).to.have.property('code');
    expect(data.code).to.equal('MissingRequiredParameter');
  });
});
