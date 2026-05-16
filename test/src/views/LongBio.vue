<template>
  <div class="page-content">
    <div class="con">
      <!-- SEO Hero -->
      <div class="seo-hero">
        <h1>Free Fire Long Bio Changer — Add Color Bio Instantly</h1>
        <p>Change your <strong>Free Fire bio</strong> to a long, colorful, styled text. Supports <strong>color codes</strong>, bold, italic, underline formatting.</p>
        <div class="seo-tags">
          <span class="seo-tag">FF Long Bio</span>
          <span class="seo-tag">Bio Color Codes</span>
          <span class="seo-tag">Bio Changer</span>
          <span class="seo-tag">Live Preview</span>
          <span class="seo-tag">Free • Instant</span>
        </div>
      </div>

      <!-- Main Form -->
      <div class="card">
        <form @submit.prevent="submitBio">
          <!-- Token Input -->
          <div class="igrp">
            <div class="slabel"><i class="fas fa-key"></i> ANY TOKEN (EAT/ACCESS/JWT)</div>
            <input type="text" v-model="token" class="ibox" placeholder="Paste your token here..." required />
          </div>

          <!-- Quick Formatting -->
          <div class="igrp">
            <div class="slabel"><i class="fas fa-paint-brush"></i> QUICK FORMATTING</div>
            <div class="format-buttons">
              <button type="button" class="btn-dark" @click="insertFormat('[b]')">B</button>
              <button type="button" class="btn-dark" @click="insertFormat('[i]')">I</button>
              <button type="button" class="btn-dark" @click="insertFormat('[u]')">U</button>
            </div>
          </div>

          <!-- Color Picker -->
          <div class="igrp">
            <div class="ctoggle" :class="{ open: showColors }" @click="showColors = !showColors">
              <span><i class="fas fa-palette" style="color: var(--purple); margin-right: 6px"></i> COLOR CODES</span>
              <i class="fas fa-chevron-down arr"></i>
            </div>
            <div class="cgrid" :class="{ show: showColors }">
              <button v-for="color in presetColors" :key="color" type="button" class="cbtn" :style="{ background: color }" @click="insertFormat(`[${color.replace('#', '')}]`)"></button>
              <div class="cpicker-row">
                <label class="color-label">
                  <span><i class="fas fa-eye-dropper"></i> MORE COLORS</span>
                  <input type="color" v-model="customColor" class="color-input" />
                </label>
                <button type="button" class="btn btn-purple" @click="insertFormat(`[${customColor.replace('#', '')}]`)">ADD HEX</button>
              </div>
            </div>
          </div>

          <!-- Bio Text -->
          <div class="igrp">
            <div class="slabel"><i class="fas fa-edit"></i> BIO TEXT</div>
            <textarea ref="bioTextarea" v-model="bioText" class="ibox" rows="4" maxlength="280" @input="updatePreview" required></textarea>
            <div class="char-count">{{ bioText.length }}/280</div>
          </div>

          <!-- Live Preview -->
          <div class="igrp">
            <div class="slabel"><i class="fas fa-eye"></i> LIVE PREVIEW</div>
            <div class="bprev" v-html="previewHtml"></div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-purple" :disabled="loading">
            <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
            <i v-else class="fas fa-bolt"></i>
            {{ loading ? 'UPDATING...' : 'UPDATE BIO' }}
          </button>
        </form>
      </div>

      <!-- FAQ -->
      <div class="seo-faq">
        <h2><i class="fas fa-question-circle" style="color: var(--purple); margin-right: 6px"></i> Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>How to add a long bio in Free Fire?</h3>
          <p>Paste your token, write your bio using color codes like [ff0000] for red, click UPDATE BIO.</p>
        </div>
        <div class="faq-item">
          <h3>How to add colors to Free Fire bio?</h3>
          <p>Use hex color codes in square brackets like [ff0000] for red, [00ff00] for green.</p>
        </div>
        <div class="faq-item">
          <h3>What token do I need?</h3>
          <p>You need an EAT token, Access Token, or JWT token from the Token Generator page.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToastStore } from '../stores/toastStore'
