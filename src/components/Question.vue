<template>
  <div>
    <h1>{{ question.question }}</h1>
    <ul>
      <li v-for="(choice,index) in randomChoices" :key="choice">
        <Answer :for="`answer${index}`" :id="`answer${index}`" :disabled="hasAnswer" :value="choice" v-model="answer" :correctAnswer="question.correct_answer" @change="onAnswer" />
      </li>
    </ul>
    
    <!-- <button :disabled="!hasAnswer" @click="emits('answer', answer)">Question Suivante</button> -->
  </div>
</template>

<script setup>
import { computed , onMounted, onUnmounted, ref ,watch} from 'vue';
import { shuffleArray } from './function/array';
import Answer from './Answer.vue';
const props = defineProps({
  question: Object,
})
const emits = defineEmits(['answer'])
const answer = ref(null)
const hasAnswer = computed(()=> answer.value !==  null)
// watch(()=>props.question,()=>{
//   answer.value = null
// })

const randomChoices = computed(()=> shuffleArray(props.question.choices))

let timer
onMounted(()=>{
  timer=setTimeout(()=>{
    answer.value = ''
    onAnswer()
  },3000)
})

onUnmounted(()=>{
  clearTimeout(timer)})

  const onAnswer = ()=>{
    //answer.value = e.currentTarget.value
    clearTimeout(timer)
    timer=setTimeout(()=>{
      emits('answer', answer.value)},3000)

  }
</script>

<style scoped>
</style>