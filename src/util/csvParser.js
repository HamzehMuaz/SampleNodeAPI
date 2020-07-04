const csvtojson = require('csvtojson');
const fs = require('fs');

const { Actor, Director, Movie } = require('../api/models');

const mongoose = require('../config/mongoose');

mongoose.connect();

const readMoviesMetaDataAndCreateModels = async () => {
  let csvString;
  let csvJson;

  const getActorsArray = (row) => {
    let i = 1;
    const actorArr = [];
    do {
      const name = row[`actor_${i}_name`];
      const facebookLikes = row[`actor_${i}_facebook_likes`];
      if (name || facebookLikes) {
        const actor = {
          name,
          facebook_likes: facebookLikes,
        };
        actorArr.push(actor);
      }
      i += 1;
    } while (row[`actor_${i}_name`] != null || row[`actor_${i}_name`] != null);
    return actorArr;
  };

  try {
    csvString = await fs.readFileSync(`${__dirname}/csv/movieMetadata.csv`, 'utf8');
    csvJson = await csvtojson().fromString(csvString);
  } catch (error) {
    console.error(`There was a problem with loading the csv file: ${error}`);
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const row of csvJson) {
    const actorArray = getActorsArray(row);
    const actorPromises = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const actorBody of actorArray) {
      const actorPromise = Actor.findOneAndUpdate({
        name: actorBody.name,
      }, {
        facebook_likes: actorBody.facebook_likes,
      }, {
        upsert: true,
        new: true,
      }).exec();
      actorPromises.push(actorPromise);
    }
    // eslint-disable-next-line no-await-in-loop
    Promise.all(actorPromises).then((actorModels) => {
      const actorIds = actorModels.reduce((accumulator, currentValue) => {
        if (currentValue) {
          accumulator.push(currentValue.id);
        }
        return accumulator;
      }, []);
      Director.findOneAndUpdate({
        name: row.director_name,
      }, {
        facebook_likes: row.director_facebook_likes,
      }, {
        upsert: true,
        new: true,
      }).then((doc) => {
        const movie = {
          duration: row.duration,
          gross: row.gross,
          genres: row.genres && row.genres.length ? row.genres.split('|') : row.genres,
          num_voted_users: row.num_voted_users,
          cast_total_facebook_likes: row.cast_total_facebook_likes,
          plot_keywords: row.plot_keywords && row.plot_keywords.length ? row.plot_keywords.split('|') : row.plot_keywords,
          imdb_link: row.movie_imdb_link,
          num_user_for_reviews: row.num_user_for_reviews,
          language: row.language,
          country: row.country,
          content_rating: row.content_rating,
          budget: row.budget,
          title_year: row.title_year,
          imdb_score: row.imdb_score,
          aspect_ratio: row.aspect_ratio,
          movie_facebook_likes: row.movie_facebook_likes,
          actors: actorIds,
          director: doc.id,
          color: row.color,
        };
        Movie.findOneAndUpdate({
          title: row.movie_title,
        }, movie, {
          upsert: true,
          new: true,
        }).exec();
      });
    }).catch((error) => {
      console.error(error);
    });
  }
  return true;
};

readMoviesMetaDataAndCreateModels();
