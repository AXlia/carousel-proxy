const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
const port = 8080;

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public/')));
//target carousel proxy
app.use('/carousel', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    [`^/carousel`]: '',
},
}));


app.listen(port, (err) => {
  if (err) {
    console.log('error occured in server ', err);
  } else {
    console.log(`Server is now listening at ${port}`);
  }
})