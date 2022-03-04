const url = "https://swapi.dev/api/starships";

const totalStarships = document.querySelector("#total-ships");

const toHtml = (text) => `<p>${text}</p>`;

(async () => {
  const response = await fetch(url);
  const { count, results } = await response.json();

  totalStarships.textContent += ` ${count}`;
})();
