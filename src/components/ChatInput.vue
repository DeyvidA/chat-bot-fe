<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}>();

const messageInput = ref('');

const handleSend = () => {
  if (messageInput.value.trim()) {
    props.onSendMessage(messageInput.value);
    messageInput.value = '';
  }
};
</script>

<template>
  <div class="chat-input">
    <input
      v-model="messageInput"
      @keyup.enter="handleSend"
      placeholder="Type your message here..."
      :disabled="isLoading"
      class="message-input"
    />
    <button
      @click="handleSend"
      :disabled="isLoading || !messageInput.trim()"
      class="send-button"
    >
      <span v-if="!isLoading">➤</span>
      <span v-else class="loading-indicator">●</span>
    </button>
  </div>
</template>

<style scoped>
.chat-input {
  background: white;
  padding: 1rem;
  border-radius: 0 0 12px 12px;
  display: flex;
  gap: 0.5rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.message-input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: #667eea;
}

.send-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-indicator {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}
</style>