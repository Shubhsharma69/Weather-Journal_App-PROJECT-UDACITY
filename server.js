// Setup empty javascript object
const projectData = {};

//Require express
const express = require('express');

// Start 
const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// require Cors 
const cors = require('cors');
app.use(cors());

// Initialize project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;


const server = app.listen(port, listening)

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}


//GET route

app.get('/getProjectData', function (req, res) {

    res.send(projectData);
  })



const weatherData = [];


  //post route 

app.post('/add', addEntry);

  function addEntry(req,res){

    newEntry = {
      name: req.body.name,
      temp: req.body.temp,
      desc: req.body.desc,
      feelings: req.body.feelings,
      date: req.body.date,
      time: req.body.time
    }
  
    weatherData.push(newEntry);
    res.send(weatherData)
    
  }


//get request 
app.get('/all', getData) 
function getData (req, res){
  res.send(weatherData);
  console.log(weatherData);
}