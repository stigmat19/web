// index.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const ItemModel = require('./ItemModel');
const app = express();

app.options('*', cors({
  origin: true,
  credentials: true
}));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.json({
  limit: 50000,
  parameterLimit: 200
}));

app.get('/',function(req,res){
  res.status(200).json('ok');
});

// get all the items
app.get('/items', (req,res) =>
  ItemModel.find({}).then(items =>
    res.status(200).json({message: 'ok', items })));

// get single item by id
app.get('/items/:item_id', (req,res) =>
  ItemModel.findOne({ id: req.params.item_id }).then(item =>
    res.status(200).json({message: 'ok', item })));

// create a new item
app.post('/items', (req,res) => {
  const item = new ItemModel();
  item.name = req.body.name;
  item.quantity = req.body.quantity;
  item.price = req.body.price;

  item.save().then(() => {
    res.status(201).json({message: 'ok'});
  }).catch(err => {
    res.status(500).json(err);
  })
});
// update an item with data
app.patch('/items/:item_id', (req,res) =>
  ItemModel.findOne({ id: req.params.item_id })
    .then(item => {
      if (!item) {
        throw new Error('not found!');
      }

      item.count = req.body.count;
      return item.save();
    })
    .then(() =>
      res.status(200).json({message: 'ok'}))
    .catch(err =>
      res.status(500).json(err)));
// not found route
app.get('*', function(req, res) {
  res.status(404).send('not found!');
});

// app.use(cookieParser());
// app.use(reporter());
// app.use('/api/v1', apiRouter);

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/youtube-video`, {
    useMongoClient: true
  })
  .then(() =>
    http
      .createServer(app)
      .listen(8089, err => {
        if (err) {
          return console.log('error', 'error starting HTTP server:', err);
        }

        console.log('info', `HTTPS server started.. Port: 8089, env: ${app.get('env')}`);
      }))
  .catch(err => {
    console.log('error', 'database initializing error:', err);
    process.exit(1);
  });
