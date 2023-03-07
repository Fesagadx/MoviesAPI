const Genre = require('./Genre');
const Director = require('./Director');
const Movie = require('./Movie');
const Actor = require('./Actor')


Movie.belongsToMany(Actor,{through:"movieActor"});
Actor.belongsToMany(Movie,{through:"movieActor"});

Movie.belongsToMany(Genre,{through:"movieGenre"});
Genre.belongsToMany(Movie,{through:"movieGenre"});

Movie.belongsToMany(Director,{through:"movieDirector"});
Director.belongsToMany(Movie,{through:"movieDirector"});