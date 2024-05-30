const BASE_URL = "https://rickandmortyapi.com/api/character";

const idStr = localStorage.getItem("id");
let id = +idStr;
console.log(id);
console.log(typeof id);

const characterPhoto = document.querySelector(".card-photo");
const characterName = document.querySelector(".character-name");
const characterGender = document.querySelector(".character_info-gender");
const characterStatus = document.querySelector(".character_info-status");
const characterSpecie = document.querySelector(".character_info-specie");
const characterOrigin = document.querySelector(".character_info-origin");
const characterType = document.querySelector(".character_info-type");

const fetchCharacterProfile = () => {
  return fetch(`${BASE_URL}/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

fetchCharacterProfile()
  .then((data) => {
    characterPhoto.src = `https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`;
    characterName.textContent = data.name;
    characterGender.textContent = data.gender;
    characterStatus.textContent = data.status;
    characterSpecie.textContent = data.species;
    characterOrigin.textContent = data.origin.name;
    characterType.textContent = data.type;
  })
  .catch((err) => {
    console.log(err);
  });
