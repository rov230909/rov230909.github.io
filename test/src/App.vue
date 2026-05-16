<template>
  <div id="app">
    <TopBar :title="pageTitle" />
    
    <router-view />
    
    <BottomNav />
    <Toast />
    <TokenModal />
    <BioSuccessModal />
    <SiteFooter />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import BottomNav from './components/BottomNav.vue'
import Toast from './components/Toast.vue'
import TokenModal from './components/TokenModal.vue'
import BioSuccessModal from './components/BioSuccessModal.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    BottomNav,
    Toast,
    TokenModal,
    BioSuccessModal,
    SiteFooter
  },
  computed: {
    pageTitle() {
      const titles = {
        '/': 'LuanOri.Com',
        '/free-fire-token-generator': 'TOKEN GENERATOR',
        '/free-fire-long-bio': 'LONG BIO',
        '/free-fire-unique-bio': 'UNIQUE BIO'
      }
      return titles[this.$route.path] || 'LuanOri.Com'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Orbitron:wght@700;800&display=swap');

:root {
  --bg: #030014;
  --bg2: #0a0a0c;
  --bg3: #0f0f13;
  --bg4: #141419;
  --bd: rgba(255, 255, 255, 0.08);
  --bd2: rgba(255, 255, 255, 0.15);
  --purple: #d946ef;
  --purple-l: #e879f9;
  --purple-d: #c026d3;
  --purple-g: rgba(217, 70, 239, 0.35);
  --purple-g2: rgba(217, 70, 239, 0.1);
  --green: #22c55e;
  --txt: #ffffff;
  --txt2: #e2e8f0;
  --txt3: #9ca3af;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--txt);
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
}

.page-content {
  animation: fadeIn 0.35s ease;
  padding-bottom: 70px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.con {
  max-width: 480px;
  margin: 0 auto;
  padding: 16px 16px 20px;
}

.card {
  background: rgba(15, 15, 19, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid var(--bd);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
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

.slabel i {
  color: var(--purple);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-purple {
  background: linear-gradient(to right, #8b5cf6 0%, #d946ef 51%, #8b5cf6 100%);
  background-size: 200% auto;
  color: #ffffff;
  box-shadow: 0 0 20px var(--purple-g);
}

.btn-purple:hover {
  background-position: right center;
  box-shadow: 0 0 30px rgba(217, 70, 239, 0.5);
  transform: translateY(-2px);
}

.btn-dark {
  background: rgba(0, 0, 0, 0.4);
  color: var(--txt);
  border: 1px solid var(--bd2);
}

.btn-dark:hover {
  border-color: var(--purple);
  box-shadow: 0 0 15px var(--purple-g2);
}

.ibox {
  width: 100%;
  padding: 14px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--bd);
  border-radius: 12px;
  color: var(--txt);
  font-family: monospace;
  font-size: 0.88rem;
  transition: all 0.3s;
}

.ibox:focus {
  outline: none;
  border-color: var(--purple);
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 20px var(--purple-g2);
}

.igrp {
  margin-bottom: 16px;
}

.bprev {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--purple-g);
  border-radius: 12px;
  padding: 16px;
  min-height: 90px;
  max-height: 170px;
  overflow-y: auto;
  font-family: 'Poppins', sans-serif;
  font-size: 0.92rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
}

.bempty {
  color: var(--txt3);
  font-style: italic;
  font-size: 0.8rem;
  text-align: center;
}

textarea.ibox {
  resize: vertical;
  font-family: monospace;
}
</style>