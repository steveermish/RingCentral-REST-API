require('dotenv').config()
var RC = require('ringcentral')
require('dotenv').load()

var rcsdk = new RC({
  server: process.env.SERVER,
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET
})

var platform = rcsdk.platform()

login()

function login() {
  platform.login({
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    })
    .then(function (resp) {
      readCallLog()
      setInterval(function () {
        readCallLog()
      }, 60 * 60 * 1000);
    })
    .catch(function (e) {
      throw e
    })
}

function readCallLog() {
  var date = new Date()
  var time = date.getTime()
  // 1hr period
  var less15Min = time - (60 * 60 * 1000)
  var from = new Date(less15Min)
  var dateFrom = from.toISOString()
  var dateTo = date.toISOString()
  params = {}
  params['type'] = 'Voice'
  params['view'] = 'Detailed'
  params['dateFrom'] = dateFrom.replace('/', ':')
  params['dateTo'] = dateTo.replace('/', ':')
  params['perPage'] = '1000'
  params['page'] = '1'
  console.log(params.dateFrom)
  console.log(params.dateTo)
  platform.get('/account/~/call-log', params)
    .then(function (resp) {
      var json = resp.json()
      if (json.records.length >= 0) {
        // Unhide below if you need headers
        var cvs = ''
        //var cvs = 'records_action,records_direction,records_duration,records_from_extensionNumber,records_from_location,records_from_name,records_from_phoneNumber,records_id,records_result,records_sessionId,records_startTime,records_to_extensionNumber,records_to_location,records_to_name,records_to_phoneNumber,records_type,records_uri'
        for (var record of json.records) {
          if (record.hasOwnProperty('action'))
              cvs += record.action + ','
            else cvs += ','
          if (record.hasOwnProperty('direction'))
          cvs += record.direction + ','
        else cvs += ','
          cvs += record.duration + ','
          if (record.hasOwnProperty('from')) {
            if (record.from.hasOwnProperty('extensionNumber'))
              cvs += record.from.extensionNumber + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('from')) {
            if (record.from.hasOwnProperty('location'))
              cvs += record.from.location.replace(",", " ") + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('from')) {
            if (record.from.hasOwnProperty('name'))
              cvs += record.from.name.replace(",", " ") + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('from')) {
            if (record.from.hasOwnProperty('phoneNumber'))
              cvs += record.from.phoneNumber + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('id'))
          cvs += record.id + ','
        else cvs += ','
          cvs += record.result + ','
          if (record.hasOwnProperty('sessionId'))
          cvs += record.sessionId + ','
        else cvs += ','
          if (record.hasOwnProperty('startTime'))
          cvs += record.startTime + ','
        else cvs += ','
          if (record.hasOwnProperty('to')) {
            if (record.to.hasOwnProperty('extensionNumber'))
              cvs += record.to.extensionNumber + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('to')) {
            if (record.to.hasOwnProperty('location'))
              cvs += record.to.location.replace(",", " ") + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('to')) {
            if (record.to.hasOwnProperty('name'))
              cvs += record.to.name.replace(",", " ") + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('to')) {
            if (record.to.hasOwnProperty('phoneNumber'))
              cvs += record.to.phoneNumber + ','
            else cvs += ','
          }
          if (record.hasOwnProperty('type'))
          cvs += record.type + ','
        else cvs += ','
          if (record.hasOwnProperty('uri'))
          cvs += record.uri + ','
        else cvs += ','
        cvs += "\r\n"
        }
        var fs = require('fs')
        var today = new Date();
        var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()
        var time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
        var dateTime = date + ' ' + time
        fs.writeFile('CallLogs/RingCentralCallLog' + dateTime + '.csv', cvs, function (err) {
          if (err)
            console.log(err);
          else
            console.log("call log is saved.");
        })
      }
    })
    .catch(function (e) {
      throw e
    })
}