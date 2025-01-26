<template>
  <h1>recap</h1>

  <p>
    {{ hasNon ? quiz.success_message : quiz.failure_message }}
  </p>
  <p>
    score : {{ score }}/{{ quiz.questions.length }}
  </p>
</template>

<script setup>
import { computed } from "vue"


const props = defineProps({
    answers: Array,
    quiz : Object
})

const score = computed(()=>{
    return props.quiz.questions.reduce((acc,question,k)=>{
        if(question.correct_answer === props.answers[k]){
            return acc + 1 
        }
        return acc
    },0)

})
const hasNon = computed(()=> score.value >= props.quiz.minimum_score)

</script>