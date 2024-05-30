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
        <a href="character.html">
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
