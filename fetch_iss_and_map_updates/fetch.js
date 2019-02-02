var url = 'http://api.open-notify.org/iss-now.json'

var issLat = document.querySelector('#iss-lat')
var issLong = document.querySelector('#iss-long')
var time = document.querySelector('#time')

var issMarker  // Leaflet marker 
var update = 10000  // 10 seconds 

var map = L.map('iss-map').setView([0, 0], 1)  // Center at 0, 0 and max zoom out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2xhcmFsIiwiYSI6ImNqcmdwenViYTAwcHQ0Ym5yYmZ1Z3E2bjgifQ.QQfUvVaqPsWb_jJbP2gvHg'
}).addTo(map)

iss()   // initial call to function
setInterval(iss, update)  // Call the iss function every update seconds

function iss() {
    fetch(url)
        .then( res => res.json())
        .then( resJson => {
            console.log(resJson)
            let issPosition = resJson.iss_position
            let lat = issPosition.latitude
            let long = issPosition.longitude
            issLat.innerHTML = lat
            issLong.innerHTML = long

            if (!issMarker) {
                issMarker = L.marker([lat, long]).addTo(map) // Create the marker 
            } else {
                issMarker.setLatLng([lat, long]) // Already exists - move to new location
            }

            // Update the time element to the current date and time 
            let date = Date()
            time.innerHTML = date

        })
        .catch( err => {
            console.log(err)
        })
}



