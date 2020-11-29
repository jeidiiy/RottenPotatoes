import sequelize from '../models';
const { Comment, Movie } = sequelize;

const indexRouter = require('express').Router();


indexRouter.get('/', (req, res) => {
  res.send('ok');
});

indexRouter.get('/movie/:id', async (req, res) => {
  await Movie.findOrCreate({
    where: { movieid: req.params.id },
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