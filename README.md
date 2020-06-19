# GitHubActions.com Result Reporter

Report Results for actions started using GitHubActions.com. This action will never fail your workflow, so use freely without risk, but do check for error logs if you don't see results in the GitHubActions.com portal.

## Usage

### Inputs

| key | default | required | description |
|-----|---------|----------|-------------|
| trigger_result_id | n/a | true | The ID for the trigger result being reported. This typically is at `github.event.client_payload.triggerResult.triggerResultId` |
| event_result_id | n/a | true | The ID for the individual event being reported. This typically is at `github.event.client_payload.triggerResult.eventResultId` |
| status_code | `success` | false | A status to update to. Valid values: `success`, `processing`, `failure` |
| status_text | `Success!` | false | A string to describe the status code. This is optional, but should be short (max 25 chars). |

### Outputs

None

### Example Workflow

```yaml
on:
  repository_dispatch:
    types: [package-update]

jobs:
  test-coverage:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Report In Process
        uses: dkershner6/githubactions-result-reporter@v1
          with:
            trigger_result_id: '${{ github.event.client_payload.triggerResult.triggerResultId }}'
            event_result_id: '${{ github.event.client_payload.triggerResult.eventResultId }}'
            status_code: 'processing'
            status_text: 'Installing npm...'
      - run: npm i

      - name: Report Success
        uses: dkershner6/githubactions-result-reporter@v1
          with:
            trigger_result_id: '${{ github.event.client_payload.triggerResult.triggerResultId }}'
            event_result_id: '${{ github.event.client_payload.triggerResult.eventResultId }}'
            status_code: 'success'
            status_text: 'NPM was installed.'
```