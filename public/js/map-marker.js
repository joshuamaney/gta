const element = document.getElementById("map-markers");

const numberOfGeocaches = element.getElementsByTagName("*").length;

function logSomething(event) {
    event.stopPropagation();

    console.log(element.children[0].outerText);
    console.log(numberOfGeocaches);
}


document
    .querySelector('#map-markers')
    .addEventListener('click', logSomething);


for (let i=0; i<numberOfGeocaches; i++) {
    let geocache = element.children[i].outerText;
    let coordinatesList = geocache.split(",");
    let latitude = coordinatesList[0];
    let longitude = coordinatesList[1];
    console.log(`${latitude} & ${longitude}`);
}