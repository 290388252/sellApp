var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', (req, res, next) => {
    req.url = '/index.html';
    next();
});

app.use(router);

//异步接口
var appData = require("./data.json");
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router;

apiRoutes.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  }); // 接口返回json数据，上面配置的数据seller就赋值给data请求后调用
});
apiRoutes.get('/api/goods', (req, res) => {
    res.json({
      errno: 0,
      data: goods
    });
  });
  apiRoutes.get('/api/ratings', (req, res) => {
    res.json({
      errno: 0,
      data: ratings
    });
  });

app.use('/api', apiRoutes);

//定义express静态目录
app.use(express.static('./dist'));

var autoOpenBrowser = !!config.dev.autoOpenBrowser;
var uri = 'http://localhost:' + port;
var opn = require('opn');
//启动express

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return
  }

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});

