// eslint-disable-next-line import/extensions
import getAllStarShips from "./fetchUtils.js";

const totalStarships = document.querySelector("#total-ships");
const starShipsClasses = document.querySelector("#class-list");

const toHtml = (name, count) => `<p>${name}: ${count}</p>`;

(async () => {
  const { starships, count } = await getAllStarShips();
  totalStarships.textContent += ` ${count}`;

  let starshipClasses = [];

  starships.forEach((starship) => {
    const starshipClass = starship.starship_class;

    let classExists = false;

    const newStarships = starshipClasses.map(({ name, shipCount }) => {
      if (name.toLowerCase() === starshipClass.toLowerCase()) {
        classExists = true;
        const newShipCount = shipCount + 1;

        return { name, shipCount: newShipCount };
      }
      return { name, shipCount };
    });

    starshipClasses = [...newStarships];

    if (!classExists) {
      starshipClasses.push({
        name: starshipClass[0].toUpperCase() + starshipClass.substring(1),
        shipCount: 1,
      });
    }
  });

  const sortedStarClasses = starshipClasses.sort((classOne, classTwo) => {
    if (classOne.name < classTwo.name) {
      return -1;
    }
    if (classOne.name > classTwo.name) {
      return 1;
    }
    return 0;
  });

  sortedStarClasses.forEach(({ name, shipCount }) => {
    starShipsClasses.innerHTML += toHtml(name, shipCount);
  });
})();
