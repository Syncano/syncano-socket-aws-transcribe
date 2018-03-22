import { expect } from 'chai';
import { run } from '@syncano/test';
import 'dotenv/config';

const config = process.env;

const args = {
  Status: 'COMPLETED'
};

describe('list-transcription-jobs', () => {
  it('should return lists transcription jobs with the specified status', async () => {
    const { data: transcribedJobList, code } = await run('list-transcription-jobs', { args, config });
    expect(code).to.equal(200);
    expect(transcribedJobList).to.have.property('Status');
    expect(transcribedJobList.Status).to.equal('COMPLETED');
    expect(transcribedJobList).to.have.property('TranscriptionJobSummaries');
    expect(transcribedJobList.TranscriptionJobSummaries).to.be.an.instanceof(Array);
  });

  it('should return message "ValidationException" if wrong Status parameter passed', async () => {
    const argsValidation = { ...args, Status: 'WRONG_ENUM_VALUE' };
    const { data, code } = await run('list-transcription-jobs', { args: argsValidation, config });
    expect(code).to.equal(400);
    expect(data).to.have.property('message');
    expect(data).to.have.property('retryable');
    expect(data).to.have.property('code');
    expect(data.code).to.equal('ValidationException');
  });
});
