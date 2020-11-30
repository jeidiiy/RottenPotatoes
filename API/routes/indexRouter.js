import sequelize from '../models';
const { Comment, Movie } = sequelize;

const indexRouter = require('express').Router();


indexRouter.get('/', (req, res) => {
  res.send('ok');
});

<<<<<<< HEAD
indexRouter.get('/movie/:id', async (req, res, next) => {
  const movie = await Movie.findOrCreate({
    where: { movieId: req.params.id },
    include: [{
      model: Comment,
    }],
=======
indexRouter.get('/movie/:id', async (req, res) => {
  await Movie.findOrCreate({
    where: { movieid: req.params.id },
>>>>>>> f359c8a84924ee88d4e1d08bc54bdf3d8b09a7c5
  });

  return res.status(200).send('ok');
});

indexRouter.get('/comments/:id', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { MovieMovieId: req.params.id }
    });

    console.log(comments);
    return res.status(203).json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  };
}); 


export default indexRouter;