const month = ['mth', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


const navToggle = document.querySelector('.nav__toggle');

navToggle.addEventListener('click', () => {
	document.body.classList.toggle('nav-open')
});



// Utility functions * * * * * * * * * * * * *

function intComma(number, context) {
	niceFormat = new Intl.NumberFormat('en-US', {style:'decimal', maximumFractionDigits: 0, }).format(number);
	return niceFormat;
}

function previousDate(date, period) {
	dd = date.split('-');
	previous = new Date(new Date(date).setDate(new Date(dd[0], dd[1], dd[2]).getDate() - period )).toJSON().split("T")[0];
	return previous;
}

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

