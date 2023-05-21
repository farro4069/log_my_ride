const today = new Date(new Date().setHours(12)).toJSON().split('T')[0];
const prior7Date = previousDate(today, 7);
const prior28Date = previousDate(today, 28);

const label7 = ['', '', '', '', '', '','Yesterday', 'Today'];
const label28 = [
	'',' ', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', 'Yesterday', 'Today'];
const label90 = [
	'', '', '', '', '', '', '', '', '', '',	'', '', '', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '', '', '',	'', '', '', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '', '', '',	'', '', '', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '', '', '',	'', '', '', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '', 'Yesterday', 'Today']

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
	const fitData = fitnessData();
	render7Chart(fitData.dailyData.slice(353));
	render28Chart(fitData.dailyData.slice(332));
	render90Chart(fitData.dailyData.slice(270));
}

// ********************* Calculate daily scores

function fitnessData() {
	let fitCtl = 75;
	let fitAtl = 75;
	let fitTsb = 0;
	let dailyData = [];
	const activityPeriod = 360;
	const decayCtl = 42;
	const decayAtl = 7;
	for (i = 0; i <= activityPeriod; i++) {
		dayTSS = 0;
		thenDate = new Date(new Date(today) - ( activityPeriod - i )*24*60*60*1000).toJSON().split('T')[0];
		rides.forEach(r => dayTSS += thenDate === r.ride_date? r.ride_tss: 0);
		fitCtl = fitCtl + ((dayTSS - fitCtl) / (decayCtl));
		fitAtl = fitAtl + ((dayTSS - fitAtl) / (decayAtl));
		dailyData.push({"ctl": fitCtl * 1, "atl": fitAtl * 1});
		fitTsb = fitCtl - fitAtl;
		};
	const fitData = {
		'fitCtl': fitCtl, 
		'fitAtl': fitAtl, 
		'fitTsb': fitTsb, 
		'dailyData': dailyData, 
	};
	return fitData
}


function render7Chart(dailyData) {
	const ramp7Element = document.getElementById('ramp7days');

	let ctl=[];
	dailyData.forEach(d => ctl.push(d.ctl));
	let atl=[];
	dailyData.forEach(d => atl.push(d.atl));

	new Chart(ramp7Element, {
		type: 'line',
		data: {
			labels: label7,
			datasets: [{
				label: 'CTL',
				display: false,
				data: ctl,
				fill: false,
				borderColor: 'hsl(200, 58%, 60%)',
				pointRadius: 5, 
				hoverRadius: 5,
				borderWidth: 5,
			},{
				label: 'ATL',
				display: false,
				data: atl,
				fill: false,
				pointRadius: 0, 
				hoverRadius: 0,
				borderWidth: 2,
			}]
		},
		options: {
			showLine: true,
			plugins: {
				legend: {
					display: false,	
				},
				title: {
					display: true,
					text: '7 days',
					position: 'top',
					font: {
						size: 20,
						weight: 'normal'
					},
				}
			},
			elements: {line: {tension: 0.2}},
			scales: {
				x: {
					display: false,
					bounds: 'data',
					grid: {
						display: false
					},
					beginAtZero: false,
					ticks: {
						display: false
					}
				},
				y: {
					display: false,
					grid: {
						display: false
					},
					beginAtZero: false,
					ticks: {
						display: false
					}

				}
			}
		}
	});
}

function render28Chart(dailyData) {
	const ramp28Element = document.getElementById('ramp28days');

	let ctl=[];
	dailyData.forEach(d => ctl.push(d.ctl));
	let atl=[];
	dailyData.forEach(d => atl.push(d.atl));

	new Chart(ramp28Element, {
		type: 'line',
		data: {
			labels: label28,
			datasets: [{
				label: 'CTL',
				display: false,
				data: ctl,
				fill: false,
				borderColor: 'hsl(200, 58%, 60%)',
				pointRadius: 0, 
				hoverRadius: 0,
				borderWidth: 5,
			},{
				label: 'ATL',
				display: false,
				data: atl,
				fill: false,
				pointRadius: 0, 
				hoverRadius: 0,
				borderWidth: 2,
			}]
		},
		options: {
			plugins: {
				legend: {
					display: false,	
				},
				title: {
					display: true,
					text: '28 days',
					position: 'top',
					font: {
						size: 20,
						weight: 'normal'
					},
				}
			},
			elements: {line: {tension: 0.3}},
			scales: {
				x: {
					display: false,
					bounds: 'data',
					grid: {
						display: false
					},
					beginAtZero: false,
					ticks: {
						display: false
					}
				},
				y: {
					display: false,
					grid: {
						display: false
					},
					beginAtZero: false,
					ticks: {
						display: false
					}

				}
			}
		}
	});
}

function render90Chart(dailyData) {
	const ramp90Element = document.getElementById('ramp90days');

	let ctl=[];
	dailyData.forEach(d => ctl.push(d.ctl));
	let atl=[];
	dailyData.forEach(d => atl.push(d.atl));

	new Chart(ramp90Element, {
		type: 'line',
		data: {
			labels: label90,
			datasets: [{
				label: 'CTL',
				display: false,
				data: ctl,
				fill: false,
				borderColor: 'hsl(200, 58%, 60%)',
				pointRadius: 0, 
				hoverRadius: 0,
				borderWidth: 5,
			},{
				label: 'ATL',
				display: false,
				data: atl,
				fill: false,
				pointRadius: 0, 
				hoverRadius: 0,
				borderWidth: 2,
			}]
		},
		options: {
			plugins: {
				legend: {
					display: false,	
				},
				title: {
					display: true,
					text: '90 days',
					position: 'top',
					font: {
						size: 20,
						weight: 'normal'
					},
				}
			},
			elements: {line: {tension: 0.3}},
			scales: {
				x: {
					display: false,
					bounds: 'data',
					grid: {
						display: false
					},
					beginAtZero: false,
					ticks: {
						display: false
					}
				},
				y: {
					display: false,
					grid: {
						display: false
					},
					beginAtZero: false,
					ticks: {
						display: false
					}

				}
			}
		}
	});
}


