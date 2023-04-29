const dateElement = document.getElementById('id_ride_date');
const bikeElement = document.getElementById('id_bike');
const wheelsetElement = document.getElementById('id_wheelset');

// ********************* Populate the input form

function populateRideInput(featuredRide) {
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
