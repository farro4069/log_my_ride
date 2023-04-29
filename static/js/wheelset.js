// *************  Global variables **********************************************
const today = new Date(new Date().setHours(12)).toJSON().split('T')[0];



// ************** DOM Elements ************
const currentWheelsetElement = document.getElementById('wheelsets-current');
const previousWheelsetElement = document.getElementById('wheelsets-retired');
const featureWheelsetElement = document.getElementById('wheelset-featured');



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
	wheelsets = data.wheelData.sort((a, b) => b.date_acquired > a.date_acquired);
	featureRide = rides.sort((a, b) => b.ride_date > a.ride_date)[0]
	featureWheelset = wheelsets.find(w => w.id == featureRide.wheelset);

	renderWheelsets();
	renderFeatureWheelset(featureWheelset, featureRide);

	document.querySelectorAll(".bikes__list ul").forEach(l => l.addEventListener('click', (e) => {
		e.preventDefault();
		feature = wheelsets.find(w => w.id == (e.target.parentNode.dataset.bike))
		renderFeatureWheelset(feature, featureRide);
	}));
}

function renderWheelsets() {
	let currentWheelsetElementContent ='<h2>Current wheelsets</h2><ul>'
	wheelsets.filter(w => !w.date_sold).forEach(w => currentWheelsetElementContent += `
		<li data-bike=${w.id}>
		<p>${w.wheels_name}</p>
		<span>${intComma(rides.reduce((sum, r) => sum += w.id == r.wheelset ? parseFloat(r.ride_distance): 0, 0), {})}km</span>
		</li>
		`)
	currentWheelsetElementContent += '</ul>'
	currentWheelsetElement.innerHTML = currentWheelsetElementContent; 
	let previousWheelsetElementContent ='<h2>Retired wheelsets</h2><ul>'
	wheelsets.filter(w => w.date_sold).forEach(w => previousWheelsetElementContent += `
		<li data-bike=${w.id}>
		<p>${w.wheels_name}</p>
		<span>${intComma(rides.reduce((sum, r) => sum += w.id == r.wheelset ? parseFloat(r.ride_distance): 0, 0), {})}km</span>
		</li>
		`)
	previousWheelsetElementContent += '</ul>'
	previousWheelsetElement.innerHTML = previousWheelsetElementContent; 
}

// ******** Feature wheelset

function renderFeatureWheelset(featureWheelset, featureRide) {
	const featureWheelsetElementContent = `<h2>${featureWheelset.wheels_name}</h2>
		<ul>
			<li><p>${featureWheelset.comments}</p></li>
			<li><span class="distance">${intComma(rides.reduce((sum, r) => sum += featureWheelset.id == r.wheelset ? parseFloat(r.ride_distance): 0, 0), {})}</span></li>
			<li><p>Since ${formatFullDate(featureWheelset.date_acquired)}</p></li>
			<li><p>Retired ${featureWheelset.date_sold ? formatFullDate(featureWheelset.date_sold) : ''}</p></li>
		</ul>
		<a href='/bike/wheels/${featureWheelset.id}'><button class='button__edit'>Edit</button></a>

	`;
	const featureWheelsetImage = `url(${featureWheelset.image})`;
	featureWheelsetElement.innerHTML = featureWheelsetElementContent;
	featureWheelsetElement.style.backgroundImage = featureWheelsetImage;
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

