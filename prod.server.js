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
var apiRoutes = express.Router();

apiRoutes.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  }); // 接口返回json数据，上面配置的数据seller就赋值给data请求后调用
});
apiRoutes.get('/goods', (req, res) => {
    res.json({
      errno: 0,
      data: goods
    });
  });
  apiRoutes.get('/ratings', (req, res) => {
    res.json({
      errno: 0,
      data: ratings
    });
  });

app.use('/api', apiRoutes);

//定义express静态目录
app.use(express.static('./dist'));

//启动express
// var port = 9000;

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port +'\n');
});

