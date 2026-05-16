<template>
  <div class="page-content">
    <div class="con">
      <!-- SEO Hero -->
      <div class="seo-hero">
        <h1>Free Fire Token Generator — EAT, JWT & Access Token</h1>
        <p>The fastest Free Fire Token Generator online. Convert your <strong>EAT token to JWT</strong>, <strong>EAT to Access Token</strong>, or <strong>Access Token to JWT</strong> in seconds.</p>
        <div class="seo-tags">
          <span class="seo-tag">Free Fire EAT Token</span>
          <span class="seo-tag">FF JWT Token</span>
          <span class="seo-tag">Access Token Generator</span>
          <span class="seo-tag">EAT to JWT</span>
          <span class="seo-tag">Free • Safe • Instant</span>
        </div>
      </div>

      <!-- Main Card -->
      <div class="card">
        <!-- How to use -->
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div class="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
            <i class="fas fa-book-open text-fuchsia-400 text-xs"></i>
            <span class="text-xs font-bold text-white uppercase tracking-wider">How to use</span>
          </div>
          <div class="space-y-4">
            <div class="flex gap-3 text-[11px] text-gray-400">
              <span class="bg-fuchsia-500/20 text-fuchsia-400 font-bold px-2 py-0.5 rounded text-[10px] h-fit mt-0.5">1</span>
              <div>
                <p>Select Provider &amp; Login below.</p>
                <p class="text-[10px] text-green-500 mt-0.5"><i class="fas fa-shield-alt"></i> Safe: Official Garena Server</p>
              </div>
            </div>
            <div class="flex gap-3 text-[11px] text-gray-400">
              <span class="bg-fuchsia-500/20 text-fuchsia-400 font-bold px-2 py-0.5 rounded text-[10px] h-fit mt-0.5">2</span>
              <div class="w-full">
                <p class="mb-2">Search browser history for any of these:</p>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center justify-between bg-black/40 border border-white/10 rounded px-2 py-1.5">
                    <code class="text-fuchsia-300 font-mono text-[10px]">https://ticket.kiosgamer.co.id/?eat=</code>
                    <button @click="copyText('https://ticket.kiosgamer.co.id/?eat=')" class="text-gray-500 hover:text-white transition">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <div class="flex items-center justify-between bg-black/40 border border-white/10 rounded px-2 py-1.5">
                    <code class="text-fuchsia-300 font-mono text-[10px]">?eat=</code>
                    <button @click="copyText('?eat=')" class="text-gray-500 hover:text-white transition">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-3 text-[11px] text-gray-400">
              <span class="bg-fuchsia-500/20 text-fuchsia-400 font-bold px-2 py-0.5 rounded text-[10px] h-fit mt-0.5">3</span>
              <p>Select Conversion Action &amp; Paste Token below.</p>
            </div>
          </div>
        </div>

        <!-- Provider Login Buttons -->
        <div class="mb-6">
          <div class="flex justify-between items-end mb-2">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Provider &amp; Login</span>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <a v-for="provider in providers" :key="provider.name" :href="provider.url" target="_blank" class="social-icon-btn h-11 rounded-lg flex items-center justify-center">
              <img v-if="provider.icon" :src="provider.icon" class="w-5 h-5 object-contain" :class="{ 'rounded-full': provider.rounded }" />
              <i v-else :class="provider.iconClass" class="text-xl text-white"></i>
            </a>
          </div>
        </div>

        <!-- Conversion Action -->
        <div class="mb-5">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">
            <i class="fas fa-exchange-alt text-fuchsia-400"></i> Conversion Action
          </span>
          <select v-model="selectedAction" class="cyber-input w-full rounded-xl py-3 pl-4 pr-10 text-sm mt-2">
            <option value="eat_to_jwt">EAT → JWT Token (Recommended)</option>
            <option value="eat_to_access">EAT → Access Token</option>
            <option value="access_to_jwt">Access Token → JWT Token</option>
          </select>
        </div>

        <!-- Token Input -->
        <div class="mb-6">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">
            <i class="fas fa-bolt text-fuchsia-400"></i> Paste Token
          </span>
          <div class="relative group mt-2">
            <input type="text" v-model="tokenInput" class="cyber-input w-full rounded-xl py-3.5 pl-4 pr-10 text-sm placeholder-gray-600" placeholder="Paste Full URL or Token here..." autocomplete="off" />
            <button @click="tokenInput = ''" class="absolute right-3 top-3.5 text-gray-500 hover:text-fuchsia-400 transition">
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>
          <div class="flex justify-between mt-2 px-1">
            <span class="text-[10px] text-gray-500">Both URL &amp; Token Accepted</span>
            <button @click="pasteToken" class="text-[10px] text-fuchsia-400 hover:text-white transition flex items-center gap-1">
              <i class="far fa-clipboard"></i> Paste
            </button>
          </div>
        </div>

        <!-- Generate Button -->
        <button @click="generateToken" :disabled="loading" class="btn-grad w-full rounded-xl py-4 font-bold title-font text-white text-base tracking-widest flex items-center justify-center gap-2">
          <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
          <i v-else class="fas fa-arrow-right text-xs"></i>
          {{ loading ? 'GENERATING...' : 'GENERATE TOKEN' }}
        </button>
      </div>

      <!-- FAQ Section -->
      <div class="seo-faq">
        <h2><i class="fas fa-question-circle" style="color: var(--purple); margin-right: 6px"></i> Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>What is a Free Fire EAT Token?</h3>
          <p>EAT (External Auth Token) is an authentication token used by Free Fire/Garena to verify your account.</p>
        </div>
        <div class="faq-item">
          <h3>What is a Free Fire JWT Token?</h3>
          <p>JWT (JSON Web Token) is a more secure token format derived from your EAT or Access Token.</p>
        </div>
        <div class="faq-item">
          <h3>Is this Free Fire Token Generator safe?</h3>
          <p>Yes, 100% safe. We use the official Garena OAuth login — your password is never shared with us.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '../stores/toastStore'
