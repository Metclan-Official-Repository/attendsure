const rowCount = () => {
  return `SELECT FOUND_ROWS() AS total_count`;
};
module.exports = { rowCount };
