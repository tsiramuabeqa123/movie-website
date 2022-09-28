"use strict";

class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}

const container = document.querySelector(".container")
const sidebarLogInBtn = document.querySelector(".sidebar-log-in-btn")
const logInForm = document.querySelector(".log-in-form")
const logInUsernameInput = document.querySelector(".username")
const logInPasswordInput = document.querySelector(".password")
const logInBtn = document.querySelector(".log-in-btn")
const formRemoveBtn = document.querySelector(".remover")
const userName = document.querySelector(".user-name")
const sidebarUser = document.querySelector(".sidebar-user")
const sidebar = document.querySelector(".sidebar")
const sidebarSpan = document.querySelectorAll(".sidebar-span")
const hamburger = document.querySelector(".hamburger-content")
const nav = document.querySelector(".nav-links")
const navContent = document.querySelector(".nav-right-content")
const sidebarRegisterBtn = document.querySelector(".sidebar-register-btn")
const sidebarRegisterForm = document.querySelector(".register-form")
const registerRemover = document.querySelector(".register-remover")
const registerBtn = document.querySelector(".register-button")
const registerUsername = document.querySelector(".register-username")
const registerPassword1 = document.querySelector(".register-password1")
const registerPassword2 = document.querySelector(".register-password2")
const regPasswords = document.querySelectorAll(".reg-pass")
const logInInputs = document.querySelectorAll(".log-in-input")
const sidebarLogOut = document.querySelector(".sidebar-log-out")
const allRegInp = document.querySelectorAll(".reg-inp")

let usernameArr = []
let passwordArr = []

sidebarRegisterBtn.addEventListener("click", function() {
  sidebarRegisterForm.style.display = "block"
  container.style.opacity = "0.2"
})

registerRemover.addEventListener("click", ()=> {
  sidebarRegisterForm.style.display = "none"
  container.style.opacity = "1"
})

registerBtn.addEventListener("click", function() {
  if (registerPassword1.value === registerPassword2.value) {
    usernameArr.push(registerUsername.value)
    passwordArr.push(registerPassword1.value)
    sidebarRegisterForm.style.display = "none"
    container.style.opacity = "1"
    sidebarRegisterBtn.style.display = "none"
    for (let i of regPasswords) {
      i.style.borderBottomColor = "#444"
    }
  } else {
    for (let i of regPasswords) {
      i.style.borderColor = "red"
    }
  }
  for(let i of allRegInp) {
    i.value = ""
  }
})

let counter = 1
hamburger.addEventListener("click", ()=> {
  counter++
  if (counter % 2 == 0) {
    nav.style.display = "flex"
  } else {
    nav.style.display = "none"
  }
})

sidebar.addEventListener("mouseover", function() {
  sidebar.style.width = "200px"
  sidebarLogInBtn.style.width = "150px"
  sidebarRegisterBtn.style.width = "150px"
  for (let i of sidebarSpan) {
    i.style.display = "block"
  }
})

sidebar.addEventListener("mouseout", ()=> {
  sidebar.style.width = "90px"
  sidebarLogInBtn.style.width = "70px"
  sidebarRegisterBtn.style.width = "70px"
  for (let i of sidebarSpan) {
    i.style.display = "none"
  }
})

sidebarLogInBtn.addEventListener("click", function() {
  container.style.opacity = "0.2"
  logInForm.style.display = "block"

})

formRemoveBtn.addEventListener("click", ()=> {
  logInForm.style.display = "none"
  container.style.opacity = "1"
})

logInBtn.addEventListener("click", function() {
  const obj = new User(logInUsernameInput.value, logInPasswordInput.value)
  if (usernameArr.includes(logInUsernameInput.value) && passwordArr.includes(logInPasswordInput.value)) {
    sidebarLogInBtn.style.display = "none"
    sidebarUser.style.display = "block"
    userName.textContent = logInUsernameInput.value
    logInForm.style.display = "none"
    container.style.opacity = "1"
    sidebarLogOut.style.display = "block"
    for (let i of logInInputs) {
      i.value = ""
    }
  }
  else {
    for (let i of logInInputs) {
      i.style.borderColor = "red"
    }
  }
  
})

sidebarLogOut.addEventListener("click", ()=> {
  usernameArr = []
  passwordArr = []
  sidebarUser.style.display = "none"
  sidebarRegisterBtn.style.display = "block"
  sidebarLogInBtn.style.display = "block"
  sidebarLogOut.style.display = "none"
})



const main = document.querySelector("main")
const API_KEY = "api_key=2263815fb012ff3af28c7f62dc94e644"
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
const imageUrl = 'https://image.tmdb.org/t/p/w500'
const tags = document.querySelector(".tags")

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
]

settingGenre()
function settingGenre() {
  tags.innerHTML = ''
  genres.forEach(genre => {
    const genreDiv = document.createElement("div")
    genreDiv.classList.add("tag")
    genreDiv.id=genre.id
    genreDiv.innerText = genre.name
    tags.appendChild(genreDiv)
  })
}

getMovies(API_URL)

function getMovies(url) {
	fetch(url).then(res => res.json()).then(data => {
		showMovies(data.results)
	})
}

function showMovies(data) {
  main.innerHTML = ""
  data.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML = `
    <img src="${imageUrl + poster_path}" alt="${title}">

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="">${vote_average}</span>
        </div>

        <div class="overview">
          ${overview}
        </div>
    `
    main.appendChild(movieEl)
  });
}

