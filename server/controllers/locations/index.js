const formidable = require("formidable");
const connection = require("../../config/mysql/");
//importing queries
const {
  addLocationQuery,
  fetchLocationsCountQuery,
  fetchLocationsQuery,
  disableLocationQuery,
  enableLocationQuery,
  editLocationQuery,
} = require("../../queries/locations");
const CREATED_AT = Date.now() / 1000;
const addLocation = async (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  const businessId = req.businessId;
  const addLocationPromise = (form, locationUniqueName) => {
    //parsing the form data
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields) => {
        if (err) {
          reject(err);
          return;
        }
        const { name, address, city, countryId } = fields;
        const isActive = 1;
        connection.query(
          addLocationQuery(
            name,
            address,
            city,
            countryId,
            locationUniqueName,
            isActive,
            businessId,
            CREATED_AT,
            null
          ),
          (err, results) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          }
        );
      });
    });
  };
  //generating the unique name
  const uniqueNameGeneratorPromise = () => {
    return new Promise((resolve, reject) => {
      connection.query(fetchLocationsCountQuery(businessId), (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  };
  try {
    const uniqueName = await uniqueNameGeneratorPromise();
    const uniqueNameGenerated = `L${uniqueName[0]["COUNT(*)"] + 1}`;
    const addedLocation = await addLocationPromise(form, uniqueNameGenerated);
    res.status(201).json({
      success: true,
      message: "New location added successfully",
      data: addedLocation,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "failure",
      data: err,
    });
  }
};
const fetchLocations = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  const businessId = req.businessId;
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    const { id, name, address } = req.query;
    connection.query(
      fetchLocationsQuery(Number(id), name, address, businessId),
      (err, results) => {
        if (err) {
          console.log(err);
          res
            .status(401)
            .json({ success: false, message: "failure", data: err });
          return;
        }
        res
          .status(200)
          .json({ success: true, mssage: "success", data: results });
        return;
      }
    );
  });
};
const deleteLocations = () => {};
const editLocation = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    const { name, address, id } = fields;
    const businessId = req.businessId;
    connection.query(
      editLocationQuery(id, name, address, businessId),
      (err, results) => {
        if (err) {
          if (err) {
            res
              .status(401)
              .json({ success: false, message: "failure", data: err });
          }
          return;
        }
        res
          .status(200)
          .json({ success: true, message: "success", data: results });
      }
    );
  });
};

const enableLocation = (req, res, next) => {
  const { id } = req.query;
  const businessId = req.businessId;
  connection.query(enableLocationQuery(id, businessId), (err, results) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Location enabled", data: results });
  });
};

const disableLocation = (req, res, next) => {
  const { id } = req.query;
  const businessId = req.businessId;
  connection.query(disableLocationQuery(id, businessId), (err, results) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Location disabled", data: results });
  });
};
module.exports = {
  addLocation,
  fetchLocations,
  deleteLocations,
  editLocation,
  enableLocation,
  disableLocation,
};
