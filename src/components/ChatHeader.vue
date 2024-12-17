<script setup lang="ts">
defineProps<{
  selectedModel: 'gemini' | 'openai';
  onModelChange: (model: 'gemini' | 'openai') => void;
}>();
</script>

<template>
  <header class="chat-header">
    <h2>AI Assistant</h2>
    <div class="model-selector">
      <button
        :class="['model-btn', { active: selectedModel === 'gemini' }]"
        @click="onModelChange('gemini')"
      >
        <span class="model-icon">🤖</span>
        Gemini
      </button>
      <button
        :class="['model-btn', { active: selectedModel === 'openai' }]"
        @click="onModelChange('openai')"
      >
        <span class="model-icon">🧠</span>
        OpenAI
      </button>
    </div>
  </header>
</template>

<style scoped>
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  color: white;
  text-align: center;
}

h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.model-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.model-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.model-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.model-btn.active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.model-icon {
  font-size: 1.2rem;
}
</style>