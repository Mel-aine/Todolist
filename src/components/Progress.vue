<template>
  <div>
    <div class="py-2 text-meduim font-light text-gray-500 ">Etape {{ value + 1 }}/{{ max + 1 }}</div>
    <!-- <progress :value="value" :max="max"/> -->
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div  class="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" :style="{ width: `${((value + 1) / (max + 1)) * 100}%` }"></div>
    </div>

    
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  value:Number,
  max:Number,
})


</script>

<style scoped>


</style>