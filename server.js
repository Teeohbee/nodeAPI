var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', function(){
  console.log('Connection ok!');
});

var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening');
  next();
});

router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

router.route('/bears')

.post(function(req, res) {
  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: "Bear created!"
    });
  });

});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
