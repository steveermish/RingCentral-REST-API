require('dotenv').config()
var RC = require('ringcentral')
require('dotenv').load()

var rcsdk = new RC({
  server:process.env.SERVER,
  appKey: process.env.APP_KEY,
  appSecret:process.env.APP_SECRET
})

var platform = rcsdk.platform()

login()
function login() {
  platform.login({
    username:process.env.USERNAME,
    password:process.env.PASSWORD
  })
  .then(function(resp){
      readCallLog()
      setInterval(function(){
        readCallLog()
      }, 60 * 15 * 1000); // repeat reading call-log every 15 mins
  })
  .catch(function(e){
    throw e
  })
}

function readCallLog(){
  var date = new Date()
  var time = date.getTime()
  // 15-min period
  var less15Min = time - (60 * 15 * 1000)
  var from = new Date(less15Min)
  var dateFrom = from.toISOString()
  var dateTo = date.toISOString()

  var params = {}
  params['type'] = 'Voice'
  params['view'] = 'Detailed'
  params['dateFrom'] = dateFrom.replace('/', ':')
  params['dateTo'] = dateTo.replace('/', ':')
  console.log(params.dateFrom)
  console.log(params.dateTo)
  platform.get('/account/~/call-log', params)
  .then(function(resp){
    var json = resp.json()
    if (json.records.length > 0){
      var cvs = 'uri,startTime,duration,type,direction,action,result,to_name,from_name,transport'
      for (var record of json.records){
        cvs += "\r\n"
        cvs += record.uri + ','
        cvs += record.startTime + ','
        cvs += record.duration + ','
        cvs += record.type + ','
        cvs += record.direction + ','
        cvs += record.action + ','
        cvs += record.result + ','
        if (record.to.name != undefined)
          cvs += record.to.name + ','
        else
          cvs += 'null,'
          if (record.from.name != undefined)
            cvs += record.from.name + ','
          else
            cvs += 'null,'
        cvs += record.transport
      }
      var fs = require('fs')
      var today = new Date();
      var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()
      var time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
      var dateTime = date+' '+time
      fs.writeFile('RingCentralCallLog'+dateTime+'.csv', cvs, function(err) {
        if(err)
          console.log(err);
        else
          console.log("call log is saved.");
      })
    }
  })
  .catch((error) => {
    assert.isNotOk(error,'Promise error')
    done()
  })
}