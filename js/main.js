const url = "https://swapi.dev/api/starships";

const totalStarships = document.querySelector("#total-ships");
const starShipsClasses = document.querySelector("#class-list");

const toHtml = (name, count) => `<p>${name}: ${count}</p>`;

const fetchAPI = async (toFetchurl) => {
  const response = await fetch(toFetchurl);
  const { count, results, next } = await response.json();

  return { count, results, next };
};

const currentStarships = [];
let count;
let currentUrl = url;

const getAllStarShips = async () => {
  const results = await fetchAPI(currentUrl);
  currentStarships.push(...results.results);
  count = results.count;

  if (results.next) {
    currentUrl = results.next;
    await getAllStarShips();
  }
};

(async () => {
  await getAllStarShips();
  totalStarships.textContent += ` ${count}`;

  const starshipClasses = [];

  currentStarships.forEach((starship) => {
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
