const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
/* ---- All: states retrieval ---- */
app.get('/states', routes.getAllStateIDs);

/* ---- All: parks retrieval ---- */
app.get('/parks', routes.getAllParks);

/* ---- Parks: City, Range Recommendation ---- */
app.get('/parks/:city&:state&:range', routes.getParksInRange);

/* ---- Parks: Category, Status Recommendation ---- */
app.get('/parks/:category&:status', routes.getParksWithWildlife);

/* ---- Trails: City, Range Recommendation ---- */
app.get('/trails/:city&:state&:range', routes.getTrailsInRange);

/* ---- Trails: Feature, Activity Recommendation ---- */
app.get('/trails/:feature&:activity', routes.getTrailsWithInfo);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});