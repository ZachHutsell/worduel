<template>
  <div class="hello">
    <div class="container">
      <input
        type="text"
        v-model="currentGuess"
        v-on:keyup.enter="submitGuess"
      />
    </div>
    <previous-guess
      v-for="previousGuess in previousGuesses"
      :key="previousGuess"
      :guessed-word="previousGuess"
      :solution-word="solution"
    ></previous-guess>
  </div>
</template>

<script>
import PreviousGuess from "./PreviousGuess.vue";
export default {
  name: "HelloWorld",
  components: { PreviousGuess },
  data() {
    return {
      currentGuess: "",
      previousGuesses: ["MERGE"],
    };
  },
  props: {
    msg: String,
    solution: String,
  },
  methods: {
    submitGuess() {
      this.currentGuess = this.currentGuess.toUpperCase();
      this.previousGuesses.unshift(this.currentGuess);
      this.currentGuess = "";
    },
    isPerfect(letter) {
      return this.solution.includes(letter);
    },
  },
};
</script>

<style scoped>
/* Below kept for reference to neato color */
/* a {
  color: #42b983;
} */
.container {
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
}
</style>
