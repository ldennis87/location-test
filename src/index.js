window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

const options = {
  enableHighAccuracy: true,
  timeout: 50000,
  maximumAge: 0
};

let position = null;

function success(pos) {
  const crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function staticLoadPlaces() {
  // navigator.geolocation.getCurrentPosition(success, error, options);
  return [
      {
          name: 'Magnemite',
          location: {
              lat: -33.758440,
              lng: 150.900700,
          }
      },
  ];
}
// -33.758618, 150.900613

function renderPlaces(places) {
 let scene = document.querySelector('a-scene');

 places.forEach((place) => {
     let latitude = place.location.lat;
     let longitude = place.location.lng;

     let model = document.createElement('a-entity');
     model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    //  model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
    //  model.setAttribute('rotation', '0 180 0');
    //  model.setAttribute('animation-mixer', '');
    //  model.setAttribute('scale', '0.5 0.5 0.5');
    
    model.setAttribute('geometry', 'primitive:box; width: 3')

     model.addEventListener('loaded', () => {
         window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
     });

     scene.appendChild(model);
 });
}