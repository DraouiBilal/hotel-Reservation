async function initMap() {
  let URL = window.location.href+"/getCoordinates"
  let res = await fetch(URL)
  let coord = await res.json()
  const uluru = { lat: coord.lat, lng: coord.lng };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: uluru,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}