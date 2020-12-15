var config = require('./db-config.js');
var oracledb = require('oracledb');

config.connectionLimit = 10;

/* ----- Connects to your Oracle database ----- */
try {
  oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_9" });
} catch (err) {
  console.error("Whoops!");
  console.error(err);
  process.exit(1);
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
var connection;
async function run() {

  try {
    pool = await oracledb.createPool(config);

    connection = await pool.getConnection();

  } catch (err) {
    console.log(err);
  }
}
run();


/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

// HANDY CONSTANTS FOR CALCULATIONS
// const R = 6371e3; // earth's mean radius in meters
const R = 3959; // earth's mean radius in miles
const pi = Math.PI;

// FUNCTION: retrieve all state ids that exist in the table
function getAllStateIDs(req, res) {
  //get all of the genres
  var query = `
    SELECT DISTINCT state_id
    FROM Cities
    ORDER BY state_id
  `;
  connection.execute(query, function (err, rows, fields) {
    if (err) console.log("Query error: ", err);
    else {
      console.log(rows.rows);
      res.json(rows.rows);
    }
  });
}

// FUNCTION: retrieve all state ids that exist in the table
function getAllParks(req, res) {
  //get all of the genres
  var query = `
    SELECT *
    FROM Parks
  `;
  connection.execute(query, function (err, rows, fields) {
    if (err) console.log("Query error: ", err);
    else {
      console.log(rows.rows);
      res.json(rows.rows);
    }
  });
}

//FUNCTION: retrieve parks given a range and a city as center

function getParksInRange(req, res) {
  var inputCity = req.params.city;
  var inputState = req.params.state;
  var inputRange = req.params.range;
  var query = `
  WITH Location AS (
    SELECT lng, lat 
    FROM Cities WHERE '${inputCity}' = city AND '${inputState}' = state_id
  ), BoundedParks AS (
    SELECT p.park_code, p.park_name, p.state, p.acres, p.lat, p.lng
    FROM Parks p, Location l
    WHERE (p.lat BETWEEN l.lat - ${inputRange}/${R}*180/${pi} AND l.lat + ${inputRange}/${R}*180/${pi})
    AND (p.lng BETWEEN l.lng - ${inputRange}/${R}*180/${pi}/COS(l.lat*${pi}/180) AND l.lat + ${inputRange}/${R}*180/${pi}/COS(l.lat*${pi}/180))
  )
  SELECT p.park_code, p.park_name, p.state, p.acres, p.lat, p.lng
  FROM BoundedParks p, Location l
  WHERE ACOS(
      SIN((p.lat * ${pi}) / 180) * 
      SIN((l.lat * ${pi}) / 180) +
      COS((p.lat * ${pi}) / 180) *
      COS((l.lat * ${pi}) / 180) *
      COS((p.lng * ${pi}) / 180 - (l.lng * ${pi}) / 180)
    ) * ${R} < ${inputRange}
  `;

  connection.execute(query, function (err, rows, fields) {
    if (err) console.log("Query error: ", err);
    else {
      console.log(rows.rows);
      res.json(rows.rows);
    }
  });

}

// FUNCTION: retrieve parks given a wildlife category and conservation status
function getParksWithWildlife(req, res) {
  var inputCategory = req.params.category;
  var inputStatus = req.params.status;
  var query = `
  WITH Counts AS (
  SELECT park_name, COUNT(*) AS num_species 
  FROM Species 
  WHERE (category = '${inputCategory}' 
  AND conservation_status = '${inputStatus}')
  GROUP BY park_name 
  ORDER BY num_species DESC
  )

  SELECT p.park_code, p.park_name, p.state, p.acres, p.lat, p.lng, c.num_species
  FROM Parks p
  JOIN Counts c
  ON p.park_name = c.park_name
  ORDER BY c.num_species DESC
  `;

  connection.execute(query, function (err, rows, fields) {
    if (err) console.log("Query error: ", err);
    else {
      console.log(rows.rows);
      res.json(rows.rows);
    }
  });
}

function getTrailsInRange(req, res) {
  var inputCity = req.params.city;
  var inputState = req.params.state;
  var inputRange = req.params.range;
  var query = `
  WITH Location AS (
    SELECT lng, lat 
    FROM Cities WHERE '${inputCity}' = city AND '${inputState}' = state_id
  ), BoundedParks AS (
    SELECT p.park_code, p.park_name, p.state, p.acres, p.lat, p.lng
    FROM Parks p, Location l
    WHERE (p.lat BETWEEN l.lat - ${inputRange}/${R}*180/${pi} AND l.lat + ${inputRange}/${R}*180/${pi})
    AND (p.lng BETWEEN l.lng - ${inputRange}/${R}*180/${pi}/COS(l.lat*${pi}/180) AND l.lat + ${inputRange}/${R}*180/${pi}/COS(l.lat*${pi}/180))
  ), SelectedParks AS (
    SELECT p.park_name
    FROM BoundedParks p, Location l
    WHERE ACOS(
      SIN((p.lat * ${pi}) / 180) * 
      SIN((l.lat * ${pi}) / 180) +
      COS((p.lat * ${pi}) / 180) *
      COS((l.lat * ${pi}) / 180) *
      COS((p.lng * ${pi}) / 180 - (l.lng * ${pi}) / 180)
    ) * ${R} < ${inputRange}
  )

  SELECT t.name, t.park_name, t.popularity 
  FROM Trails t JOIN SelectedParks p 
  ON t.park_name = p.park_name
  ORDER BY t.park_name, t.popularity DESC
  `;

  connection.execute(query, function (err, rows, fields) {
    if (err) console.log("Query error: ", err);
    else {
      console.log(rows.rows);
      res.json(rows.rows);
    }
  });
}

function getTrailsWithInfo(req, res) {
  
  var inputFeature = req.params.feature;
  var inputActivity = req.params.activity;
  console.log(inputFeature);
  console.log(inputActivity);  
  var query = `
  WITH FeatureTrails AS (
    SELECT tf.trail_id, name, park_name 
    FROM trail_features tf JOIN Trails t 
    ON tf.trail_id = t.trail_id 
    WHERE feature = '${inputFeature}'
  )
  SELECT ta.trail_id, ft.name, ft.park_name 
  from trails_activities ta JOIN FeatureTrails ft 
  ON ta.trail_id = ft.trail_id 
  WHERE activity = '${inputActivity}'
  ORDER BY ft.park_name
  `;

  connection.execute(query, function (err, rows, fields) {
    if (err) console.log("Query error: ", err);
    else {
      console.log(rows.rows);
      res.json(rows.rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllStateIDs: getAllStateIDs,
  getAllParks: getAllParks,
  getParksInRange: getParksInRange,
  getParksWithWildlife: getParksWithWildlife,
  getTrailsInRange: getTrailsInRange,
  getTrailsWithInfo: getTrailsWithInfo
};
