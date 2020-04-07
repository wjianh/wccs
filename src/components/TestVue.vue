<template>
    <div>
        <button @click="nummber++">+</button>
        <button @click="nummber--">-</button>
      </div>
</template>

<script>
  import vue from 'vue'
  export default {
    name: 'hello',
    data() {
      return {
        message: '我是第一个vue',
        nummber: 0
      }
    },
  }
</script>