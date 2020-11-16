import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import path from 'path';
import sequelize from './models';
require('dotenv').config();

import indexRouter from './routes/indexRouter';

const app = express();
sequelize.sequelize.sync()
  .then(() => console.log('디비 연결 성공'))
  .catch((err) => console.error('디비 연결 실패'));

app.set('port', process.env.PORT || 8001);
app.set('host', process.env.HOST || '127.0.0.1');

app.use(logger('dev'));
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(app.get('port'), () => {
  console.log(`http:${app.get('host')} 에서 서버 실행 중..`);
});