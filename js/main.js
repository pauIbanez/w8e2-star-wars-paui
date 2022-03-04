/* eslint-disable no-await-in-loop */
const url = "https://swapi.dev/api/starships";

const totalStarships = document.querySelector("#total-ships");
const starShipsClasses = document.querySelector("#class-list");

const toHtml = (name, count) => `<p>${name}: ${count}</p>`;

const fetchAPI = async (toFetchurl) => {
  const response = await fetch(toFetchurl);
  const { count, results, next } = await response.json();

  return { count, results, next };
};

const getAllStarShips = async () => {
  const currentStarships = [];
  let count;
  let currentUrl = url;

  let results = await fetchAPI(currentUrl);
  currentStarships.push(...results.results);
  count = results.count;

  while (results.next) {
    currentUrl = results.next;
    results = await fetchAPI(currentUrl);
    currentStarships.push(...results.results);
    count = results.count;
  }
  return { starships: currentStarships, count };
};

(async () => {
  const { starships, count } = await getAllStarShips();
  totalStarships.textContent += ` ${count}`;

  const starshipClasses = [];

  starships.forEach((starship) => {
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
