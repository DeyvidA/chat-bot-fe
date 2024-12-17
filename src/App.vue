<script setup lang="ts">
import ChatBot from './components/ChatBot.vue'
</script>

<template>
  <div class="app-container">
    <ChatBot />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: #f7fafc;
  min-height: 100vh;
}

.app-container {
  padding: 1rem;
}

* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>