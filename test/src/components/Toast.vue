<template>
  <div id="toast" :class="{ show: visible }">{{ message }}</div>
</template>

<script>
import { useToastStore } from '../stores/toastStore'

export default {
  name: 'Toast',
  setup() {
    const toastStore = useToastStore()
    return {
      visible: toastStore.visible,
      message: toastStore.message
    }
  }
}
</script>

<style scoped>
#toast {
  position: fixed;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--purple);
  color: #fff;
  border: 1px solid var(--purple-d);
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0 10px 30px rgba(217, 70, 239, 0.4);
  z-index: 3000;
  transition: top 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  white-space: nowrap;
}

#toast.show {
  top: 62px;
}
</style>