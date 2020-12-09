var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  //get all of the genres 
  var query = `
    SELECT DISTINCT genre
    FROM Genres; 
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  //show top ten movies in genre (ordered first by highest rating and then highest vote_count)
  //need title, rating, vote_count 
  var inputGenre = req.params.genre; 

  var query = `
  WITH IDs AS (SELECT movie_id FROM Genres WHERE genre = '${inputGenre}'),
  genreMovies AS (SELECT title, rating, vote_count FROM Movies m JOIN IDs i ON m.id = i.movie_id)
  SELECT * FROM genreMovies ORDER BY rating desc, vote_count desc LIMIT 10; 
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var inputMovie = req.params.movie; 

  var query = `
  WITH IDsTable AS (SELECT id FROM Movies WHERE title = '${inputMovie}'),
  genresTable AS (SELECT genre FROM Genres WHERE Genres.movie_id IN (SELECT * FROM IDsTable)),
  oneShareTable AS (SELECT * FROM Genres WHERE genre IN (SELECT * FROM genresTable)),
  joinedTable AS (SELECT movie_id FROM oneShareTable o JOIN genresTable g ON o.genre = g.genre),
  countTable AS (SELECT movie_id, count(movie_id) num FROM joinedTable GROUP BY movie_id),
  allGenresMovies AS (SELECT * FROM countTable WHERE num IN (SELECT count(*) FROM genresTable)),
  allMovies AS (SELECT title, id, rating, vote_count FROM Movies m 
  JOIN allGenresMovies ON m.id = allGenresMovies.movie_id
  WHERE id NOT IN (SELECT * FROM IDsTable))
  SELECT * FROM allMovies ORDER BY rating desc, vote_count desc LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });


};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var inputDecade = req.params.decade; 

  var query = `
  WITH decadeMoviesTable AS 
(SELECT * FROM Movies JOIN Genres ON Movies.id = Genres.movie_id 
WHERE '${inputDecade}' <= release_year AND release_year < '${inputDecade}' + 10),
distinctGenresTable AS (SELECT DISTINCT genre FROM Genres),
ratingsTable AS (SELECT genre, AVG(rating) avg_rating FROM decadeMoviesTable GROUP BY genre)
SELECT d.genre, IFNULL(r.avg_rating, 0) avg_rating FROM ratingsTable r 
RIGHT JOIN distinctGenresTable d ON r.genre = d.genre
ORDER BY 2 desc, 1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}