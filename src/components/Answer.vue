<template>
 <div>
    <label :for="id" :class="classes">
          <input :disabled="disabled" :id="id" type="radio" name="answer" :value="value" v-model="model" @change="onChange" >
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
const onChange = (event)=>{
    emits('change',event)
}
const model= defineModel()
const classes = computed(()=> ({
    disabled: props.disabled ,
    right: props.disabled && props.value === props.correctAnswer,
    wrong : props.disabled && props.value !== props.correctAnswer && model.value === props.value
}))

</script>
<style scoped>
.right{
    opacity: 1;
    color: green
}
.wrong{
    opacity: 1;
    color : red
}
.disabled{
    opacity: 0.5;
}
</style>