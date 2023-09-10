const fetchCountriesQuery = () => {
  return `
        SELECT id, nicename, phonecode 
        FROM countries
    `;
};
module.exports = { fetchCountriesQuery };
