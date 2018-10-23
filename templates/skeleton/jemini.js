import app from 'jemini';
import assets from 'serve-static';

app.use(assets(`${__dirname}/public`));

app.get('/', (req, res) => res.send('hello world'));
