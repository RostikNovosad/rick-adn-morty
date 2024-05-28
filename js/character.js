const BASE_URL = "https://rickandmortyapi.com/api/character";

const id = 6;

const characteName = document.querySelector(".character-name");
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
    console.log(data.origin);
    characteName.textContent = data.name;
    characterGender.textContent = data.gender;
    characterStatus.textContent = data.status;
    characterSpecie.textContent = data.species;
    characterOrigin.textContent = data.origin.name;
    characterType.textContent = data.type;
  })
  .catch((err) => {
    console.log(err);
  });
