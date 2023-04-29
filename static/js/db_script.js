const dbase = dbaseData.filter(d => d.user_id == "1") 

console.log(dbase.length)

// localStorage.setItem('lastInstance', -1)


let instance = localStorage.getItem('lastInstance')
instance = instance * 1 + 1

localStorage.setItem('lastInstance', instance)

const instanceElement = document.getElementById('inst')

instanceElement.value = instance
instanceElement.textContent = instance

// Grab all the elements 

document.getElementById('id_date').value = dbase[instance].date;
document.getElementById('id_bike').value = dbase[instance].bike_id;
document.getElementById('id_content').value = dbase[instance].content;

