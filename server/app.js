const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

let games = {};

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  if (games[gameId]) {
    let rawdata = fs.readFileSync('assets/wordlist_5.json');
    let json = JSON.parse(rawdata);

    const word = json.words[Math.floor(Math.random() * json.words.length)];

    res.json(word);
    console.log(word);
  } else {
    res.redirect('/');
  }
});

// Put all API endpoints under '/api'
app.get('/api/getWord', (req, res) => {
  let rawdata = fs.readFileSync('assets/wordlist_5.json');
  let json = JSON.parse(rawdata);

  const word = json.words[Math.floor(Math.random() * json.words.length)];

  res.json(word);
  console.log(word);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

io.on('connection', function (socket) {
  let rawdata = fs.readFileSync('assets/wordlist_5.json');
  let json = JSON.parse(rawdata);

  this.word = json.words[Math.floor(Math.random() * json.words.length)];
  console.log(this.word);
  socket.on(
    'guess',
    function (guess) {
      console.log(guess);
      if (guess == this.word.toUpperCase()) {
        console.log('WINNER');
        socket.emit('win');
      }
    }.bind(this)
  );
  socket.id = Math.random();
});

httpServer.listen(port);
console.log(`Listening on ${port}`);
