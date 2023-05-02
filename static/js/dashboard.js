// *************  Global variables **********************************************

const dateElement = document.getElementById('id_ride_date');
const today = new Date(new Date().setHours(12)).toJSON().split('T')[0];
const weekAgoDate = previousDate(today, 7);
const priorWeekDate = previousDate(today, 14);

// *************  Elements from the DOM ********************************

const form = document.getElementById('form');

const fitnessElement = document.querySelector('.fitness-ctl p');
const fatigueElement = document.querySelector('.fitness-atl p');
const formElement = document.querySelector('.fitness-tsb p');

const ramp7Element = document.querySelector('.ramp p');
const ramp28Element = document.querySelector('.ramp b');

const weekDistanceElement = document.querySelector('.circle__week p');
const priorWeekDistanceElement = document.querySelector('.circle__week b');

const activityElement = document.querySelector('.card__bubble');

const rideDetailElement = document.getElementById('ride__featured');
const bikeDetailElement = document.getElementById('bike__featured');
const recentElement = document.getElementById("rides__recent");
const longElement = document.getElementById("rides__long");

const searchElement = document.getElementById('search__input');
const searchResults = document.getElementById('search__results');


const bikeElement = document.getElementById('id_bike_name');
const wheelElement = document.getElementById('id_wheelset');

// ***************  Initialise variables required elsewhere ********
let rides = {};
let bikes = {};
let wheels = {};
let rideObject = {};
let searchTerm = "";





// ********************* Fetch data from the API *****************

const endpoint = '/rest/';

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
	let featureRide = rides.sort((a,b) => b.ride_date > a.ride_date)[0];

	renderFitness();
	renderWeeklyDistance();
	renderActivities();
	renderRecentRides();
	renderLongRides();
	renderFeatureRide(featureRide);
	populateRideInput(featureRide);
	document.querySelectorAll('.rides__list ul').forEach(r => r.addEventListener('click', e => {
		featureRide = rides.find(r => r.id == e.target.parentNode.dataset.ride)
		renderFeatureRide(featureRide)
	}));
	activityElement.addEventListener('click', e => {
		console.log(e.target.parentNode.dataset.date);
		activityRides = rides.filter(r => r.ride_date == e.target.parentNode.dataset.date);
		renderSearchResults(activityRides);
		renderFeatureRide(activityRides[0]);
	});
	searchResults.addEventListener('click', e => {
		console.log('bingo', e.target.parentNode.dataset.ride);
		featureRide = rides.find(r => r.id == e.target.parentNode.dataset.ride)
		renderFeatureRide(featureRide);
		searchResults.innerHTML = "";
		searchTerm = "";
		searchElement.value = searchTerm;
	});
}


// ********************* Fitness data
function renderFitness() {
	const fitData = fitnessData()
	fitnessElement.textContent = fitData.fitCtl.toFixed(0);
	fatigueElement.textContent = fitData.fitAtl.toFixed(0);
	formElement.textContent = fitData.fitTsb.toFixed(0);
	let ramp7 = fitData.fitCtl - fitData.ctlData[fitData.ctlData.length - 8];
	let ramp28 = fitData.fitCtl - fitData.ctlData[fitData.ctlData.length - 29];
	ramp7Element.textContent = ramp7.toFixed(0);
	ramp28Element.textContent = ramp28.toFixed(0);
}

function fitnessData() {
	let fitCtl = 75;
	let fitAtl = 75;
	let fitTsb = 0;
	let ctlData = [];
	const activityPeriod = 360;
	const decayCtl = 42;
	const decayAtl = 7;
	for (i = 0; i <= activityPeriod; i++) {
		dayTSS = 0;
		thenDate = new Date(new Date(today) - ( activityPeriod - i )*24*60*60*1000).toJSON().split('T')[0];
		rides.forEach(r => dayTSS += thenDate === r.ride_date? r.ride_tss: 0);
		fitCtl = fitCtl + ((dayTSS - fitCtl) / (decayCtl));
		ctlData.push(fitCtl * 1);
		fitTsb = fitCtl - fitAtl;
		fitAtl = fitAtl + ((dayTSS - fitAtl) / decayAtl);
		};
	const fitData = {
		'fitCtl': fitCtl, 
		'fitAtl': fitAtl, 
		'fitTsb': fitTsb, 
		'ctlData': ctlData, 
	};
	return fitData
}

