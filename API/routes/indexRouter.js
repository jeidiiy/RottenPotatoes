import sequelize from '../models';
const { Comment, Movie } = sequelize;

const indexRouter = require('express').Router();


indexRouter.get('/', (req, res) => {
  res.send('ok');
});

indexRouter.get('/movie/:id', (req, res, next) => {
  const movie = await Movie.findOrCreate({
    where: { movieId: req.params.id },
    include: [{
      model: Comment,
    }],
  });

  return res.json(movie);
});


export default indexRouter;