<template>
  <div class="guess">
    <div
      v-for="(letter, index) in guessedWord"
      class="letter"
      :class="{ perfect: isPerfect(letter, index) }"
      :key="letter"
    >
      {{ letter }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PreviousGuess",
  props: {
    solutionWord: String,
    guessedWord: String,
  },
  methods: {
    //TODO need method for imperfect matches
    isPerfect(letter, index) {
      return this.solutionWord[index] === letter;
    },
  },
};
</script>

<style>
.guess {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* TODO Need to fix styling around letters */
.letter {
  display: flex;
  gap: 45px;
  justify-content: center;
}
.perfect {
  background-color: #42b983;
}
</style>
