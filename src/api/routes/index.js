const actorRoute = require('./actor.route');
const directorRoute = require('./director.route');
const movieRoute = require('./movie.route');

module.exports = [].concat(actorRoute, directorRoute, movieRoute);
