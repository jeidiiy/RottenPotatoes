import sequelize from '../models';
const { Comment, Movie } = sequelize;

const indexRouter = require('express').Router();


indexRouter.get('/', (req, res) => {
  res.send('ok');
});

indexRouter.get('/movie/:id', async (req, res) => {
  await Movie.findOrCreate({
    where: { movieId: req.params.id },
  });

  return res.status(200).send('ok');
});


export default indexRouter;