// ********************* Week distance circle
function renderWeeklyDistance() {
	const weekDistance = rides.reduce((sum, r) => sum + (r.ride_date > weekAgoDate ? parseFloat(r.ride_distance): 0 ), 0);
	const priorWeekDistance = rides.reduce((sum, r) => sum + (r.ride_date > priorWeekDate ? parseFloat(r.ride_distance): 0 ), -weekDistance);
	weekDistanceElement.textContent = weekDistance.toFixed(0);
	priorWeekDistanceElement.textContent = priorWeekDistance.toFixed(0);
}

// ********************* Activities
function renderActivities() {
	let saturdayDate = new Date(today);
	saturdayDate.setDate(saturdayDate.getDate() + 7 - saturdayDate.getDay()); 
	const activityList = activityByDate(saturdayDate, 28);

	let activityElementContent = "<ul class='activities'><p class='activity_header'>SAT</p><p class='activity_header'>FRI</p><p class='activity_header'>THU</p><p class='activity_header'>WED</p><p class='activity_header'>TUE</p><p class='activity_header'>MON</p><p class='activity_header'>SUN</p>";
	activityList.forEach(a => activityElementContent += `<li class="activity" data-date=${a.date}><p class='activity_date'>${formatDay(a.date)}</p><p class='activity_daily'>${parseFloat(a.distance).toFixed(0)}</p></li>`);
	activityElementContent += "</ul>"
	activityElement.innerHTML = activityElementContent;
	circleSize();
}

function activityByDate(saturdayDate, n) {
	let dateList = [];
	let activityList = [];
	for(i = 0; i < n; i++) {
		dateList.push(new Date(saturdayDate.setDate(saturdayDate.getDate()-1)).toJSON().split('T')[0]);
	}
	dateList.forEach(d => {
		let dayDistance = 0;
		rides.forEach(r => dayDistance += d === r.ride_date? parseFloat(r.ride_distance): 0);
		activityList.push({"date": d, "distance": dayDistance });
	})
	return activityList;
}

function circleSize() {
    const maxCircle = 6;
    // const maxCircle = 80/ Math.sqrt(Math.max(...activityList.distance));

    const popActivityList = document.querySelectorAll('.activity_daily');
    popActivityList.forEach(pop => {
        pop.style.width = pop.textContent > 1? `${Math.sqrt(pop.textContent) * maxCircle }px`: 0;
        pop.style.height = pop.textContent > 1? `${Math.sqrt(pop.textContent) * maxCircle }px`: 0;
    });
    return popActivityList;
}

// ********************* Recent rides
function renderRecentRides() {
	let recentRides = rides.sort((a, b) => b.ride_date > a.ride_date).slice(0, 7);
	let recentElementContent = '<h2>Recent rides</h2><ul>';
	recentRides.forEach(r => recentElementContent += `<li data-ride=${r.id}><p>${formatDate(r.ride_date)}</p><span>${r.ride_name}</span><span>${parseFloat(r.ride_distance).toFixed(1)}km</span></li>`)
	recentElementContent += '</ul>';
	recentElement.innerHTML = recentElementContent;
}

// ********************* Long rides
function renderLongRides() {
	let longRides = rides.sort((a, b) => parseFloat(b.ride_distance) > parseFloat(a.ride_distance)).slice(0, 6);
	let longElementContent = '<h2>Long rides</h2><ul>';
	longRides.forEach(r => longElementContent += `<li data-ride=${r.id}><p>${formatFullDate(r.ride_date)}</p><span>${r.ride_name}</span><span>${parseFloat(r.ride_distance).toFixed(0)}km</span></li>`)
	longElementContent += '</ul>'
	longElement.innerHTML = longElementContent;
}