import { useTokenModalStore } from '../stores/tokenModalStore'

export default {
  name: 'TokenGenerator',
  setup() {
    const tokenInput = ref('')
    const selectedAction = ref('eat_to_jwt')
    const loading = ref(false)
    const toastStore = useToastStore()
    const tokenModalStore = useTokenModalStore()

    const providers = [
      { name: 'Google', url: 'https://auth.garena.com/universal/oauth?platform=8&response_type=code&locale=en-SG&client_id=100067&redirect_uri=https://api.ff.garena.co.id/auth/auth/callback_n?site=https://api-ticket.ff.gameid.garena.co.id/oauth/callback_redirect/', icon: 'https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw' },
      { name: 'Facebook', url: 'https://auth.garena.com/universal/oauth?platform=3&response_type=code&locale=en-SG&client_id=100067&redirect_uri=https://api.ff.garena.co.id/auth/auth/callback_n?site=https://api-ticket.ff.gameid.garena.co.id/oauth/callback_redirect/', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/120px-Facebook_Logo_2023.png?20231011121526' },
      { name: 'Apple', url: 'https://auth.garena.com/universal/oauth?platform=10&response_type=code&locale=en-SG&client_id=100067&redirect_uri=https://api.ff.garena.co.id/auth/auth/callback_n?site=https://api-ticket.ff.gameid.garena.co.id/oauth/callback_redirect/', iconClass: 'fab fa-apple' },
      { name: 'Twitter', url: 'https://auth.garena.com/universal/oauth?platform=11&response_type=code&locale=en-SG&client_id=100067&redirect_uri=https://api.ff.garena.co.id/auth/auth/callback_n?site=https://api-ticket.ff.gameid.garena.co.id/oauth/callback_redirect/', icon: 'https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png', rounded: true },
      { name: 'VK', url: 'https://auth.garena.com/universal/oauth?platform=5&response_type=code&locale=en-SG&client_id=100067&redirect_uri=https://api.ff.garena.co.id/auth/auth/callback_n?site=https://api-ticket.ff.gameid.garena.co.id/oauth/callback_redirect/', icon: 'https://vk.com/images/icons/favicons/fav_logo.ico?8' }
    ]

    const copyText = (text) => {
      navigator.clipboard.writeText(text)
      toastStore.show('Copied!')
    }

    const pasteToken = async () => {
      try {
        const text = await navigator.clipboard.readText()
        tokenInput.value = text
        toastStore.show('Pasted!')
      } catch {
        toastStore.show('Paste permission denied! Use Ctrl+V.')
      }
    }

    const generateToken = async () => {
      if (!tokenInput.value.trim()) {
        toastStore.show('Paste URL or Token!')
        return
      }

      loading.value = true
      try {
        const res = await axios.post('/api/verify-token', {
          token: tokenInput.value,
          action: selectedAction.value
        })
        
        if (res.data.success) {
          tokenModalStore.show({
            name: res.data.nickname || '--',
            uid: res.data.account_id || '--',
            region: res.data.region || '--',
            tokenType: res.data.token_type,
            token: res.data.result_token
          })
        } else {
          throw new Error(res.data.error)
        }
      } catch (err) {
        toastStore.show(err.message || 'Connection Error!')
      } finally {
        loading.value = false
      }
    }

    return {
      tokenInput,
      selectedAction,
      loading,
      providers,
      copyText,
      pasteToken,
      generateToken
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

.cyber-input {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: monospace;
  transition: all 0.3s ease;
}

.cyber-input:focus {
  border-color: #d946ef;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 20px rgba(217, 70, 239, 0.35);
  outline: none;
}

.btn-grad {
  background-image: linear-gradient(to right, #8b5cf6 0%, #d946ef 51%, #8b5cf6 100%);
  background-size: 200% auto;
  transition: 0.5s;
  border: none;
  box-shadow: 0 0 20px rgba(217, 70, 239, 0.3);
  cursor: pointer;
}

.btn-grad:hover:not(:disabled) {
  background-position: right center;
  box-shadow: 0 0 30px rgba(217, 70, 239, 0.5);
  transform: translateY(-1px);
}

.btn-grad:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.social-icon-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.2s;
}

.social-icon-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.title-font {
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
}
</style>