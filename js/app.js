console.log('sanity app.js');
// instantiate a new XHR object
let oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://swapi.co/api/people/4/');
oReq.send();

//declare function for event listener
function reqListener() {
  //console.log('xml response', this.responseText);
  let obj = JSON.parse(this.responseText);
  document.getElementById('person4Name').innerHTML = obj.name;

  let oReq2 = new XMLHttpRequest();
  oReq2.addEventListener('load', reqListener2);
  oReq2.open('GET', obj.homeworld);
  oReq2.send();

}

function reqListener2() {
  let homeWorld = JSON.parse(this.responseText);
  document.getElementById('person4HomeWorld').innerHTML = homeWorld.name;
}

//XHR request
let oReq3 = new XMLHttpRequest();
oReq3.addEventListener('load', reqListener3);
oReq3.open('GET', 'https://swapi.co/api/people/14/');
oReq3.send();

function reqListener3() {
  //console.log(this.responseText);
  //this.responseText returns entire string. Parse to convert string to object
  let obj = JSON.parse(this.responseText);
  document.getElementById('person14Name').innerHTML = obj.name;
  //console.log(obj.species[0]);

  let oReq4 = new XMLHttpRequest();
  oReq4.addEventListener('load', reqListener4);
  oReq4.open('GET', obj.species);
  oReq4.send();
}

function reqListener4() {
  let species = JSON.parse(this.responseText);
  //console.log(species)
  document.getElementById('person14Species').innerHTML = species.name;
}

//get list of all the films
let filmRequest = new XMLHttpRequest();
filmRequest.addEventListener('load', filmList);
filmRequest.open('GET', 'https://swapi.co/api/films/');
filmRequest.send();

function filmList() {
  let obj = JSON.parse(this.responseText);
  let films = obj.results;

  console.log(films);

  films.forEach(function (element, index, array) {

    let createFilm = document.createElement('li');
    createFilm.className = 'film';
    document.getElementById('filmList').appendChild(createFilm);
    let filmTitle = document.createElement('H2');
    filmTitle.className = 'filmTitle';
    createFilm.appendChild(filmTitle);
    filmTitle.innerHTML = element.title;

    let planetsTitle = document.createElement('H3');
    planetsTitle.innerHTML = 'Planets';
    createFilm.appendChild(planetsTitle);

    let createFilmPlanets = document.createElement('UL');
    createFilmPlanets.className = 'filmPlanets';
    createFilm.appendChild(createFilmPlanets);

    //instantiate new XHR object for film planets
    let filmPlanets = element.planets;
    //console.log(filmPlanets);
    filmPlanets.forEach(function (element, index, array) {
      let reqPlanets = new XMLHttpRequest();
      //console.log(element)
      
      reqPlanets.addEventListener('load', planets);
      reqPlanets.open('GET', element);
      reqPlanets.send();

      function planets() {
        let formatPlanets = JSON.parse(this.response);
        let planetName = formatPlanets.name;

        let createPlanets = document.createElement('li');
        createPlanets.className = 'planet';
        createFilmPlanets.appendChild(createPlanets);
        let createPlanetName = document.createElement('H4');
        createPlanetName.className = 'planetName';
        createPlanets.appendChild(createPlanetName);
        createPlanetName.innerHTML = planetName;
      }
    })
  })
}

