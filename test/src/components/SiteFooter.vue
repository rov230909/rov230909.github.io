<template>
  <div class="site-footer">
    By using this site you agree to our 
    <a href="/terms">Terms &amp; Conditions</a> &nbsp;|&nbsp; 
    &copy; 2025 LuanOri &nbsp;|&nbsp; 
    <a href="https://t.me/LuanOri04" target="_blank">@LuanOri04</a>
  </div>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style scoped>
.site-footer {
  text-align: center;
  padding: 10px 16px 6px;
  font-size: 0.62rem;
  color: var(--txt3);
  border-top: 1px solid var(--bd);
  background: rgba(10, 10, 12, 0.5);
  position: relative;
  z-index: 5;
  margin-top: 20px;
}

.site-footer a {
  color: var(--purple-l);
  text-decoration: none;
  font-weight: 700;
}

.site-footer a:hover {
  text-decoration: underline;
}
</style>