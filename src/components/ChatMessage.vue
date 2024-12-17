<script setup lang="ts">
import { Message } from '../types/chat';

defineProps<{
  message: Message;
}>();
</script>

<template>
  <div :class="['message-wrapper', message.role]">
    <div class="avatar">
      {{ message.role === 'user' ? '👤' : '🤖' }}
    </div>
    <div class="message-bubble">
      <div class="message-content">{{ message.content }}</div>
      <div class="message-time">
        {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0;
  align-items: flex-start;
}

.message-wrapper.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: #f0f4f8;
  flex-shrink: 0;
}

.message-bubble {
  max-width: 70%;
  padding: 0.8rem 1.2rem;
  border-radius: 18px;
  position: relative;
}

.user .message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-top-right-radius: 4px;
}

.assistant .message-bubble {
  background: #f0f4f8;
  color: #1a202c;
  border-top-left-radius: 4px;
}

.message-content {
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 0.3rem;
  text-align: right;
}

.user .message-time {
  color: rgba(255, 255, 255, 0.9);
}
</style>