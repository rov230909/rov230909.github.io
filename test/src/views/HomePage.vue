<template>
  <div class="page-content">
    <div class="con">
      <!-- Hero Section -->
      <div class="seo-hero">
        <h1>LuanOri — Free Fire Token Generator & Bio Changer</h1>
        <p>Free Fire EAT / JWT / Access Token Generator and Long Bio Changer. Fast, free, and safe.</p>
        <div class="seo-tags">
          <span class="seo-tag">Free Fire Token</span>
          <span class="seo-tag">EAT to JWT</span>
          <span class="seo-tag">Access Token</span>
          <span class="seo-tag">Long Bio</span>
          <span class="seo-tag">Free • Safe</span>
        </div>
      </div>

      <!-- Main Tools -->
      <div class="card">
        <div class="slabel"><i class="fas fa-bolt"></i> MAIN TOOLS</div>
        <div class="igrp">
          <router-link to="/free-fire-token-generator" class="btn btn-purple">
            <i class="fas fa-key"></i> GET EAT / ACCESS / JWT
          </router-link>
        </div>
        <div class="igrp">
          <router-link to="/free-fire-long-bio" class="btn btn-dark">
            <i class="fas fa-fingerprint"></i> ADD FF LONG BIO
          </router-link>
        </div>
        <div class="igrp" style="margin-bottom: 0">
          <router-link to="/free-fire-unique-bio" class="btn btn-dark" style="border-color: var(--purple); color: var(--purple)">
            <i class="fas fa-star"></i> MAKE UNIQUE BIO
          </router-link>
        </div>
      </div>

      <!-- Video Tutorials -->
      <div class="card" v-if="tutorials.length">
        <div class="slabel"><i class="fas fa-play-circle"></i> VIDEO TUTORIALS</div>
        <div class="slider-container">
          <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <a v-for="(tut, idx) in tutorials" :key="idx" :href="tut.url" target="_blank" class="slide-item">
              <img :src="tut.thumb" :alt="tut.title" />
              <div class="tut-play"><i class="fab fa-youtube"></i></div>
              <div class="slide-caption"><h4>{{ tut.title }}</h4></div>
            </a>
          </div>
          <button class="slider-arrow arrow-left" @click="prevSlide" v-if="tutorials.length > 1">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="slider-arrow arrow-right" @click="nextSlide" v-if="tutorials.length > 1">
            <i class="fas fa-chevron-right"></i>
          </button>
          <div class="slider-dots" v-if="tutorials.length > 1">
            <div v-for="(_, idx) in tutorials" :key="idx" class="dot" :class="{ active: currentSlide === idx }" @click="goToSlide(idx)"></div>
          </div>
        </div>
      </div>

      <!-- Connect Section -->
      <div class="card">
        <div class="slabel"><i class="fas fa-link"></i> CONNECT WITH MAZID</div>
        <div class="connect-grid">
          <a href="https://t.me/LuanOri04" target="_blank" class="connect-card cc-tg">
            <img src="https://web.telegram.org/a/icon-192x192.png" />
            <span>Telegram</span>
          </a>
          <a href="https://youtube.com/@LuanOri04" target="_blank" class="connect-card cc-yt">
            <img src="https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png" />
            <span>YouTube</span>
          </a>
          <a href="https://instagram.com/LuanOri04" target="_blank" class="connect-card cc-ig">
            <img src="https://static.cdninstagram.com/rsrc.php/v4/yV/r/ftfgD2tsNT7.png" />
            <span>Instagram</span>
          </a>
          <a href="https://github.com/LuanOri" target="_blank" class="connect-card cc-gh">
            <img src="https://github.githubassets.com/assets/apple-touch-icon-144x144-b882e354c005.png" style="background: #fff" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <!-- Welcome Modal -->
      <div class="modal" :class="{ show: showWelcome }" @click.self="closeWelcome">
        <div class="mbox" style="text-align: center">
          <div style="font-size: 3.5rem; margin-bottom: 10px">
            <i class="fab fa-telegram-plane" style="color: #229ed9"></i>
          </div>
          <h3 class="htitle" style="font-size: 1.3rem; margin-bottom: 10px">WELCOME TO MAZIDSPACE</h3>
          <p style="color: var(--txt3); font-size: 0.85rem; margin-bottom: 20px; line-height: 1.5">
            Join our official Telegram channel for the latest updates, free tokens, and fast support!
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <a href="https://t.me/ShiinaTenju" target="_blank" class="btn btn-purple" @click="closeWelcome">
              <i class="fab fa-telegram-plane"></i> JOIN CHANNEL
            </a>
            <button @click="closeWelcome" class="btn btn-dark">CONTINUE TO SITE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

