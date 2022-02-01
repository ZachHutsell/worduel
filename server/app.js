const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');


const port = process.env.PORT || 5000;

const server = express()
  .use(express.static(path.join(__dirname, '..', 'build')))
  .listen(port, () => console.log(`Listening on ${port}`));

const io = new Server(server, {
  /* options */
});

function getClues(solution, word) {
  word = word.toLowerCase();
  let elusive = [];
  solution.split('').forEach((letter, i) => {
    if (word[i] !== letter) {
      elusive.push(letter);
    }
  });
  return word.split('').map((letter, i) => {
    let j;
    if (solution[i] === letter) {
      return { clue: 2, letter };
    } else if ((j = elusive.indexOf(letter)) > -1) {
      // "use it up" so we don't clue at it twice
      elusive[j] = '';
      return { clue: 1, letter };
    } else {
      return { clue: 0, letter };
    }
  });
}

io.on('connection', function (socket) {
  let rawdata = fs.readFileSync('assets/wordlist_5.json');
  let json = JSON.parse(rawdata);

  this.word = json.words[Math.floor(Math.random() * json.words.length)];
  console.log(this.word);
  socket.on(
    'guess',
    function (guess) {
      console.log(guess);
      socket.emit('clues', getClues(this.word, guess));
    }.bind(this)
  );
  socket.id = Math.random();
});
