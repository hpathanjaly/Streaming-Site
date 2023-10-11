//import {getData} from './fetch.js'
window.onload = createList()

class Show{
    constructor(name, year, image, genre, description){
        this.name = name;
        this.year = year;
        this.image = image;
        this.genre = genre;
        this.description = description;
        this.newRelease = year == new Date().getFullYear()
    }

    static modalOpen = false
    
    addToPage(type){
        document.getElementById(type).append(this.buildShow())
    }

    buildShow(){
        let showEl = document.createElement('div')
        showEl.classList.add('show')
        showEl.style.backgroundImage = 'url(' + this.image + ')'
        showEl.onclick = this.makeModal.bind(this)
        return showEl
    }

    addToList(){        
        let theList = localStorage.getItem('theList')
        if(theList){
            theList += this.name + ", "
        }
        else{
            theList = this.name + ", "
        }
        localStorage.setItem('theList', theList)
        console.log(theList)
        createList()
    }

    remove(){
        let theList = localStorage.getItem('theList')
        let data = theList.split(', ')
        theList = ""
        for(let i = 0; i < data.length; i++){
            if(data[i] == this.name){
                data.splice(i, 1)
            }
            if(data[i] == "," || data[i] == "" || data[i] == ", " || data[i] == " "){
                continue
            }
            theList += data[i] + ", "
        }
        // for(let i = 0; i < data.length; i++){
            
        // }        
        console.log(theList)
        localStorage.setItem('theList', theList)
        createList()
    }

    checkInList(){
        let inList = false
        let theList = localStorage.getItem('theList')
        let data
        if(theList){
            data = theList.split(', ')
            for(let i = 0; i < data.length; i++){
                if(data[i] == this.name){
                    inList = true
                }
            }
        }
        return inList
    }

    makeModal(){
        if(!Show.modalOpen){
            Show.modalOpen = true

            let modal = document.createElement('div')
            modal.classList.add('modal')

            let newh1 = document.createElement('h1')
            newh1.innerHTML = this.name

            let newImg = document.createElement('img')
            newImg.src = this.image

            let genreText = document.createElement('p')
            genreText.innerHTML = "Genre: " + this.genre

            let yearText = document.createElement('p')
            yearText.innerHTML = "Year: " + this.year

            let plot = document.createElement('p')
            plot.innerHTML = "Plot: " + this.description
            plot.classList.add('description')

            let closeButton = document.createElement('button')
            closeButton.innerHTML = "X"
            closeButton.classList.add('closeButton')
            closeButton.onclick = this.closeModal

            let br = document.createElement('br')
            
            let addToListButton = document.createElement('button')
            addToListButton.classList.add('listButton')
            let inList = this.checkInList()
            console.log(inList)
            if(inList){
                addToListButton.innerHTML = "Remove from List"
                addToListButton.onclick = () => this.remove()
            }
            else{
                addToListButton.innerHTML = "Add to List"
                addToListButton.onclick = () => this.addToList()
            }

            modal.append(newh1)
            modal.append(newImg)
            modal.append(yearText)
            modal.append(genreText)
            modal.append(plot)
            modal.append(br)
            modal.append(addToListButton)
            modal.append(closeButton)
            document.body.append(modal)
        }
    }

    closeModal(){
        Show.modalOpen = false
        document.body.removeChild(document.querySelector('.modal'))
    }
}

// function createList(){
//     let data = localStorage.getItem('theList').split(", ")
//     if(data){
//         for(let i = 0; i < data.length; i++){
//             document.getElementById('myList').append(data[i].buildShow())
//         }
//     }
// }

function searchTitle(data){
	for(let i = 0; i < data.length; i++){
        fetch("https://www.omdbapi.com/?t=" + data[i] + "&apikey=d35c7088")
        .then(function(response){
            return response.json()
        }).then((stuff) => {
            getNewData(stuff)
        })
	}
}

function getNewData(stuff){
	let description = stuff.Plot
	let genre = stuff.Genre
	let result = new Show(stuff.Title, stuff.Year, stuff.Poster, genre, description)
	result.addToPage('myList')
}

function createList(){
    document.getElementById('myList').innerHTML = ""
    let data
    if(localStorage.getItem('theList')){
        data = localStorage.getItem('theList').split(", ")
        console.log(data)
        for(let i = 0; i < data.length; i++){
            if(data[i] == "," || data[i] == "" || data[i] == ", " || data[i] == " "){
                data.splice(i, 1)
            }
        }
        console.log(data)
    }
    if(data){
        searchTitle(data)
    }
}

export {Show}