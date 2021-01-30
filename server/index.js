const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');


const app = express();
const port = 3004;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/:id', express.static(path.join(__dirname, '../public')));


app.use('/api/new', createProxyMiddleware({
  target: 'http://54.183.174.156:3001',
  changeOrigin: true,
}));
app.use('/api/homes', createProxyMiddleware({
  target: 'http://54.183.174.156:3001',
  changeOrigin: true,
}));
app.use('/api/similar/:id', createProxyMiddleware({
  target: 'http://54.183.174.156:3001',
  changeOrigin: true,
}));
app.use('/api/photos/:propertyId', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
}));
app.use('/api/properties/:propertyId', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
}));
app.use('/api/all_rates', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
}));
app.use('/api/home_price/:id', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
}));


app.listen(port, (err) => {
  if (err) {
    console.log('error occured in server ', err);
  } else {
    console.log(`Server is now listening at ${port}`);
  }
});