export default {
  name: 'HomePage',
  setup() {
    const tutorials = ref([])
    const currentSlide = ref(0)
    const showWelcome = ref(false)
    let slideTimer = null

    const startSliderTimer = () => {
      if (slideTimer) clearInterval(slideTimer)
      slideTimer = setInterval(() => {
        if (tutorials.value.length > 1) {
          currentSlide.value = (currentSlide.value + 1) % tutorials.value.length
        }
      }, 5000)
    }

    const nextSlide = () => {
      if (tutorials.value.length <= 1) return
      currentSlide.value = (currentSlide.value + 1) % tutorials.value.length
      startSliderTimer()
    }

    const prevSlide = () => {
      if (tutorials.value.length <= 1) return
      currentSlide.value = (currentSlide.value - 1 + tutorials.value.length) % tutorials.value.length
      startSliderTimer()
    }

    const goToSlide = (index) => {
      currentSlide.value = index
      startSliderTimer()
    }

    const closeWelcome = () => {
      showWelcome.value = false
      sessionStorage.setItem('welcomed', '1')
    }

    onMounted(async () => {
      // Check welcome
      if (!sessionStorage.getItem('welcomed')) {
        setTimeout(() => {
          showWelcome.value = true
        }, 400)
      }

      // Load config
      try {
        const res = await axios.get('/api/config')
        if (res.data.success && res.data.tutorials) {
          tutorials.value = res.data.tutorials
          if (tutorials.value.length > 1) {
            startSliderTimer()
          }
        }
      } catch (error) {
        console.error('Failed to load config:', error)
      }
    })

    onUnmounted(() => {
      if (slideTimer) clearInterval(slideTimer)
    })

    return {
      tutorials,
      currentSlide,
      showWelcome,
      nextSlide,
      prevSlide,
      goToSlide,
      closeWelcome
    }
  }
}
</script>

<style scoped>
.seo-hero {
  padding: 20px 16px 0;
  max-width: 480px;
  margin: 0 auto;
}

.seo-hero h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.3;
}

.seo-hero p {
  font-size: 0.78rem;
  color: var(--txt3);
  line-height: 1.6;
  margin-bottom: 14px;
}

.seo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.seo-tag {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 20px;
  background: var(--purple-g2);
  color: var(--purple-l);
  border: 1px solid var(--purple-g);
}

.slider-container {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--bd);
  aspect-ratio: 16/9;
}

.slider-track {
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-item {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: block;
  text-decoration: none;
}

.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.65);
  transition: filter 0.3s;
}

.slide-item:hover img {
  filter: brightness(0.8);
}

.tut-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ef4444;
  font-size: 3.5rem;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: all 0.3s;
}

.slide-item:hover .tut-play {
  transform: translate(-50%, -50%) scale(1.1);
}

.slide-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.95));
  padding: 30px 16px 12px;
}

.slide-caption h4 {
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Orbitron', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.slider-arrow:hover {
  background: var(--purple);
  box-shadow: 0 0 15px var(--purple-g);
}

.arrow-left {
  left: 10px;
}

.arrow-right {
  right: 10px;
}

.slider-dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--purple);
  width: 16px;
  border-radius: 10px;
  box-shadow: 0 0 8px var(--purple-g);
}

.connect-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.connect-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(26, 26, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
  transition: all 0.3s;
}

.connect-card img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
}

.connect-card span {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  transition: color 0.3s;
}

.connect-card:hover span {
  color: #fff;
}

.cc-tg:hover {
  background: rgba(41, 182, 246, 0.1);
  border-color: rgba(41, 182, 246, 0.3);
  transform: translateY(-2px);
}

.cc-yt:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  transform: translateY(-2px);
}

.cc-ig:hover {
  background: rgba(236, 72, 153, 0.1);
  border-color: rgba(236, 72, 153, 0.3);
  transform: translateY(-2px);
}

.cc-gh:hover {
  background: rgba(107, 114, 128, 0.1);
  border-color: rgba(107, 114, 128, 0.3);
  transform: translateY(-2px);
}

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

.htitle {
  font-family: 'Orbitron', sans-serif;
}
</style>