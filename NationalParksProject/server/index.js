const bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const mongoose = require('mongoose');
// password is nationalParks450
mongoose.connect('mongodb+srv://dbUser:nationalParks450@natlparksuserauth.smgbv.mongodb.net/<dbname>?retryWrites=true&w=majority');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
	name: 'session',
	keys: ['xofenckspqkmcsoqjnvinfdms'],
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ----- User Authentication ----- */
app.post('/signup', routes.signup);

app.post('/login', routes.login);

app.post('/logout', routes.logout);


/* ---- (Dashboard) ---- */
/* ---- All: states retrieval ---- */
app.get('/states', routes.getAllStateIDs);

/* ---- All: parks retrieval ---- */
app.get('/parks', routes.getAllParks);

/* ---- All: categories retrieval ---- */
app.get('/categories', routes.getAllCategories);

/* ---- All: features retrieval ---- */
app.get('/features', routes.getAllFeatures);

/* ---- All: parks retrieval ---- */
app.get('/activities', routes.getAllActivities);

/* ---- Parks: City, Range Recommendation ---- */
app.get('/parks/:city&:state&:range', routes.getParksInRange);

/* ---- Parks: Category, Status Recommendation ---- */
app.get('/parks/:category&:status', routes.getParksWithCategories);

/* ---- Wildlife: Wildlife Recommendation ---- */
app.get('/wildlife/:wildlife', routes.getParksWithWildlife);

/* ---- Parks: Wildlife Recommendation ---- */
app.get('/wildlife/tree/:wildlife&:park', routes.getWildlifeForTree);

// /* ---- Trails: City, Range Recommendation ---- */
// app.get('/trails/:city&:state&:range', routes.getTrailsInRange);

// /* ---- Trails: Feature, Activity Recommendation ---- */
// app.get('/trails/:feature&:activity', routes.getTrailsWithInfo);

/* ---- Trails: City, Range, Feature, Activity, Difficulty Recommendation ---- */
app.get(
  "/trails/:city&:state&:range&:feature&:activity&:difficulty",
  routes.getTrailsMetrics
);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});