# This repository is a collection of methods for pulling data from the RingCentral REST API

Postman Collections is a JSON collection that uses the OAuth 2.0 to obtain a bearer token, and then pass the token to a API call to retrieve the call log detail for the past 24 hours

Javascript includes code to authenticate, pull the call log every 15 minutes, and write the JSON body it to a CSV file.
