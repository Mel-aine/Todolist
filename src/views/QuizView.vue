<template>
 <div v-if="state === 'error'">
      <p> Impossible de Charger le quizz </p>
    </div>
    <div :aria-busy="state === 'loading'">
      <Quizz :quiz ='quiz' v-if="quiz"  />
    </div>
  
</template>

<script setup>
import {onMounted,ref} from "vue"
import Quizz from "../components/Quizz.vue";


const quiz = ref(null)
const state = ref('loading')
onMounted(()=>{
  fetch('/quizz.json')
  .then(r=>{
      if (r.ok) {
        return r.json();
      }
      throw new Error('Impossible de recuperer le json')
  })
  .then(data => {
    quiz.value = data
    state.value = 'idle'
  })
  .catch(err => {
    state.value = 'error'
  })
})
</script>