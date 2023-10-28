const addLocationQuery = (
  name,
  address,
  city,
  country_id,
  locationUniqueName,
  isActive,
  businessId,
  createdAt,
  updatedAt
) => {
  return `
        INSERT INTO business_locations(name, address, city, country_id, location_unique_name, is_active, created_at, updated_at, business_id)
        VALUES("${name}", "${address}","${city}", ${country_id}, "${locationUniqueName}", ${isActive},${createdAt}, ${updatedAt}, ${businessId})
    `;
};
const fetchLocationsCountQuery = (businessId) => {
  return `
    SELECT COUNT(*)
    FROM business_locations 
    WHERE business_id = ${parseInt(businessId)};
  `;
};
const fetchLocationsQuery = (id, name, address, businessId) => {
  if (id && name && address) {
    return `
      SELECT *
      FROM business_locations
      WHERE business_id = ${businessId} AND id=${id} AND address = "${address}" AND name = "${name}"
    `;
  }
  if ((id, name)) {
    return `
      SELECT *
      FROM business_locations
      WHERE business_id = ${businessId} AND id=${id} AND name = "${name}"
    `;
  }
  if (id) {
    return `
      SELECT *
      FROM business_locations
      WHERE business_id = ${businessId} AND id = ${id}
    `;
  } else {
    return `
      SELECT * 
      FROM business_locations
      WHERE business_id = ${businessId}
    `;
  }
};
const disableLocationQuery = (id, businessId) => {
  return `
    UPDATE business_locations 
    SET is_active=${0}
    WHERE id =  ${id} AND business_id = ${businessId}
  `;
};
const enableLocationQuery = (id, businessId) => {
  return `
    UPDATE business_locations 
    SET is_active=${1}
    WHERE id =  ${id} AND business_id = ${businessId}
  `;
};

const editLocationQuery = (
  id,
  name,
  address,
  city,
  countryId,
  businessId,
  updatedAt
) => {
  return `
    UPDATE business_locations 
    SET name = "${name}", address = "${address}", city = "${city}", country_id = "${countryId}", updated_at = ${updatedAt}
    WHERE business_id = ${businessId} AND id = ${id}
  `;
};
module.exports = {
  addLocationQuery,
  fetchLocationsCountQuery,
  fetchLocationsQuery,
  enableLocationQuery,
  disableLocationQuery,
  editLocationQuery,
};
