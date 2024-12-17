<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AIService } from '../services/api';
import { ChatState, Message } from '../types/chat';
import ChatHeader from './ChatHeader.vue';
import ChatMessage from './ChatMessage.vue';
import ChatInput from './ChatInput.vue';

const GEMINI_API_KEY = ''; // Add your Gemini API key here
const OPENAI_API_KEY = ''; // Add your OpenAI API key here

const aiService = new AIService(GEMINI_API_KEY, OPENAI_API_KEY);

const chatState = reactive<ChatState>({
  messages: [],
  isLoading: false,
  error: null,
  selectedModel: 'gemini'
});

const handleModelChange = (model: 'gemini' | 'openai') => {
  chatState.selectedModel = model;
};

const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    content,
    role: 'user',
    timestamp: new Date()
  };

  chatState.messages.push(userMessage);
  chatState.isLoading = true;
  chatState.error = null;

  try {
    const response = await aiService.generateResponse(
      content,
      chatState.selectedModel
    );

    const assistantMessage: Message = {
      content: response,
      role: 'assistant',
      timestamp: new Date()
    };

    chatState.messages.push(assistantMessage);
  } catch (error) {
    chatState.error = 'Failed to generate response. Please try again.';
    console.error('Error:', error);
  } finally {
    chatState.isLoading = false;
  }
};
</script>

<template>
  <div class="chat-container">
    <ChatHeader
      :selectedModel="chatState.selectedModel"
      :onModelChange="handleModelChange"
    />
    
    <div class="messages-container">
      <div v-if="chatState.messages.length === 0" class="empty-state">
        Start a conversation by sending a message! 💭
      </div>
      
      <ChatMessage
        v-else
        v-for="(message, index) in chatState.messages"
        :key="index"
        :message="message"
      />

      <div v-if="chatState.error" class="error-message">
        {{ chatState.error }}
      </div>
    </div>

    <ChatInput
      :isLoading="chatState.isLoading"
      :onSendMessage="handleSendMessage"
    />
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 900px;
  margin: 2rem auto;
  height: 80vh;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  background: white;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #ffffff;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f7fafc;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}

.empty-state {
  text-align: center;
  color: #a0aec0;
  padding: 2rem;
  font-size: 1.1rem;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 0.8rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
}
</style>