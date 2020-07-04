const { Movie } = require('../models');

const esClient = require('../../config/elasticsearch')();

exports.getMovieById = async (request, h) => {
  try {
    const movie = await Movie.findById(request.params.id);
    return h.response(movie).code(200);
  } catch (error) {
    return error;
  }
};

exports.getMovies = async (request, h) => {
  try {
    const movies = await Movie.find();
    return h.response(movies).code(200);
  } catch (error) {
    return error;
  }
};

exports.createMovie = async (request, h) => {
  try {
    const movie = await Movie.create(request.payload);
    return h.response(movie.id).code(200);
  } catch (error) {
    return error;
  }
};

exports.updateMovie = async (request, h) => {
  try {
    const response = await Movie.findByIdAndUpdate(
      request.params.id,
      request.payload,
    );
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};

exports.deleteMovieById = async (request, h) => {
  try {
    const response = await Movie.remove({ id: request.params.id });
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};

exports.searchMovies = async (request, h) => {
  const body = request.payload;
  if (!body) {
    return h.response('Please enter at least one field (title: string, genres: string OR [string], keywords: string OR [string]) in a JSON').code(400);
  }
  const query = {
    bool: {
      should: [],
      minimum_should_match: 1,
    },
  };
  if (body.title) {
    query.bool.should.push({
      match: {
        title: {
          query: body.title,
        },
      },
    });
  }
  if (body.genres && body.genres.length) {
    query.bool.should.push({
      match: {
        genres: {
          query: body.genres.join(' '),
        },
      },
    });
  }
  if (body.keywords && body.keywords.length) {
    query.bool.should.push({
      match: {
        plot_keywords: {
          query: body.keywords.join(' '),
        },
      },
    });
  }
  if (query.bool.should.length < 1) {
    return h.response('Please enter at least one field (title: string, genres: string OR [string], keywords: string OR [string]) in a JSON').code(400);
  }
  try {
    const searchHits = await Movie.esSearch({
      from: 0,
      size: 10,
      query,
    });
    return h.response(searchHits.hits.hits).code(200);
  } catch (error) {
    return error;
  }
};

exports.countMovies = async (request, h) => {
  const body = request.payload;
  if (!body || body.language == null || body.country == null || body.imdbScore == null) {
    return h.response('Please enter all fields (language: string, country: string, imdbScore: { gte: Number, lte: Number }) in a JSON').code(400);
  }
  let languageTerms;
  let countryTerms;
  if (typeof body.language === 'object' && body.language.length) {
    languageTerms = body.language.map((element) => element.toLowerCase());
  } else {
    languageTerms = [body.language.toLowerCase()];
  }
  if (typeof body.country === 'object' && body.country.length) {
    countryTerms = body.country.map((element) => element.toLowerCase());
  } else {
    countryTerms = [body.country.toLowerCase()];
  }
  const query = {
    bool: {
      should: [{
        range: {
          imdb_score: {
            gte: body.imdbScore.gte,
            lte: body.imdbScore.lte,
          },
        },
      }],
      filter: [
        {
          terms: {
            language: languageTerms,
          },
        },
        {
          terms: {
            country: countryTerms,
          },
        },
      ],
      minimum_should_match: 1,
    },
  };
  try {
    const searchHits = await esClient.count({
      index: 'movies',
      body: {
        query,
      },
    });
    return h.response(searchHits.count).code(200);
  } catch (error) {
    return error;
  }
};

exports.getAllMoviesAndFilter = async (request, h) => {
  const body = request.payload;
  if (!body || body.genres == null || body.genres.length < 1
    || body.keywords.length < 1 || body.keywords == null) {
    return h.response('Please enter all fields (genres: [string], keywords: [string]) in a JSON').code(400);
  }
  let genresTerms;
  let keywordsTerms;
  if (typeof body.genres === 'object' && body.genres.length) {
    genresTerms = body.genres.map((element) => element.toLowerCase());
  } else {
    genresTerms = [body.genres.toLowerCase()];
  }
  if (typeof body.keywords === 'object' && body.keywords.length) {
    keywordsTerms = body.keywords.map((element) => element.toLowerCase());
  } else {
    keywordsTerms = [body.keywords.toLowerCase()];
  }
  const query = {
    bool: {
      filter: [
        {
          terms: {
            genres: genresTerms,
          },
        },
        {
          terms: {
            plot_keywords: keywordsTerms,
          },
        },
      ],
    },
  };
  try {
    const searchHits = await Movie.esSearch({
      from: 0,
      size: 10,
      query,
    });
    return h.response(searchHits.hits.hits).code(200);
  } catch (error) {
    return error;
  }
};
