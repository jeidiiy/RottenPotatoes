const indexRouter = require('express').Router();

indexRouter.get('/', (req, res) => {
  res.send('ok');
});


export default indexRouter;