import { useBioSuccessStore } from '../stores/bioSuccessStore'
import { renderBioHtml } from '../composables/useBioUtils'

export default {
  name: 'LongBio',
  setup() {
    const token = ref('')
    const bioText = ref('')
    const loading = ref(false)
    const showColors = ref(false)
    const customColor = ref('#d946ef')
    const bioTextarea = ref(null)
    
    const toastStore = useToastStore()
    const bioSuccessStore = useBioSuccessStore()

    const presetColors = [
      '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
      '#00ffff', '#ff5733', '#9b59b6', '#1abc9c', '#e84393'
    ]

    const previewHtml = computed(() => renderBioHtml(bioText.value))

    const insertFormat = (format) => {
      if (!bioTextarea.value) return
      const textarea = bioTextarea.value
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      bioText.value = bioText.value.substring(0, start) + format + bioText.value.substring(end)
      // Set cursor position after the inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + format.length
        textarea.focus()
      }, 0)
    }

    const updatePreview = () => {
      // Preview is computed automatically
    }

    const submitBio = async () => {
      if (!token.value.trim()) {
        toastStore.show('Please enter your token!')
        return
      }
      if (!bioText.value.trim()) {
        toastStore.show('Please enter your bio!')
        return
      }

      loading.value = true
      try {
        const res = await axios.post('/api/update-bio', {
          token: token.value,
          bio: bioText.value
        })
        
        if (res.data.success) {
          bioSuccessStore.show({
            name: res.data.nickname,
            uid: res.data.account_id,
            bioHtml: renderBioHtml(bioText.value)
          })
        } else {
          throw new Error(res.data.error)
        }
      } catch (err) {
        toastStore.show(err.message || 'Failed to update bio!')
      } finally {
        loading.value = false
      }
    }

    // Load token from session storage
    onMounted(() => {
      const pendingToken = sessionStorage.getItem('pendingToken')
      if (pendingToken) {
        token.value = pendingToken
        sessionStorage.removeItem('pendingToken')
        toastStore.show('Token loaded & ready!')
      }
    })

    return {
      token,
      bioText,
      loading,
      showColors,
      customColor,
      presetColors,
      bioTextarea,
      previewHtml,
      insertFormat,
      updatePreview,
      submitBio
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

.seo-faq {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 16px 8px;
}

.seo-faq h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--txt3);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.faq-item {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--bd);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 8px;
}

.faq-item h3 {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--purple-l);
  margin-bottom: 4px;
}

.faq-item p {
  font-size: 0.72rem;
  color: var(--txt3);
  line-height: 1.5;
}

.format-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.btn-dark {
  background: rgba(0, 0, 0, 0.4);
  color: var(--txt);
  border: 1px solid var(--bd2);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.btn-dark:hover {
  border-color: var(--purple);
  box-shadow: 0 0 15px var(--purple-g2);
}

.cgrid {
  display: none;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 10px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--bd);
  border-radius: 12px;
}

.cgrid.show {
  display: grid;
}

.cbtn {
  height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.cbtn:hover {
  transform: scale(1.15) translateY(-2px);
  border-color: rgba(255, 255, 255, 0.8);
}

.cpicker-row {
  grid-column: span 5;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--bd);
}

.color-label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b5cf6, #d946ef);
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid var(--bd);
}

.color-label span {
  background: rgba(0, 0, 0, 0.75);
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.65rem;
  color: #fff;
  pointer-events: none;
}

.color-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  left: 0;
  top: 0;
}

.ctoggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--bd);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.ctoggle:hover {
  border-color: var(--purple);
  box-shadow: 0 0 10px var(--purple-g2);
}

.ctoggle.open .arr {
  transform: rotate(180deg);
}

.char-count {
  text-align: right;
  margin-top: 5px;
  font-size: 0.75rem;
  color: var(--txt3);
}
</style>