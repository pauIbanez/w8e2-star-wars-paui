// eslint-disable-next-line import/extensions
import getAllStarShips from "./fetchUtils.js";

const totalStarships = document.querySelector("#total-ships");
const starShipsClasses = document.querySelector("#class-list");

const toHtml = (name, count) => `<p>${name}: ${count}</p>`;

(async () => {
  const { starships, count } = await getAllStarShips();
  totalStarships.textContent += ` ${count}`;

  const starshipClasses = [];

  starships.forEach((starship) => {
    const starshipClass = starship.starship_class;

    let classExists = false;

    starshipClasses.map((starClass) => {
      const newStarship = { ...starClass };

      if (starClass.name === starshipClass) {
        newStarship.shipCount += 1;
        classExists = true;
      }
      return newStarship;
    });

    if (!classExists) {
      starshipClasses.push({
        name: starshipClass,
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
