<template>
  <div class="modal" :class="{ show: visible }" @click.self="close">
    <div class="mbox">
      <div style="text-align: center; margin-bottom: 12px">
        <h3 class="htitle" style="font-size: 1.2rem">
          <i class="fas fa-check-circle" style="color: var(--green); margin-right: 6px"></i>
          TOKEN READY
        </h3>
      </div>
      <div
        style="margin: 12px 0; background: rgba(0, 0, 0, 0.4); padding: 14px; border-radius: 12px; border: 1px solid var(--bd)"
      >
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
          <span style="color: var(--txt3); font-size: 0.75rem">Name</span>
          <span style="color: var(--green); font-weight: 700; font-size: 0.8rem">{{ tokenData.name || '--' }}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
          <span style="color: var(--txt3); font-size: 0.75rem">UID</span>
          <span style="color: var(--green); font-weight: 700; font-family: monospace; font-size: 0.8rem">{{ tokenData.uid || '--' }}</span>
        </div>
        <div style="display: flex; justify-content: space-between">
          <span style="color: var(--txt3); font-size: 0.75rem">Region</span>
          <span style="color: var(--purple-l); font-weight: 700; font-size: 0.8rem">{{ tokenData.region || '--' }}</span>
        </div>
      </div>
      <div class="slabel" style="margin-bottom: 4px">
        <i class="fas fa-key"></i> <span>{{ tokenData.tokenType || 'TOKEN' }}</span>
      </div>
      <div class="tbox" style="margin-top: 0; padding: 12px; max-height: 80px; overflow-y: auto; font-size: 0.75rem">
        {{ tokenData.token }}
      </div>
      <div style="margin-top: 14px; display: grid; gap: 8px">
        <button @click="copyToken" class="btn btn-purple" style="padding: 10px">
          <i class="fas fa-copy"></i> COPY TOKEN
        </button>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
          <router-link to="/free-fire-long-bio" @click="storeTokenForBio" class="btn btn-dark" style="border-color: var(--purple); color: var(--purple); padding: 10px">
            <i class="fas fa-fingerprint"></i> USE
          </router-link>
          <button @click="close" class="btn btn-dark" style="padding: 10px">
            <i class="fas fa-times"></i> CLOSE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTokenModalStore } from '../stores/tokenModalStore'
import { useToastStore } from '../stores/toastStore'

export default {
  name: 'TokenModal',
  setup() {
    const tokenModalStore = useTokenModalStore()
    const toastStore = useToastStore()
    
    const copyToken = () => {
      navigator.clipboard.writeText(tokenModalStore.tokenData.token)
      toastStore.show('Copied!')
    }
    
    const storeTokenForBio = () => {
      sessionStorage.setItem('pendingToken', tokenModalStore.tokenData.token)
    }
    
    const close = () => {
      tokenModalStore.close()
    }
    
    return {
      visible: tokenModalStore.visible,
      tokenData: tokenModalStore.tokenData,
      copyToken,
      storeTokenForBio,
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

.tbox {
  background: rgba(0, 0, 0, 0.5);
  border: 1px dashed var(--purple);
  border-radius: 12px;
  padding: 16px;
  margin: 10px 0;
  font-family: monospace;
  font-size: 0.8rem;
  word-break: break-all;
  color: var(--purple-l);
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