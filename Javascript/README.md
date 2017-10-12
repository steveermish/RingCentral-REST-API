RingCentralGetCallLogDetail
===========================

This javascript uses the RingCentral SDK to connect, authenticate, and download the CallLogDetail from the REST API,
and save the body response to a CSV file every 15 minutes.

Setup Environment
=================

Install dependencies
```
npm install dotenv --savedev
npm install ringcentral --savedev
npm install fs --savedev
```
Create .env file to store your credentials int he following format
```
SERVER=
APP_KEY=
APP_SECRET=
USERNAME
PASSWORD=
```
Usage
-----

```
node /path/to/RinCentralGetCallLogDetail.js
```

