const express = require('express')
const cors = require('cors')
const app = express()
var http = require('http')
const { report } = require('process')

app.use(cors())

const options = {
  host: 'localhost',
  port: 9001,
  path: '/api/BikeRental/GetAll',
  method: 'GET'
}

/**
 * Get some data from Kevin's other server
 */
app.get('/api/BikeData', (req, res) => {
  var str = '';
  var callback = function(response) {
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      // convert str data to correct format here
      var jsonRaw = Array.from(JSON.parse(str))
      console.log(jsonRaw)
      var jsonFinal = {}
      jsonFinal["format"] = "date"
      var list = []
      jsonRaw.forEach(j => {
        var temp = []
        temp.push(j["index"])
        temp.push(j["count"])
        list.push(temp)
      })
      jsonFinal["initialDataSet"] = list
      //
      res.send(jsonFinal); 
    });
  }
  var req = http.request(options, callback);
  req.end();
})

/**
 * Return basic server info and available data.
 */
app.get('/', (req, res) => res.send({
  server: {
    name: 'API Starter Server',
    attribution: {},
    apiVersion: '0.2'
  },
  availableDataSeries: {
    BikeData: {
      name: 'Bike Rental Count',
      description: 'Displays indexed list of bike rental historical data'
    }
  }
}))

/**
 * Hard code some linear data.
 */
app.get('/api/increasingData', (req, res) => res.send({
  format: 'date',
  initialDataSet: [
    [Date.now(), 1],
    [Date.now() + 10, 2],
    [Date.now() + 20, 3],
    [Date.now() + 30, 4],
    [Date.now() + 40, 5],
  ]
}))

/**
 * Hard code some flat data to simply give variety.
 */
app.get('/api/flatData', (req, res) => res.send({
  format: 'date',
  initialDataSet: [
    [Date.now(), 5],
    [Date.now() + 10, 5],
    [Date.now() + 20, 5],
    [Date.now() + 30, 5],
    [Date.now() + 40, 5],
  ]
}))

app.listen(3050, () => console.log('Listening on port 3050!'))