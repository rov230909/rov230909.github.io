<template>
  <div class="topbar">
    <div class="hbrand">
      <div class="hlogo">
        <img src="/static/logo.png" alt="FFTools Logo" @error="handleImageError" />
      </div>
      <div class="htitle">{{ title }}</div>
    </div>
    <a href="https://t.me/MAZID_GMR" target="_blank" class="hjoin">
      <i class="fab fa-telegram-plane"></i> Contact Owner
    </a>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: {
      type: String,
      default: 'FFTools.Site'
    }
  },
  methods: {
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/48?text=FF'
    }
  }
}
</script>

<style scoped>
.topbar {
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--bd);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 500;
}

.hbrand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hlogo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple-l), var(--purple-d));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 18px var(--purple-g), 0 0 6px rgba(217, 70, 239, 0.5);
  padding: 2.5px;
  flex-shrink: 0;
  animation: logoGlow 3s ease-in-out infinite alternate;
}

.hlogo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #000;
  display: block;
}

@keyframes logoGlow {
  from {
    box-shadow: 0 0 12px var(--purple-g), 0 0 4px rgba(217, 70, 239, 0.4);
  }
  to {
    box-shadow: 0 0 24px rgba(217, 70, 239, 0.6), 0 0 8px rgba(217, 70, 239, 0.3);
  }
}

.htitle {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  line-height: 1.2;
}

.hjoin {
  padding: 7px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.76rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  transition: all 0.3s;
}

.hjoin:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}
</style>