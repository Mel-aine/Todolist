<template>
  
  <div class="p-8 bg-white  rounded-2xl space-y-5 text-center animate-slide-up">
    <!-- <h1 class="text-3xl font-bold text-blue-600"> Récapitulatif </h1> -->
          <p class="text-lg font-medium text-gray-700">
            {{ hasNon ? quiz.success_message : quiz.failure_message }}
          </p>
      <div v-if="show" class="grid justify-items-center ">
        <img src="https://media1.tenor.com/m/hPJf4ObwFQ4AAAAd/johnny-english-johnnyenglish.gif" class="size-40">
        <!-- <iframe src="https://tenor.com/embed/9579824776922273038" width="800" height="300" frameborder="0" allowfullscreen ></iframe> -->
      </div>
      <div v-else class="grid justify-items-center " >
        <img src="https://media1.tenor.com/m/tYqncvJf448AAAAd/smh-baby.gif" class="size-40"/>
        <!-- <iframe src="https://tenor.com/embed/11222832" width="800" height="300" frameborder="0" allowfullscreen>
        </iframe> -->

      </div>
   

    <div class="flex items-center justify-center space-x-4">
      <span class="text-xl font-bold text-gray-600">Score :</span>
      <span class="text-4xl font-extrabold text-purple-500">
        {{ score }}/{{ quiz.questions.length }}
      </span>
    </div>

    <button
      @click="restart"
      class="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300 ease-out focus:ring-4 focus:ring-purple-400"
    >
      🔄 Recommencer le Quiz
    </button>
  </div>
</template>

<script setup>
import { computed,ref ,onMounted } from "vue"


const show = ref(false)

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
onMounted(()=> {
  console.log(score.value)
  console.log(hasNon.value)
  if(hasNon.value){
    show.value = true
  }
})

const restart = () =>{

  window.location.href = '/'
}

</script>
<style scoped>
/* Animation for slide-up effect */
.animate-slide-up {
  animation: slide-up 0.8s ease-in-out;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>