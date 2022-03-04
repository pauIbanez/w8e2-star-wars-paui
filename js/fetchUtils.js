/* eslint-disable no-await-in-loop */

const url = "https://swapi.dev/api/starships";

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

export default getAllStarShips;
