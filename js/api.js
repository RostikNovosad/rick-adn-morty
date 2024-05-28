const gridContainer = document.querySelector(".grid");

const BASE_URL = "https://rickandmortyapi.com/api/character";

const fetchCharacter = () => {
  return fetch(BASE_URL).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
const createCharacterCard = (data) => {
  return `
  <li>
        <a href="character.html">
          <div class="card">
            <img src="img/card-photo.jpg" alt="card-photo" class="card-photo" />
            <h2 class="character-name">${data.name}</h2>
            <h3 class="character-type">${data.species}</h3>
          </div>
        </a>
      </li>
  `;
};

fetchCharacter()
  .then((data) => {
    // console.log(data.results);
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

    data.results.map((element) => {
      //      console.log(element.name);
      gridContainer.innerHTML += createCharacterCard(element);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//test
