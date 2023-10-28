const headerInput = document.querySelector('.header__search--input')
const headerButton = document.querySelector('.header__search--button')
const ipAddressField = document.querySelector('.ip-field')
const countryLocationInput = document.querySelector('.location-field')
const timezoneInput = document.querySelector('.timezone-field')
const ispInput = document.querySelector('.isp-field')

//Map
const myMap = document.querySelector("#map")

let map = L.map('map').setView([51.505, -0.09], 13)


//API
let ipAddress
let timeZone
let countryLocation
let cityLocation
let zipCode
let isp
let lat
let lng


const API_KEY = `c4f499ae4be14d9b9c60b4357a1ef49f` // Private Api Key
let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}` // ipGeolocation URL

const fetchApi = async function() {
  try {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(await successLoad(url), function() {
        alert(`Could not get your position`)
        return false
      })
    }
  }
  catch(err){
    console.error(err.message)
  }
}
const successLoad = async function(url) {
  try{
    const response = await fetch(url)
    const data = await response.json()

    // console.log(data)

    ipAddress = data.ip
    timeZone = data.time_zone.offset
    countryLocation = data.country_name
    cityLocation = data.city
    zipCode = data.zipcode
    isp = data.isp
    lat = data.latitude
    lng = data.longitude

    dispalyInfo()
    mapLocation(lat, lng)
  }
  catch(err){
    console.error(err.message)
  }
}
const dispalyInfo = async function() {
  
  ipAddressField.innerHTML = ipAddress
  timezoneInput.innerHTML = ` UTC ${timeZone}`
  countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${zipCode}`
  ispInput.innerHTML = isp

}

// display live place or entered ip adress 
const mapLocation = function(lat, lng) {
  const myIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize: [36, 46], // image size
        iconAnchor: [18, 45], // point of the icon which will correspond to marker's location
      
      });
  map.setView([lat, lng], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  L.marker([lat, lng], {icon: myIcon}).addTo(map)
}

window.addEventListener('load', fetchApi)

headerButton.addEventListener('click', function(e) {
  // prevent the default event when clicking
  e.preventDefault()

  // expression that pass the IP Adreess
  if (
      headerInput.value.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      ) 
    ) {

      // callback fun with adding (ip input) to Url
      url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${headerInput.value}`
      successLoad(url)

    }

  else {
    alert('You have entered an invalid IP address!')
    return false
  }
})
