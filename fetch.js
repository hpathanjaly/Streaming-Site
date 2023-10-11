import {Show} from './show.js'

document.querySelector('button').onclick = getResult;

function getResult(){
	document.getElementById('search').innerHTML = "";
	let search = document.querySelector('input').value
	fetch("https://www.omdbapi.com/?s=" + search + "&apikey=d35c7088")
		.then(function(response){
			return response.json()
		}).then(function(data){
			console.log(data.Search)
			check(data.Search)
			if(check(data.Search)){
				display(data.Search)
			}
		})
}

function check(data){
	for(let i = 0; i < data.length; i++){
		if(!data[i].Title){
			return false
		}
		return true
	}
}

function display(data){
	for(let i = 0; i < data.length; i++){
		fetch("https://www.omdbapi.com/?t=" + data[i].Title + "&apikey=d35c7088")
		.then(function(response){
			return response.json()
		}).then((stuff) => {
			getData(data[i], stuff)
		})
	}
}

function getData(data, stuff){
	let description = stuff.Plot
	let genre = stuff.Genre
	//console.log(description + " " + genre)
	let result = new Show(data.Title, data.Year, data.Poster, genre, description)
	//console.log(result)
	result.addToPage('search')
	
}

//export {getData}