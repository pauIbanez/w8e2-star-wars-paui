const url = "https://swapi.dev/api/starships";

const totalStarships = document.querySelector("#total-ships");
const starShipsClasses = document.querySelector("#class-list");

const toHtml = (name, count) => `<p>${name}: ${count}</p>`;

(async () => {
  const response = await fetch(url);
  const { count, results } = await response.json();

  totalStarships.textContent += ` ${count}`;

  const starshipClasses = [];

  results.forEach((starship) => {
    const starshipClass = starship.starship_class;

    let classExists = false;

    starshipClasses.forEach((starClass) => {
      if (starClass.name === starshipClass) {
        // eslint-disable-next-line no-param-reassign
        starClass.shipCount += 1;
        classExists = true;
      }
    });

    if (!classExists) {
      starshipClasses.push({
        name: starshipClass,
        shipCount: 1,
      });
    }
  });

  starshipClasses.forEach(({ name, shipCount }) => {
    starShipsClasses.innerHTML += toHtml(name, shipCount);
  });
})();
