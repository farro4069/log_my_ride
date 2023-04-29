// *************  Global variables **********************************************
const today = new Date(new Date().setHours(12)).toJSON().split('T')[0];



// ************** DOM Elements ************
const featureBikeElement = document.getElementById('bike-featured');
const currentBikeElement = document.getElementById('bikes-current');
const previousBikeElement = document.getElementById('bikes-retired');
const maintenanceLogElement = document.getElementById('maintenance');
const maintenanceFormBikeElement = document.getElementById('id_bike');

let featureRide = {};
let featureBike = {};
let maintenance = [];


// ********************* Fetch data from the API *****************

const endpoint = '/rest';

fetch(endpoint, {
	method: "GET"
})
.then(results => results.json())
.then(data => handleData(data))
.catch(err => console.log(err))


// ********  Things to do once we have the rides data **********************

function handleData(data) {
	rides = data.rideData;
	bikes = data.bikeData;
	wheels = data.wheelData;
	maintenance = data.maintenanceData.sort((a, b) => b.date > a.date);
	featureRide = rides.sort((a, b) => b.ride_date > a.ride_date)[0]
	featureBike = bikes.find(b => b.id == featureRide.bike_name);

	renderFeatureBike(featureBike, featureRide);
	renderCurrentBike(bikes, rides);
	renderPreviousBike(bikes, rides);
	renderMaintenanceLog(featureBike, maintenance);
	const bikeLink = document.querySelectorAll('.bikes__list ul')
	bikeLink.forEach(l => l.addEventListener('click', (e) => {
		e.preventDefault();
		feature = bikes.find(b => b.id == (e.target.parentNode.dataset.bike))
		renderFeatureBike(feature, featureRide);
	}));
}



// ******** Feature bike

function renderFeatureBike(featureBike, featureRide) {
	const featureBikeElementContent = `<h2>${featureBike.bike_name}</h2>
		<ul>
			<li><p>${featureBike.bike_description}</p></li>
			<li><p>${featureBike.comments}</p></li>
			<li><p>${featureBike.specs}</p></li>
			<li><p class="distance">${ intComma(rides.reduce((sum, r) => sum += featureBike.id == r.bike_name ? parseFloat(r.ride_distance): 0, 0), {})}</span></li>
			<li><p>Since ${formatFullDate(featureBike.date_acquired)}</p></li>
			<li><p>Retired ${featureBike.date_sold < today ? formatFullDate(featureBike.date_sold) : ''}</p></li>
		</ul>
		<a href='/bike/edit/${featureBike.id}'><button class='button__edit'>Edit</button></a>

	`;
	const featureBikeImage = `url(${featureBike.image})`;
	featureBikeElement.innerHTML = featureBikeElementContent;
	featureBikeElement.style.backgroundImage = featureBikeImage;
	maintenanceFormBikeElement.value = featureBike.id;
	renderMaintenanceLog(featureBike, maintenance);
}


// ******** Current bikes

function renderCurrentBike(bikes, rides) {
	let currentBikes = bikes.filter(c => !c.date_sold).sort((a, b) => b.acquired_date > a.acquired_date);
	let currentBikeElementContent = "<h2>Current bikes</h2><ul>";
	currentBikes.forEach(b => 
		currentBikeElementContent += `<li data-bike=${b.id}>
		<p>${b.bike_description}</p>
		<span>${intComma(rides.reduce((sum, r) => sum += b.id == r.bike_name ? parseFloat(r.ride_distance): 0, 0), {})}km</span></li>`);
	currentBikeElementContent += `</ul>`;
	currentBikeElement.innerHTML = currentBikeElementContent;
}

// ******** Previous bikes

function renderPreviousBike(bikes, rides) {
	let previousBikes = bikes.filter(p => p.date_sold).sort((a, b) => b.acquired_date > a.acquired_date);
	let previousBikeElementContent = "<h2>Retired bikes</h2><ul>";
	previousBikes.forEach(b => 
		previousBikeElementContent += `<li data-bike=${b.id}>
		<p>${b.bike_description}</p>
		<span>${intComma(rides.reduce((sum, r) => sum += b.id == r.bike_name ? parseFloat(r.ride_distance): 0, 0), {})}km</span></li>`);
	previousBikeElementContent += `</ul>`;
	previousBikeElement.innerHTML = previousBikeElementContent;
}

function renderMaintenanceLog(featureBike, maintenance) {
	let maintenanceLog = maintenance.filter(m => m.bike == featureBike.id)
	let maintenanceLogElementContent = `<h2>${featureBike.bike_name} Maintenance Log</h2><ul>`
	maintenanceLog.forEach(m => maintenanceLogElementContent += `
		<li><p>${formatFullDate(m.date)}</p><span>${m.content}</span></li>
		`)
	maintenanceLogElementContent += "</ul>"
	maintenanceLogElement.innerHTML = maintenanceLogElementContent;
}
	



// ******** Utility functions ***********************************

function formatDate(date) {
	d = date.split('-');
	const formatedDate = `${d[2]} ${month[parseInt(d[1])]}`;
	return formatedDate;
}

function formatFullDate(date) {
	d = date.split('-');
	const formatedDate = `${d[2]} ${month[parseInt(d[1])]} ${d[0]}`;
	return formatedDate;
}

function formatDay(date) {
	d = date.split('-');
	const formatedDay = `${d[2]}`;
	return formatedDay;
}

function equipmentById(equip, id) {
	const gear = equip.find(p => p.id == id);
	return gear; 
}

