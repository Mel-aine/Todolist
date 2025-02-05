<template>
  <!-- <div>
    <h1> {{ quiz.title }}</h1>
    <Progress :value="step" :max="quiz.questions.length - 1"/>
    <Question :key="question.question" :question="question" v-if="state=='question'" @answer="addAnswer" />
    <Recap v-if="state==='recap'" :answers="answers" :quiz="quiz"/>
  

  </div> -->
  <div class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-white flex items-center justify-center py-10">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 space-y-8">
        <!-- Quiz Title -->
        <h1 class="text-3xl font-bold text-gray-800 text-center uppercase">{{ quiz.title }}</h1>
        <!-- Progress Component -->
        <Progress :value="step" :max="quiz.questions.length - 1"/>

        <!-- Question Component -->
        <div v-if="state === 'question'" class="py-6">
            <Question
                :key="question.question"
                :question="question"
                @answer="addAnswer"
                class="animate-fade-in"
            />
        </div>

        <!-- Recap Component -->
        <div v-if="state === 'recap'" class="py-6 animate-fade-in">
            <Recap :answers="answers" :quiz="quiz" />
        </div>
    </div>
</div>
</template>

<script setup>
import Progress from './Progress.vue';
import Question from './Question.vue';
import { ref,computed } from 'vue'
import Recap from './Recap.vue';

const props = defineProps({
    quiz:Object
})
const step = ref(0)
const state = ref('question')
const question = computed(()=> props.quiz.questions[step.value])
const answers = ref(props.quiz.questions.map(()=>null))
const addAnswer = (answer)=>{
    answers.value[step.value]=answer
    if(step.value === props.quiz.questions.length -1) {
        state.value = 'recap'
    } else {
        step.value++;
    }
    
}

</script>