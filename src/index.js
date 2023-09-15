
let addToy = false;
let toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//Fetch toy data
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then(function (toys) {
      toys.forEach(function (toy) {
        handleCard(toy);
      })
    })

//Card Handler
  function handleCard(toy) {
    const card = document.createElement('div');
    card.classList = "card"
    toyCollection.appendChild(card)
    card.innerHTML = 
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`

    card.querySelector("button").addEventListener('click', function() {
      toy.likes += 1;
      newNumberOfLikes = toy.likes
      card.querySelector("p").innerHTML = toy.likes;
      fetch(`http://localhost:3000/toys/${this.id}`, {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify({
          "likes": newNumberOfLikes
        })
      })
    })

  }


//Create New Toy
document.addEventListener('submit', function(e) {
  e.preventDefault();
  const toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  postToy(toyObj)
})

//Post Toy to DOM
function postToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(toyObj)
  })
}


});