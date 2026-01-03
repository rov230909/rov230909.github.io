// ❌ Chặn chuột phải
document.addEventListener('contextmenu', event => event.preventDefault());
// ❌ Chặn kéo ảnh ra khỏi trang
document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
// ❌ Chặn phím F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) return false; // Ctrl+Shift+J
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
  if (e.ctrlKey && e.keyCode == 83) return false; // Ctrl+S
};
