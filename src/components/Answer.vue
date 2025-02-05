<template>
 <div>
    <label :for="id" :class="classes" >
          <input :disabled="disabled" :id="id" type="radio" name="answer" :value="value" v-model="model" >
          {{ value }}
        </label>
 </div> 
 
</template>

<script setup>
import {computed } from 'vue'
const props= defineProps({
    id: String,
    disabled: Boolean,
    value: String,
    correctAnswer: String
})
const emits = defineEmits(['change'])
const model= defineModel()
const classes = computed(()=> ({
    disabled: props.disabled ,
    right: props.disabled && props.value === props.correctAnswer,
    wrong : props.disabled && props.value !== props.correctAnswer && model.value === props.value
}))

</script>
<style scoped>
.right{
    color: green
}
.wrong{
    color : red
}

</style>