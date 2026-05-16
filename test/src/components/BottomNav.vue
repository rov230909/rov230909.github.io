<template>
  <nav class="bnav">
    <router-link to="/" class="nitem" :class="{ active: $route.path === '/' }">
      <div class="niw"><i class="fas fa-home"></i></div>
      <span>HOME</span>
    </router-link>
    <router-link to="/free-fire-token-generator" class="nitem" :class="{ active: $route.path.includes('token') }">
      <div class="niw"><i class="fas fa-key"></i></div>
      <span>TOKEN</span>
    </router-link>
    <router-link to="/free-fire-long-bio" class="nitem" :class="{ active: $route.path.includes('long-bio') }">
      <div class="niw"><i class="fas fa-fingerprint"></i></div>
      <span>BIO</span>
    </router-link>
    <router-link to="/free-fire-unique-bio" class="nitem" :class="{ active: $route.path.includes('unique-bio') }">
      <div class="niw"><i class="fas fa-star"></i></div>
      <span>UNIQUE</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav'
}
</script>

<style scoped>
.bnav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 12, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--bd);
  display: flex;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.nitem {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 5px;
  color: var(--txt3);
  font-size: 1.1rem;
  transition: all 0.3s;
  gap: 4px;
  cursor: pointer;
  background: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
}

.nitem span {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nitem.active {
  color: var(--purple);
}

.nitem.active .niw {
  background: var(--purple-g2);
  padding: 6px 16px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px var(--purple-g);
}
</style>