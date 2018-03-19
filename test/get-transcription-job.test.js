import { expect } from 'chai';
import { run } from 'syncano-test';
import 'dotenv/config';

const {
  AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, TEST_TRANSCRIPTION_JOB_NAME: TranscriptionJobName
} = process.env;

const config = { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION };

describe('get-transcription-job', () => {
  it('should return detail of a transcription job if valid TranscriptionJobName supplied', async () => {
    const { data: transcribeJob, code } = await run('get-transcription-job',
      { args: { TranscriptionJobName }, config });
    expect(code).to.equal(200);
    expect(transcribeJob).to.have.property('TranscriptionJob');
    expect(transcribeJob.TranscriptionJob).to.have.property('TranscriptionJobName');
    expect(transcribeJob.TranscriptionJob.TranscriptionJobName).to.equal('job1');
    expect(transcribeJob.TranscriptionJob).to.have.property('TranscriptionJobStatus');
    expect(transcribeJob.TranscriptionJob).to.have.property('LanguageCode');
    expect(transcribeJob.TranscriptionJob.LanguageCode).to.equal('en-US');
    expect(transcribeJob.TranscriptionJob).to.have.property('Transcript');
  });

  it('should return message "BadRequestException" if non existing transcription job passed as parameter', async () => {
    const { data, code } = await run('get-transcription-job',
      { args: { TranscriptionJobName: 'non-existing-job' }, config });
    expect(code).to.equal(400);
    expect(data).to.have.property('message');
    expect(data).to.have.property('retryable');
    expect(data).to.have.property('code');
    expect(data.code).to.equal('BadRequestException');
  });
});
