<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <div class="container">
      <div class="col">
        <input
          type="text"
          v-model="currentGuess"
          v-on:keyup.enter="submitGuess"
        />
      </div>
    </div>
    <div class="container" v-for="guess in previousGuesses" :key="guess.word">
      <!-- TODO should probably make following a component -->
      <div
        v-for="(letter, index) in guess.word"
        class="item"
        :class="guess.colorMap.get(index)"
        :key="letter"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      solution: "SURGE",
      currentGuess: "",
      previousGuesses: [],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    submitGuess() {
      this.currentGuess = this.currentGuess.toUpperCase();
      this.guessMap = new Map();
      const remainingGuess = new Array();
      const remainingSolution = new Array();
      for (let i = 0; i < this.currentGuess.length; i++) {
        const guessedChar = this.currentGuess.charAt(i);
        const correctChar = this.solution.charAt(i);
        if (guessedChar == correctChar) {
          this.guessMap.set(i, "green");
          remainingGuess.push("");
        } else {
          remainingGuess.push(guessedChar);
          remainingSolution.push(correctChar);
        }
      }
      for (let i = 0; i < remainingGuess.length; i++) {
        const guessedChar = remainingGuess[i];
        const correctIndex = remainingSolution.indexOf(guessedChar);
        if (correctIndex != -1) {
          this.guessMap.set(i, "yellow");
          remainingSolution.splice(correctIndex, 1);
        } else if (guessedChar) {
          this.guessMap.set(i, "gray");
        }
      }
      this.previousGuesses.unshift({
        word: this.currentGuess,
        colorMap: this.guessMap,
      }); //TODO
      this.currentGuess = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
}
.item {
  display: flex;
  justify-content: center;
  width: 22px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
}
.yellow {
  background-color: goldenrod;
}
.green {
  background-color: limegreen;
}
.gray {
  background-color: lightslategray;
}
</style>
