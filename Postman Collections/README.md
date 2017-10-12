RingCentral_REST_API.json
=========================

This is a Postman Collection that contains 3 requests:
First, is a POST request to connect to the RingCentral REST API to acquire an access token.
Second, is a GET request to connect to the RingCentral REST API using the access token, and requests all the call log with parameters of 1 page of the maximum allowed 1000 records.
Third, is another GET request to pull page 2 of maximum allowed 1000 records.  Typically this is enough to capture all the logs for the past 24 hours.

Usage
-----

You can import this collection into Postman, and use Runner, or manually send each of the 3 requests individually.
Under the 'Send' button is 'Send and Download' which is useful for downloading only the JSON body to a file.
Make sure you have your environment setup with the values required to execute the collection
```
RC_SERVER_HOSTNAME
RC_APP_SECRET
RC_USERNAME
RC_EXTENSION
RC_PASSWORD
```

You can also execute this collection using Newman.
Just be sure to save your environment to json to be referenced.

```
$ npm install -g newman
$ newman run RingCentral_REST_API.json -e environment.json
```
