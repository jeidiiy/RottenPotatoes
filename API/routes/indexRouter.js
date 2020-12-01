import sequelize from '../models';
import faker from 'faker';
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


indexRouter.post('/comments/:id', async (req, res, next) => {
  try {
    console.log(req.body);
    const content = req.body.comment;
  
    const comment = await Comment.create({
      userid: faker.name.firstName(),
      content,
    });
  
    const movie = await Movie.findOne({
      where: { movieid: req.params.id }
    });
  
    await movie.addComments(comment);
    
    res.status(200).send('comment stored!');
  } catch (err) {
    console.log('indexRouter.js post /comments/:id error');
    console.error(err);
    next(err);
  };
});

indexRouter.get('/comments/:id', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { MovieMovieId: req.params.id },
      order: [
        ['id', 'ASC']
      ]
    });

    return res.status(203).json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  };
}); 

export default indexRouter;