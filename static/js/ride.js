const dateElement = document.getElementById('id_ride_date');
const bikeElement = document.getElementById('id_bike');
const wheelsetElement = document.getElementById('id_wheelset');

console.log("Hello from ride.js")


// ********************* Populate the input form

function populateRideInput(featuredRide) {
	console.log('called');
	return
}



function populateRideInputBAK(featuredRide) {
	dateElement.value = today;
	Array.from(bikeElement.children).forEach(b => {
		if(b.value == featuredRide.bike_name) {
			b.selected = 'true'
		}
	})
	Array.from(wheelsetElement.children).forEach(w => {
		if(w.value == featuredRide.wheelset) {
			w.selected = 'true'
		}
	})
}
