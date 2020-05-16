

// create a new date dynamically using javascript
let d = new Date();
let newDate = (d.getMonth() + 1) +'/'+ d.getDate()+'/'+ d.getFullYear();
let newTime = d.getHours()+':'+ d.getMinutes();


let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

let apiKey = '&APPID=bbee3673552ca695c2b8fa655569a66d';


//getting data from API
const getEntry = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    try {
  
      const weatherInfo = await res.json();
      console.log(weatherInfo)
        
      return weatherInfo;
    }  catch(error) {
      console.log("error", error);
      // error -handling
    }

};


//store the data of API
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });
  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error)
  }
}



//page content updated by recent entries
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);

      document.getElementById('entry-logs').innerHTML = "";

      for (let i = allData.length - 1; i >= 0; i--) {
       
            let oldEntry = document.createElement('div');
            let oldTitle = document.createElement('h3');
            let oldContent = document.createElement('p');

            oldEntry.setAttribute('class', 'prev-entry');

            oldTitle.setAttribute('class', 'prev-title');

            let farTemp = (allData[i].temp - 273.15) * 9/5 + 32;
            let roundTemp = Math.round(farTemp);
            oldTitle.innerHTML = allData[i].date + ' at ' + allData[i].time + ' -> It was ' + roundTemp + '&deg in ' + allData[i].name + ', with ' + allData[i].desc;

            document.getElementById('entry-logs').append(oldTitle);           
            document.getElementById('entry-logs').append(oldEntry);

         
            oldContent.setAttribute('class', 'prev-content');
            oldContent.innerHTML = allData[i].feelings;

            oldEntry.append(oldContent);

        }

        return allData;
    }catch(error){
      console.log("error", error);
    }
  }
  

  document.getElementById('generate').addEventListener('click', performAction);

  function performAction(e){
      const newZip =  document.getElementById('zip').value;
      let zip = newZip + ',us';

      const feeling = document.getElementById('feelings').value;

      getEntry(baseURL, zip, apiKey)

      .then(function(data){

          postData('/add', {  temp: data.main.temp, 
                              desc: data.weather[0].description,
                              name: data.name,
                              feelings: feeling,
                              date: newDate,
                              time: newTime

                          }                                
                  );
        })
        .then(function(data){
            
          updateUI()
            }
        )
        
  }
