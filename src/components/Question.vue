<template>
  <!-- <div>
    <h1>{{ question.question }}</h1>
    <ul>
      <li v-for="(choice,index) in randomChoices" :key="choice">
        <Answer :for="`answer${index}`" :id="`answer${index}`" :disabled="hasAnswer" :value="choice" v-model="answer" :correctAnswer="question.correct_answer" @change="onAnswer" />
      </li>
    </ul>
    
    <button :disabled="!hasAnswer" @click="emits('answer', answer)">Question Suivante</button>
  </div> -->
  <div class="p-6  shadow-lg rounded-xl space-y-6 animate-fade-in"  :style="{ backgroundColor: Color }" >
    <h1 class="text-2xl font-bold text-gray-800">{{ question.question }}</h1>
    <ul class="space-y-4">
        <li v-for="(choice, index) in randomChoices" :key="choice">
            <Answer
                :for="`answer${index}`"
                :id="`answer${index}`"
                :disabled="hasAnswer"
                :value="choice"
                v-model="answer"
                :correctAnswer="question.correct_answer"
                class="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </li>
    </ul>

    <button
        :disabled="!hasAnswer"
        @click="submitAnswer"
        class="w-full bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-10 disabled:cursor-not-allowed"
    >
        Question Suivante
    </button>
    <div v-if="!show">
    <button
        @click="submitAnswerAndSendEmail"
        class="w-full bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-10 disabled:cursor-not-allowed"
    >
        envoyer
    </button>
  </div>

</div>

</template>

<script setup>
import { computed , onMounted, onUnmounted, ref ,watch,provide} from 'vue';
import { shuffleArray } from './function/array';
import Answer from './Answer.vue';
import emailjs from "emailjs-com";
import { useAnswerStore } from '../stores/reponse.js';
const props = defineProps({
  question: Object,
})
const emits = defineEmits(['answer'])
const questionColors = ["#ffd3b6", "#ececec", "#e7eaf6", "#e0ffcd", "#eaf6f6", "#f0ece2", "#feffdf", "#f5f9ee", "#fcf4d9", "#f4eeff", "#f0fbff", "#fffafa", "#d4f8e8" ]
const answer = ref(null) 
const userAnswers = ref([]);

const hasAnswer = computed(()=> answer.value !==  null)


const answerStore = useAnswerStore();


// watch(()=>props.question,()=>{
//   answer.value = null
// })
 const Color = computed(()=>{
return questionColors[Math.floor(Math.random() * questionColors.length)]
 }) 
 onMounted(()=>{
  console.log("show.value",show.value)
  console.log(Color.value)
 })
 
const randomChoices = computed(()=> shuffleArray(props.question.choices))

const submitAnswer = () => {
  if (answer.value !== null) {
    const newAnswer = {
      question: props.question.question,
      userAnswer: answer.value,
      correctAnswer: props.question.correct_answer,
    };
    answerStore.addAnswer(newAnswer);
    console.log("User answers", answerStore.allAnswers);
    emits('answer', answer.value);
    answer.value = null;
  }
};
const show = ref(false)

const showSend = computed(()=> {
  return answerStore.allAnswers.length < props.question.choices.length
})
 
  
watch(()=>{
  show.value = answerStore.allAnswers.length <= props.question.question.length
})
const sendEmail = async () => {
  console.log("Email", answerStore.allAnswers);
  
  const recap = answerStore.allAnswers.map((res, index) => 
    `Q${index + 1}: ${res.question}\nRéponse donnée: ${res.userAnswer}\nBonne réponse: ${res.correctAnswer}`
  ).join("\n\n");

  emailjs.send("service_lw2belq", "template_g9n9puj", {
  to_email: "melaineevans7@gmail.com",
  from_name: "melaineQuiz",
  message: recap,
  }, "fXnwxhA6NNTmRR-tP").then(
  (response) => console.log("Email envoyé avec succès!", response),
  (error) => console.error("Erreur lors de l'envoi:", error)
  );


  console.log("Récapitulatif des réponses:\n", recap);
};



// let timer
// onMounted(()=>{
//   timer=setTimeout(()=>{
//     answer.value = ''
//     onAnswer()
//   },3000)
// })

// onUnmounted(()=>{
//   clearTimeout(timer)})

//   const onAnswer = ()=>{
//     //answer.value = e.currentTarget.value
//     clearTimeout(timer)
//     timer=setTimeout(()=>{
//       emits('answer', answer.value)},3000)

//   }



</script>

<style scoped>
.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>