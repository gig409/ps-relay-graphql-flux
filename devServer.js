import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';

let app = express();
let compiler = webpack(config);

app.use(express.static('public'));
app.get('/', (req, res) => res.send('I\'m Alive!!'));

// Only load this middleware in dev mode (!important)
if (app.get('env') === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(3000, () => console.log('listening on port 3000'));