// ********************* Feature ride
function renderFeatureRide(featureRide) {
	const rideDetailElementContent = `<h2>Ride details</h2>
		<ul>
			<li><p>Date</p><span>${formatFullDate(featureRide.ride_date)}</span></li>
			<li><p>Name</p><span>${featureRide.ride_name}</span></li>
			<li><p>Distance</p><span>${parseFloat(featureRide.ride_distance).toFixed(1)}km</span></li>
			<li><p>Duration</p><span>${featureRide.ride_time.toFixed(0)}min</span></li>
			<li><p>Speed</p><span>${(parseFloat(featureRide.ride_distance) / featureRide.ride_time * 60).toFixed(1)}km/h</span></li>
			<li><p>TSS</p><span>${(featureRide.ride_tss).toFixed(0)}</span></li>
			<li><p>Bike</p><span>${equipmentById(bikes, featureRide.bike_name).bike_description}</span></li>
			<li><p>Wheels</p><span>${equipmentById(wheels, featureRide.wheelset).wheels_name}</span></li>
			<li><p>Comments</p><span>${featureRide.ride_comment}</span></li>
		</ul>
		<a href='../ride/${featureRide.id}'><button class='button__edit'>Edit</button></a>
	`;
	rideDetailElement.innerHTML = rideDetailElementContent;
	renderFeatureBike(featureRide)
}

// ******************** Feature bike
function renderFeatureBike(featureRide) {
	featureBike = bikes.find(b => b.id == featureRide.bike_name);
	bikeDistance = rides.reduce((sum, r) => sum += (r.bike_name == featureBike.id ? parseFloat(r.ride_distance): 0), 0).toFixed(0)

	const bikeDetailElementContent = `<h2>${featureBike.bike_name}</h2>
		<ul>
			<li><p>${featureBike.bike_description}</p></li>
			<li><span class="distance">${intComma(bikeDistance, {})}
				</span></li>
			<li><p></p><span>Since ${formatFullDate(featureBike.date_acquired)}</span></li>
		</ul>
	`;
	const bikeDetailImage = `url(${featureBike.image})`;
	bikeDetailElement.innerHTML = bikeDetailElementContent;
	bikeDetailElement.style.backgroundImage = bikeDetailImage;
}


// *********************** Search
searchElement.addEventListener('keyup', (e) => {
	if (e.key === "Backspace") {
		searchTerm = searchTerm.slice(0, -1);
	} else { 
		if (49 <= e.keyCode && e.keyCode <= 90 ) {
			searchTerm += e.key;
			searchElement.value = searchTerm;
		} 
	}
	if (searchTerm.length > 1) {
		searchRides(searchTerm);
	}
})

function searchRides(searchString) {
	let searchRides = [];
	rides.sort((a, b) => b.ride_date > a.ride_date).forEach(r => { 
		rideDetail = (r.ride_name + r.ride_comment).trim(); 
		if (rideDetail.toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
			searchRides.push(r);
		}
	})
	renderSearchResults(searchRides);
}

function renderSearchResults(ride) {
	let searchResultsContent = "";
	ride.forEach(r => {
		searchResultsContent += `
			<li data-ride=${r.id}>
			<p>${formatFullDate(r.ride_date)}</p>
			<p>${r.ride_name}</p>
			<p>${parseFloat(r.ride_distance).toFixed(0)}km</p>
			</li>
			`
	})
	searchResults.innerHTML = searchResultsContent;
}


// ********************* Populate the input form

function populateRideInput(featureRide) {
	dateElement.value = today;
	Array.from(bikeElement.children).forEach(b => {
		if(b.value == featureRide.bike_name) {
			b.selected = 'true'
		}
	})
	Array.from(wheelElement.children).forEach(w => {
		if(w.value == featureRide.wheelset) {
			w.selected = 'true'
		}
	})
}


// ********************** Utility functions

function equipmentById(equip, id) {
	const gear = equip.find(p => p.id == id);
	return gear; 
}

