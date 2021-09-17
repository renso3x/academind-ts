import express from 'express';
import bodyParser from 'body-parser';

import todoRoutes from './router/todos';

const app = express();

app.use(bodyParser());

app.use(todoRoutes)

app.listen(5000, () => {
  console.log("Listening in PORT 5000")
})

