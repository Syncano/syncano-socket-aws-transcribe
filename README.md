# aws-transcribe

`version:` **0.0.1**

Amazon transcribe syncano socket

To install, run:

```
syncano-cli add aws-transcribe
```

## Config

| Name | Required | Description | Info
| ---- | -------- | ----------- | ----
| AWS_REGION | true | AWS region | Check link below for aws comprehend available regions (https://docs.aws.amazon.com/comprehend/latest/dg/guidelines-and-limits.html) 
| AWS_SECRET_ACCESS_KEY | true | AWS secret access key | Visit link to know more about managing keys (http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html). 
| AWS_ACCESS_KEY_ID | true | AWS access key id | Visit link to know more about managing keys (http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html). 

## Endpoints

### start-transcription-job

Endpoint that starts an asynchronous job to transcribe speech to text

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| TranscriptionJobName | string | The name of the job. The name must be unique within an AWS account. | job1
| LanguageCode | string | The language code for the language used in the input media file. | en-US
| Media | object | An object that describes the input media for a transcription job. | {   "MediaFileUri" : "string(The S3 location of the input media file)" } 
| MediaFormat | string | The format of the input media file. | mp4
| MediaSampleRateHertz | integer | The sample rate, in Hertz, of the audio track in the input media file. | 0



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "TranscriptionJob": {
    "CompletionTime": number,
    "CreationTime": number,
    "FailureReason": "string",
    "LanguageCode": "string",
    "Media": {
       "MediaFileUri": "string"
    },
    "MediaFormat": "string",
    "MediaSampleRateHertz": number,
    "Transcript": {
       "TranscriptFileUri": "string"
    },
    "TranscriptionJobName": "string",
    "TranscriptionJobStatus": "string"
  }
}
```

##### Failed `400`

```
{
  "message": "Missing required key 'TranscriptionJobName' in params",
  "code": "MissingRequiredParameter",
  ...
}
```

### get-transcription-job

Endpoint that returns information about a transcription job.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| TranscriptionJobName | string | The name of the transcription job. | job1



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "TranscriptionJob": {
    "CompletionTime": number,
    "CreationTime": number,
    "FailureReason": "string",
    "LanguageCode": "string",
    "Media": {
       "MediaFileUri": "string"
    },
    "MediaFormat": "string",
    "MediaSampleRateHertz": number,
    "Transcript": {
       "TranscriptFileUri": "string"
    },
    "TranscriptionJobName": "string",
    "TranscriptionJobStatus": "string"
  }
}
```

##### Failed `400`

```
{
  "message": "Missing required key 'TranscriptionJobName' in params",
  "code": "MissingRequiredParameter",
  ...
}
```

### list-transcription-jobs

Endpoint that lists transcription jobs with the specified status.

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| Status | string | The status of a job. When specified, returns only transcription jobs with the specified status. | IN_PROGRESS / FAILED / COMPLETED
| NextToken | string | Include the NextToken to fetch the next set of jobs (Optional). | 
| MaxResults | integer | The maximum number of jobs to return in the response (Optional). | 0



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "NextToken": "string",
  "Status": "string",
  "TranscriptionJobSummaries": [
    {
      "CompletionTime": number,
      "CreationTime": number,
      "FailureReason": "string",
      "LanguageCode": "string",
      "TranscriptionJobName": "string",
      "TranscriptionJobStatus": "string"
    }
  ]
}
```

##### Failed `400`

```
{
  "message": "Missing required key 'Status' in params",
  "code": "MissingRequiredParameter",
  ...
}
```

### Contributing

#### How to Contribute
  * Fork this repository
  * Clone from your fork
  * Make your contributions (Make sure your work is well tested)
  * Create Pull request from the fork to this repo

#### Setting up environment variables
  * Create a `.env` on parent folder
  * Copy contents of `.env-sample` file to newly created `.env` file and assign appropriate values to the listed variables.

#### Testing
  * Ensure all your test are written on the `test` directory
  * Use the command `npm test` to run test
