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

const GET_TRANSCRIBE_RESPONSE = {
  TranscriptionJob: {
    TranscriptionJobName: 'job-test',
    TranscriptionJobStatus: 'COMPLETED',
    LanguageCode: 'en-US',
    MediaSampleRateHertz: 44100,
    MediaFormat: 'mp4',
    Media: {
      MediaFileUri: 'https://s3.us-east-1.amazonaws.com/bucket-test/video.mp4'
    },
    Transcript: {
      TranscriptFileUri: 'https://s3.amazonaws.com/aws-transcribe-us-east-1-prod/12345/job-test/asrOutput.json?X-Amz-Security-Token=abcd'
    },
    CreationTime: '2018-03-06T15:04:00.806Z',
    CompletionTime: '2018-03-06T15:08:10.525Z'
  }
};

const LIST_TRANSCRIBE_RESPONSE = {
  Status: 'IN_PROGRESS',
  TranscriptionJobSummaries: [
    {
      TranscriptionJobName: 'job-test',
      CreationTime: '2018-03-07T08:48:19.232Z',
      LanguageCode: 'en-US',
      TranscriptionJobStatus: 'IN_PROGRESS'
    }
  ]
};

export {
  START_TRANSCRIBE_RESPONSE,
  GET_TRANSCRIBE_RESPONSE,
  LIST_TRANSCRIBE_RESPONSE
};
