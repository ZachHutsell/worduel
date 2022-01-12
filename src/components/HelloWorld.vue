<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <div class="container">
      <div class="col"><input type="text" v-model="currentGuess" v-on:keyup.enter="submitGuess"></div>
    </div>
    <div class="container" v-for="guess in previousGuesses" :key="guess.word">
      <!-- TODO should probably make following a component -->
      <div v-for="letter in guess.word" class="item" :class="{perfect: isPerfect(letter)}" :key="letter">{{letter}}</div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      solution: 'SURGE',
      currentGuess: '',
      previousGuesses: [{
        word: 'MERGE',
        correctLetters: 'RGE',
      }]
    }
  },
  props: {
    msg: String
  },
  methods: {
    submitGuess() {
      this.currentGuess = this.currentGuess.toUpperCase();
      this.previousGuesses.unshift({word: this.currentGuess, correctLetters: ''});//TODO
      this.currentGuess = '';
    },
    isPerfect(letter) {
      return this.solution.includes(letter);
    }
  }
}
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
  align-items:center;
}
.item {
  display: flex;
  gap: 15px;
  justify-content: center;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
}
.perfect {
  background-color: goldenrod;
}
</style>
