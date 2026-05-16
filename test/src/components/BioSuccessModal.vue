<template>
  <div class="modal" :class="{ show: visible }" @click.self="close">
    <div class="mbox">
      <div style="text-align: center; margin-bottom: 16px">
        <h3 class="htitle" style="font-size: 1.3rem">SUCCESS!</h3>
        <p style="color: var(--txt3); font-size: 0.85rem; margin-top: 5px">Bio updated in Free Fire</p>
      </div>
      <div
        style="margin: 16px 0; background: rgba(0, 0, 0, 0.4); padding: 16px; border-radius: 12px; border: 1px solid var(--bd)"
      >
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
          <span style="color: var(--txt3); font-size: 0.8rem">Name</span>
          <span style="color: var(--green); font-weight: 700">{{ bioData.name }}</span>
        </div>
        <div style="display: flex; justify-content: space-between">
          <span style="color: var(--txt3); font-size: 0.8rem">UID</span>
          <span style="color: var(--green); font-weight: 700; font-family: monospace">{{ bioData.uid }}</span>
        </div>
      </div>
      <div class="slabel"><i class="fas fa-edit"></i> NEW BIO PREVIEW</div>
      <div class="bprev" v-html="bioData.bioHtml" style="min-height: auto; text-align: center"></div>
      <button @click="close" class="btn btn-purple" style="margin-top: 20px">
        <i class="fas fa-check"></i> AWESOME
      </button>
    </div>
  </div>
</template>

<script>
import { useBioSuccessStore } from '../stores/bioSuccessStore'

export default {
  name: 'BioSuccessModal',
  setup() {
    const bioSuccessStore = useBioSuccessStore()
    
    const close = () => {
      bioSuccessStore.close()
    }
    
    return {
      visible: bioSuccessStore.visible,
      bioData: bioSuccessStore.bioData,
      close
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  padding: 16px;
}

.modal.show {
  opacity: 1;
  visibility: visible;
}

.mbox {
  background: var(--bg3);
  border-radius: 24px;
  padding: 24px;
  max-width: 390px;
  width: 100%;
  border: 1px solid var(--bd);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal.show .mbox {
  transform: translateY(0);
}

.bprev {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--purple-g);
  border-radius: 12px;
  padding: 16px;
  min-height: 90px;
  overflow-y: auto;
  font-family: 'Poppins', sans-serif;
  font-size: 0.92rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.slabel {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--txt3);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 14px;
}

.htitle {
  font-family: 'Orbitron', sans-serif;
}
</style>