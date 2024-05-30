const gridContainer = document.querySelector(".grid");
const inputSearch = document.querySelector(".search-character");

const BASE_URL = "https://rickandmortyapi.com/api/character";

const fetchCharacter = (URL) => {
  return fetch(URL).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

const createCharacterCard = (data) => {
  return `
  <li class="card-js" key="${data.id}">
        <a href="#">
          <div class="card">
            <img src="https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg" alt="card-photo" class="card-photo" />
            <h2 class="character-name">${data.name}</h2>
            <h3 class="character-type">${data.species}</h3>
          </div>
        </a>
      </li>
  `;
};

fetchCharacter("https://rickandmortyapi.com/api/character")
  .then((data) => {
    console.log(data.results);

    data.results.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    console.log(data.results);

    data.results.forEach((element) => {
      gridContainer.innerHTML += createCharacterCard(element);
    });

    inputSearch.addEventListener("change", () => {
      if (inputSearch.value.trim() !== "") {
        fetchCharacter(
          `https://rickandmortyapi.com/api/character/?name=${inputSearch.value.trim()}`
        )
          .then((data) => {
            gridContainer.innerHTML = "";
            data.results.forEach((element) => {
              data.results.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              });
              if (element.name.includes(inputSearch.value.trim())) {
                gridContainer.innerHTML += createCharacterCard(element);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

// тута айдішка витягується :)

// const cardJs = document.querySelector(".card-js");
// let cardId = 0;
// // const keyAttribute = cardJs.getAttribute("key");

// cardJs.addEventListener("click", () => {
//   console.log(cardJs.getAttribute("key"));
// });

// function clickHandler(event) {
//   console.log(event.current.getAttribute("key=[value]"));
// }
// cardJs.addEventListener("click", clickHandler);

// це вже безпосереднє створення карточки персонажа, роута не буде бо на карточці стоїть заглушка

// const characterPhoto = document.querySelector(".card-photo");
// const characterName = document.querySelector(".character-name");
// const characterGender = document.querySelector(".character_info-gender");
// const characterStatus = document.querySelector(".character_info-status");
// const characterSpecie = document.querySelector(".character_info-specie");
// const characterOrigin = document.querySelector(".character_info-origin");
// const characterType = document.querySelector(".character_info-type");

// const fetchCharacterProfile = () => {
//   return fetch(`${BASE_URL}/${id}`).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// };

// fetchCharacterProfile()
//   .then((data) => {
//     characterPhoto.src = `https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`;
//     characterName.textContent = data.name;
//     characterGender.textContent = data.gender;
//     characterStatus.textContent = data.status;
//     characterSpecie.textContent = data.species;
//     characterOrigin.textContent = data.origin.name;
//     characterType.textContent = data.type;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
