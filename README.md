# IPDC LDES Consumer Service

This service consumes an time-based LDES endpoint of choice and sends the incoming members to a JSON-LD endpoint.
It consumes the LDES endpoint repeatedly using a CRON job. The service always starts from its previous state (page and timestamp) which it stores in a JSON file.

## Configuration

You can configure the service with the following environment variables:

- `LDES_ENDPOINT_VIEW`: the LDES endpoint to consume members from.
- `CRON_PATTERN`: the CRON interval which should be used. (default: `'* 0 * * * *'`)
- `JSON_ENDPOINT`: the JSON endpoint to send PUT requests to.
- `DATA_FOLDER`: the folder in which the state is saved.
