const rideList = document.getElementById('rides__list');
const bikeCurrent = document.getElementById('bikes__current');
const bikeRetired = document.getElementById('bikes__retired');
const rideFeature = document.getElementById('ride__feature');

let rideListContent = [];
let rideFeatureContent = [];
let searchTerm = '';
let searchResultsContent = '';
let chosenBike = 0;


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
	rides = data.rideData.sort((a, b) => b.ride_date > a.ride_date);
	bikes = data.bikeData;
	wheels = data.wheelData;

	renderBikes(bikes);

	document.getElementById('search_term').addEventListener('keyup', searchRides);
	document.getElementById('rides__list').addEventListener('click', e => {
		e.preventDefault();
		renderFeatureRide(e.target.parentNode.dataset.num);
	});

}

function renderBikes(bikes) {
	bikeCurrentContent = '';
	bikes.forEach(b => {
		if(b.date_sold == null) {
			bikeCurrentContent += `
				<li data-num=${b.id}>
				<p>${b.bike_name}
				</li>`
			}
		});
	bikeCurrent.innerHTML = bikeCurrentContent;

	bikeRetiredContent = '';
	bikes.forEach(b => {
		if(b.date_sold != null) {
			bikeRetiredContent += `
				<li data-num=${b.id}>
				<p>${b.bike_name}
				</li>`
			}
		});
	bikeRetired.innerHTML = bikeRetiredContent;

	document.querySelector('.bikes__menu').addEventListener('click', (e) => {
		chosenBike = e.target.parentNode.dataset.num;
		renderRides(rides, chosenBike);
	})
}



function renderRides(rides, chosenBike) {
	rideListContent = `<ul><h2>${bikes.filter(b => b.id == chosenBike )[0].bike_description}</h2>`
	rides.filter(r => r.bike_name == chosenBike).forEach(r => {
		rideListContent += `
			<li data-num=${r.id}>
			<p>${formatFullDate(r.ride_date)}</p>
			<span>${r.ride_name}</span>
			<span>${r.ride_distance}km</span>
			</li>`
	})
	rideListContent += '</ul>';
	rideList.innerHTML = rideListContent;
}

function renderFeatureRide(ride) {
	featureRide = rides.find(r => r.id == ride);
	featureBike = bikes.find(b => b.id == featureRide.bike_name);

	rideFeatureContent = `<ul>${featureRide.ride_name}
		<li><p>Date</p><span>${formatFullDate(featureRide.ride_date)}</span></li>
		<li><p>Distance</p><span>${featureRide.ride_distance}km</span></li>
		<li><p>Time</p><span>${featureRide.ride_time}min</span></li>
		<li><p>Speed</p><span>${(featureRide.ride_distance / featureRide.ride_time * 60).toFixed(1)}km/h</span></li>
		<li><p>TSS</p><span>${featureRide.ride_tss}</span></li>
		<li><p>Bike</p><span>${featureBike.bike_description}</span></li>

		<li><p>Comment</p><span>${featureRide.ride_comment}</span></li>
		</ul>
		<a href='/ride/${featureRide.id}'><button class='button__edit'>Edit ride</button></a>
		`
	rideFeature.innerHTML = rideFeatureContent;
}

function searchRides(e) {
	if(e.key == 'Backspace') {
		searchTerm = searchTerm.slice(0, -1)
	} else { 
		if (49 <= e.keyCode && e.keyCode <= 90 ) {
			searchTerm += e.key;
		} 
	};
	if(searchTerm.length > 1) {
		rideListContent = '<ul><h2>Search Results</h2>'
		rides.forEach(r => {
			searchString = r.ride_name + r.ride_comment;
			if(searchString.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
				rideListContent += `<li data-num=${r.id}>
				<p>${formatFullDate(r.ride_date)}</p>
				<span>${r.ride_name}</span>
				<span>${r.ride_distance}km</span>
				</li>`
			}
		})
		rideListContent += '</ul>'
		rideList.innerHTML = rideListContent;
	}
}


