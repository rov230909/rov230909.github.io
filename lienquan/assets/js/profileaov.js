/*!
 * =====================================================
 *  PROFILE AOV CREATOR
 *  © 2025 52HzMisfit
 *  Author: 52HzMisfit
 *  TikTok / Website: 52hzmisfit.com
 *  All rights reserved.
 * =====================================================
 */











/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ====== */
const createBtn = document.getElementById('createBtn');
const saveBtn = document.getElementById('saveBtn');
const profileCanvas = document.getElementById('profile');
const loading = document.getElementById("profileLoading");
const layer14List = [
 "I","II","III","IV","V","VI","VII","VIII","IX","X",
  "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX",
  "XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX"
];
const canvasFont = ' "Arial", sans-serif';
/* ====== RENDER PROFILE ====== */

async function renderProfile() {
  if (!state.ready) {
    try {
      await preloadAssets();
    } catch (e) {
      console.warn('preload error:', e);
    }
  }

  await new Promise(r => requestAnimationFrame(r));
  markDirty();
  await new Promise(r => requestAnimationFrame(r));
}

/* ====== NÚT TẠO ẢNH ====== */

const outputImg = document.getElementById('profileImage');

createBtn.addEventListener("click", async () => {
  createBtn.disabled = true;
  createBtn.textContent = "⏳ Đang tạo ảnh...";
  loading.style.display = "block";

  profileCanvas.style.display = "none";
  outputImg.style.display = "none";
  saveBtn.style.display = "none";

  await renderProfile();

  // 🔥 CHUYỂN CANVAS → ẢNH
  const dataURL = profileCanvas.toDataURL("image/png");
  outputImg.src = dataURL;

  loading.style.display = "none";
  outputImg.style.display = "block"; // 👈 BẤM GIỮ LƯU ĐƯỢC
  saveBtn.style.display = "block";

  createBtn.disabled = false;
  createBtn.textContent = "✨ Tạo ảnh";
});

/* =====================================================
   PROFILE AOV - Optimized single-file script
===================================================== */

const canvas = document.getElementById('profile');
const ctx = canvas.getContext('2d');
const controls = document.querySelector('.controls');


// --- CONFIG / STATE ---
let avatarImg = null;
let state = {
  backgroundEnabled: true,
  bgImageSrc: null,
  images: {},      // cache ảnh
  json: {},

  avatarFrames: [], // ✅ THÊM DÒNG NÀY (khung avatar từ MySQL)

  ready: false,
  dirty: false
};


// DOM refs used multiple times (cache to avoid repeated queries)
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const cropContainer = document.getElementById('avatarCropContainer');

// other cached controls
const bgCheckbox = document.getElementById('backgroundprofileCheck');
const khungSelect = document.getElementById('khungavatarSelect');
const phukienSelect = document.getElementById('phukienSelect');
const ganderSelect = document.getElementById('ganderSelect');
const tenGameInput = document.getElementById('tenGameInput');
const tenGameGoldCheck = document.getElementById('tenGameGoldCheck');

const nicknameCheck = document.getElementById('nicknameCheck');
const nicknameBox = document.getElementById('nicknameBox');
const nicknameInput = document.getElementById('nicknameInput');
if (tenGameInput) {
  tenGameInput.addEventListener("input", markDirty);
}

if (tenGameGoldCheck) {
  tenGameGoldCheck.addEventListener("change", markDirty);
}

if (nicknameCheck) {
  nicknameCheck.addEventListener("change", () => {
    if (nicknameBox) {
      nicknameBox.style.display = nicknameCheck.checked ? "block" : "none";
    }
    markDirty();
  });
}

if (nicknameInput) {
  nicknameInput.addEventListener("input", markDirty);
}
let tranInput = document.getElementById("tranInput");
let scanTranValue = "";
if (tranInput) {
    tranInput.addEventListener("input", () => {
        scanTranValue = tranInput.value.trim();
        markDirty();  
    });
}

let tyleThangInput = document.getElementById("tylethangInput");
let scanTyLeThang = "";
if (tyleThangInput) {
    tyleThangInput.addEventListener("input", () => {
        scanTyLeThang = tyleThangInput.value.trim();
        markDirty();
    });
}
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
let uytinInput = document.getElementById("uytinInput");
let scanUyTinValue = 100; // mặc định 100
if (uytinInput) {
    uytinInput.addEventListener("input", () => {
        scanUyTinValue = parseInt(uytinInput.value);
        markDirty(); // giống hệ thống của bạn
    });
}
let uytinDisplay = document.getElementById("uytinDisplay");

if (uytinInput) {
    uytinInput.addEventListener("input", () => {
        scanUyTinValue = parseInt(uytinInput.value);
        if (uytinDisplay) uytinDisplay.textContent = scanUyTinValue;
        markDirty();
    });
}


// dynamic UI elements created in original script
const topContainer = document.createElement('div');
const heroMainContainer = document.createElement('div');
const kytenLabel = document.createElement('label');


// ------------------ Helpers ------------------
function loadJSON(path) {
  return fetch(path).then(r => r.json());
}

function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (state.images[src]) {
    if (state.images[src].complete) return Promise.resolve(state.images[src]);
    // existing Image but not yet complete -> return a promise
    return new Promise((res, rej) => {
      state.images[src].addEventListener('load', () => res(state.images[src]));
      state.images[src].addEventListener('error', () => rej(new Error('Image load error: ' + src)));
    });
  }
  const img = new Image();
  img.src = src;
  state.images[src] = img;
  return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.onerror = (e) => rej(e);
  });
}

async function preloadAssets() {
  // load JSON files in parallel (added chucvodich)
  const jsonFiles = [
  ['backgrounds', 'assets/data/backgrounds.json'],
  ['khungavatar', '/api/avatar-frames.php'],
  ['phukien', 'assets/data/phukien.json'],
  ['gander', 'assets/data/gander.json'],
  ['top', 'assets/data/top.json'],
  ['avatar', '/api/hero-avatars.php'],
  ['rank', 'assets/data/rank.json'],
  ['chucvodich', '/api/chuc-vo-dich.php']
];

  const results = await Promise.all(jsonFiles.map(([k, p]) => loadJSON(p).then(j => ({k, j})).catch(e => ({k, j: null, e}))));
  results.forEach(r => { state.json[r.k] = r.j; if (r.e) console.warn('JSON load', r.k, r.e); });

  // backgrounds
  const bgData = state.json.backgrounds;
  if (bgData) {
    state.backgroundEnabled = bgData.enabled ?? true;
    state.bgImageSrc = bgData.default || null;
  }
  if (bgCheckbox) bgCheckbox.checked = state.backgroundEnabled;

  // Preload images referenced in JSONs (flatten list)
  const toPreload = new Set();
  if (state.bgImageSrc) toPreload.add(state.bgImageSrc);

  // include keys including chucvodich
  ['khungavatar', 'phukien', 'gander', 'top', 'avatar', 'rank', 'chucvodich'].forEach(key => {
    const arr = state.json[key];
    if (!arr) return;
    arr.forEach(item => {
  if (!item) return;

  // các item cũ
  if (item.src) toPreload.add(item.src);
  if (item.avatar) toPreload.add(item.avatar);

  // 🔥 HERO AVATAR TỪ MYSQL
  if (item.image) toPreload.add(item.image);
});
  });

  // Also preload fixed assets used by script
  ['assets/images/profileaov/backgrounds/profileempty.png',
   'assets/images/profileaov/backgrounds/circle.png',
   'assets/images/profileaov/backgrounds/lv30.png'].forEach(s => toPreload.add(s));

  const loadPromises = Array.from(toPreload).map(src => loadImage(src).catch(e => { console.warn('img fail', src, e); return null; }));
  await Promise.all(loadPromises);

  // assign some commonly used elements to state for easier access
  state.bgImage = state.bgImageSrc ? state.images[state.bgImageSrc] : null;
  state.profileEmpty = state.images['assets/images/profileaov/backgrounds/profileempty.png'] || null;
  state.circleImg = state.images['assets/images/profileaov/backgrounds/circle.png'] || null;
  state.lv30 = state.images['assets/images/profileaov/backgrounds/lv30.png'] || null;

  // build arrays for selects

  state.phukien = state.json.phukien || [];
  state.gander = state.json.gander || [];
  state.top = state.json.top || [];
  state.heroAvatars = state.json.avatar || [];
  state.rank = state.json.rank || [];
  state.chucvodich = state.json.chucvodich || [];
  state.avatarFrames = state.json.khungavatar || [];

  // ensure select elements are populated
   // 1️⃣ load khung từ MySQL TRƯỚC

// 2️⃣ preload ảnh khung
// ✅ PRELOAD ĐÚNG KHUNG AVATAR
state.avatarFrames.forEach(f => {
  if (f.src) loadImage(f.src);
});

// 3️⃣ populate khung avatar
if (khungSelect) {
  khungSelect.innerHTML = `<option value="">Không dùng khung</option>`;
  state.avatarFrames.forEach((f, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = f.name;
    khungSelect.appendChild(opt);
  });
}
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/


// 4️⃣ populate các select khác
populateSelects();

state.ready = true;
markDirty();

// preload ảnh khung avatar
state.avatarFrames.forEach(f => {
  if (f.src) loadImage(f.src);
});

  state.ready = true;
  markDirty();
}

function populateSelects() {
  // phukien
  if (phukienSelect && state.phukien.length) {
    phukienSelect.innerHTML = '';
    const def = document.createElement('option'); def.value = ''; def.textContent = 'Không'; phukienSelect.appendChild(def);
    state.phukien.forEach((it, i) => { const opt = document.createElement('option'); opt.value = i; opt.textContent = it.name || `phukien ${i}`; phukienSelect.appendChild(opt); });
  }
  // gander
  if (ganderSelect && state.gander.length) {
    ganderSelect.innerHTML = '';
    const def = document.createElement('option'); def.value = ''; def.textContent = 'Không'; ganderSelect.appendChild(def);
    state.gander.forEach((it, i) => { const opt = document.createElement('option'); opt.value = i; opt.textContent = it.name || `gander ${i}`; ganderSelect.appendChild(opt); });
  }

  // topSelect (layer 8) - populate with top data
  const topSelectEl = document.getElementById('topSelect');
  if (topSelectEl) {
    topSelectEl.innerHTML = '';
    const def = document.createElement('option'); def.value = ''; def.textContent = 'Chưa dùng danh hiệu'; topSelectEl.appendChild(def);
    if (state.top && state.top.length) {
      state.top.forEach((item, index) => {
        if (index === 0) return; // keep parity with original script (skip index 0)
        const opt = document.createElement('option'); opt.value = index; opt.textContent = item.name || item.title || `Top ${index}`;
        topSelectEl.appendChild(opt);
      });
    }
  }

  // hero avatar selects (layer 10) - populate heroAvatarSelect1/2/3
  for (let i = 1; i <= 3; i++) {
  const sel = document.getElementById(`heroAvatarSelect${i}`);
  if (!sel) continue;

  sel.innerHTML = `<option value="">Không</option>`;

  state.heroAvatars.forEach((hero, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;           // ⚠️ index, KHÔNG phải id
    opt.textContent = hero.name;
    sel.appendChild(opt);
  });
}
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
  // ===== LAYER 12: rank hiện tại =====
  const hientaiSelect = document.getElementById('hientaiSelect');
  if (hientaiSelect) {
    hientaiSelect.innerHTML = '';
    state.rank.forEach((item, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = item.name || `Rank ${i}`;
      hientaiSelect.appendChild(opt);
    });
  }

  // ===== LAYER 13: rank lịch sử (giống layer 12) =====
  const lichsuSelect = document.getElementById('lichsuSelect');
  if (lichsuSelect) {
    lichsuSelect.innerHTML = '';
    state.rank.forEach((item, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = item.name || `Rank ${i}`;
      lichsuSelect.appendChild(opt);
    });
  }

  // ===== LAYER 14: Dấu Ấn Truyền Kỳ =====
  const layer14Select = document.getElementById('layer14Select');
  if (layer14Select) {
    layer14Select.innerHTML = '';
    const def = document.createElement('option'); def.value = ''; def.textContent = 'Chưa có'; layer14Select.appendChild(def);
    layer14List.forEach(txt => {
      const opt = document.createElement('option');
      opt.value = txt;
      opt.textContent = txt;
      layer14Select.appendChild(opt);
    });
  }

// ===== LAYER 15: Chức Vô Địch =====
const chucvodichSelect = document.getElementById('chucvodichSelect');
if (chucvodichSelect) {
  chucvodichSelect.innerHTML = ''; // ❌ không có option mặc định

  state.chucvodich.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.image;   // 🔥 URL đầy đủ
    opt.textContent = item.name;
    chucvodichSelect.appendChild(opt);
  });
}
}



// mark canvas needs to be redrawn
function markDirty() { state.dirty = true; }

// ------------------ Input / UI handlers ------------------
if (bgCheckbox) bgCheckbox.addEventListener('change', () => { state.backgroundEnabled = bgCheckbox.checked; markDirty(); });
if (khungSelect) {
  khungSelect.addEventListener('change', () => {
    markDirty(); // 🔥 BẮT BUỘC
  });
}
avatarInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    avatarPreview.src = ev.target.result;
    avatarImg = new Image();
    avatarImg.src = ev.target.result;
    avatarImg.onload = () => markDirty();

    cropContainer.style.display = 'block';
    avatarPreview.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/

// ------------------ Drawing ------------------
// Use an offscreen temporary canvas to assemble the final image (avoids flicker)
const offscreen = document.createElement('canvas');
offscreen.width = canvas.width;
offscreen.height = canvas.height;
const octx = offscreen.getContext('2d');


function drawAvatarTo(ctx) {
  if (!avatarImg || !avatarImg.complete) return;

  const x = 80;
  const y = 206;
  const size = 150;

  ctx.drawImage(avatarImg, x, y, size, size);
}

function clearOffscreen() { octx.clearRect(0,0,offscreen.width, offscreen.height); }

function drawAllToOffscreen() {
  if (!state.ready) return;
  clearOffscreen();

  // 1. background
  if (state.backgroundEnabled && state.bgImage && state.bgImage.complete) octx.drawImage(state.bgImage, 0, 0, offscreen.width, offscreen.height);

  // 2. avatar crop
  if (avatarImg && avatarImg.complete) drawAvatarTo(octx);

  // 3. profile empty overlay (fixed)
  if (state.profileEmpty && state.profileEmpty.complete) octx.drawImage(state.profileEmpty, 0, 0, offscreen.width, offscreen.height);

 // 4. khung avatar
drawAvatarFrameTo(octx);

  // 5. phukien
  const phuIdx = phukienSelect ? phukienSelect.value : '';
  if (phuIdx !== '' && state.phukien[phuIdx] && state.images[state.phukien[phuIdx].src]) {
    const img = state.images[state.phukien[phuIdx].src]; if (img && img.complete) octx.drawImage(img, 50, 165, 100, 100);
  }

  // 6. gander
  const gIdx = ganderSelect ? ganderSelect.value : '';
  if (gIdx !== '' && state.gander[gIdx] && state.images[state.gander[gIdx].src]) {
    const img = state.images[state.gander[gIdx].src]; if (img && img.complete) octx.drawImage(img, 247, 252, 55, 55);
  }

  // 7. ten game (text)
  drawTenGameTo(octx);

  // 8. top / rank
  drawTopTo(octx);

  // 9. ky ten
  drawKyTenTo(octx);

  // 10. hero settings and heroes
  drawHeroSettingTo(octx);
  drawHeroesTo(octx);

  // 12. rank hiện tại
  drawRankHienTaiTo(octx);
  // 13. rank lịch sử
  drawRankLichSuTo(octx);
  // 14. dấu ấn truyền kỳ
  drawLayer14To(octx);
  // 15. Chức Vô Địch
  drawChucVoDichTo(octx);
  drawScanTranTo(octx);
  drawTyLeThangTo(octx);
  drawUyTinTo(octx);

  drawCopyright(octx);



  // 11. layer 11 (lv30) should be drawn last if it's intended to be overlay
  if (state.lv30 && state.lv30.complete) octx.drawImage(state.lv30, 0, 0, offscreen.width, offscreen.height);
}
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
function commitOffscreenToCanvas() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(offscreen, 0, 0);
}

// requestAnimationFrame loop, only draws when dirty
function rafLoop() {
  if (state.dirty) {
    drawAllToOffscreen();
    commitOffscreenToCanvas();
    state.dirty = false;
  }
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

// ----- drawing helpers -----
function drawAvatarFrameTo(ctx) {
  if (!khungSelect || khungSelect.value === "") return;

  const frame = state.avatarFrames[khungSelect.value];
  if (!frame || !frame.src) return;

  const img = state.images[frame.src]; // ✅ ĐÚNG KEY
  if (!img || !img.complete) return;

  ctx.drawImage(img, 62, 186, 190, 190);
}


function drawRankHienTaiTo(targetCtx) {
  const sel = document.getElementById('hientaiSelect');/* © 2025 52HzMisfit – Profile AOV Creator */
  if (!sel || sel.value === '') return;

  const data = state.rank[sel.value];
  if (!data) return;

  const src = data.src || data.image || data.img;
  if (!src) return;

  const img = state.images[src];
  if (!img || !img.complete) return;

  // KÍCH THƯỚC CỤ THỂ (không nhân nữa)
  const w = 120;   // <-- bạn thay số ở đây để chỉnh to / nhỏ
  const h = 120;   // <-- ví dụ to hơn = 150, 180, 200...

  // vị trí tâm
  const cx = 151, cy = 764;

  targetCtx.drawImage(img, cx - w/2, cy - h/2, w, h);                                                                                                                                                                           /* © 2025 52HzMisfit – Profile AOV Creator */
}
function drawRankLichSuTo(targetCtx) {
  const sel = document.getElementById('lichsuSelect');
  if (!sel || sel.value === '') return;

  const data = state.rank[sel.value];
  if (!data) return;

  const src = data.src || data.image || data.img;
  if (!src) return;

  const img = state.images[src];
  if (!img || !img.complete) return;

  // KÍCH THƯỚC (nếu muốn giống layer 12 thì giữ)
  const w = 120;
  const h = 120;
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
  // VỊ TRÍ LAYER 13 (bạn có thể chỉnh)
  const cx = 292;  
  const cy = 764;

  targetCtx.drawImage(img, cx - w/2, cy - h/2, w, h);
}
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
function drawLayer14To(targetCtx) {
    const sel = document.getElementById('layer14Select');                                                                                                                                                                                       /* © 2025 52HzMisfit – Profile AOV Creator */
    if (!sel || !sel.value) return;

    const text = sel.value;

    targetCtx.font = `30px ${canvasFont}`;
    // chữ vàng (gold)
    targetCtx.fillStyle = "#be8c67";
    targetCtx.textAlign = "center";

    // toạ độ bạn muốn (tự chỉnh nếu cần)
    const x = 431;
    const y = 777;

    targetCtx.fillText(text, x, y);
}

function drawChucVoDichTo(ctx) {
  const sel = document.getElementById("chucvodichSelect");
  if (!sel || !sel.value) return;

  const img = state.images[sel.value];
  if (!img || !img.complete) return;

    // Điều chỉnh vị trí/kích thước theo thiết kế của bạn
    // ví dụ đặt ở góc dưới giữa với kích thước 120x120
    const w = 90;
    const h = 90;
    const cx = 570; // chỉnh theo layout
    const cy = 760; // chỉnh theo layout

    octx.drawImage(img, cx - w/2, cy - h/2, w, h);
}

function drawScanTranTo(targetCtx) {
    let val = scanTranValue;

    // Nếu chưa nhập gì → mặc định 0
    if (val === "" || val === undefined || val === null) {
        val = "0";
    }

    const text = val;

    targetCtx.font = `48px ${canvasFont}`;
    targetCtx.fillStyle = '#c0c5ed';
    targetCtx.textAlign = 'center';

    const maxWidth = 300;
    const lineHeight = 38;
    const words = text.split(' ');
    let line = '';
    let x = 188;
    let y = 924;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = targetCtx.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
            targetCtx.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    targetCtx.fillText(line, x, y);
}

/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
function drawTyLeThangTo(targetCtx) {
    let raw = scanTyLeThang;

    if (raw === "" || raw === undefined || raw === null) {
        raw = 1000; // mặc định 100.0
    } else {
        raw = parseInt(raw);
        if (isNaN(raw)) raw = 0;
    }

    let text = "";

    if (raw === 0) {
        text = "0%";
    } else if (raw === 1000) {
        text = "100.0";
    } else {
        text = (raw / 10).toFixed(1) + "%";
    }

    targetCtx.font = `48px ${canvasFont}`;
    targetCtx.textAlign = 'center';

    const x = 360;
    const y = 924;

    // Tạo Gradient loang từ trên xuống
    const gradient = targetCtx.createLinearGradient(0, y - 40, 0, y + 10);
    gradient.addColorStop(0, "#fffbf0ff");   // màu trên
    gradient.addColorStop(1, "#fcc87aff");  // màu dưới

    targetCtx.fillStyle = gradient;

    targetCtx.fillText(text, x, y);
}


/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
function drawUyTinTo(targetCtx) {
    if (scanUyTinValue == null) return;

    const text = scanUyTinValue.toString();

    targetCtx.font = `48px ${canvasFont}`;
    targetCtx.fillStyle = '#f3f1dc'; // vàng nhạt
    targetCtx.textAlign = 'center';

    // vị trí bạn tự chỉnh nếu cần
    const x = 541;
    const y = 924;

    targetCtx.fillText(text, x, y);
}



function drawTenGameTo(ctx) {
  const name = tenGameInput ? tenGameInput.value.trim() : "";
  const nicknameRaw = nicknameInput ? nicknameInput.value.trim() : "";

  if (!name && !nicknameRaw) return;

  let x = 310;
  const y = 290;

  ctx.font = `33px ${canvasFont}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // ===== TÊN GAME =====
  if (name) {

    if (tenGameGoldCheck && tenGameGoldCheck.checked) {
      const gradient = ctx.createLinearGradient(0, y - 30, 0, y + 6);
      gradient.addColorStop(0, "#e6c37a"); // vàng
      gradient.addColorStop(1, "#fff5be"); // vàng trắng
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = "#c0c5ed";
    }

    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    ctx.fillText(name, x, y);
    x += ctx.measureText(name).width + 8;
  }

  // ===== BIỆT DANH (LUÔN CÓ NGOẶC) =====
  if (nicknameCheck && nicknameCheck.checked && nicknameRaw) {
    const nickname = ` (${nicknameRaw})`; // 🔥 BỌC NGOẶC

    ctx.fillStyle = "#c0c5ed"; // xanh cố định
    ctx.fillText(nickname, x, y);
  }
}
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
function drawTopTo(targetCtx) {
  const topSelect = document.getElementById('topSelect');
  const rankSelect = document.getElementById('rankSelect');
  const rankNameInput = document.getElementById('rankNameInput');
  if (!topSelect) return;
  const topValue = topSelect.value;
  const rankValue = rankSelect ? rankSelect.value : '';
  const rankName = rankNameInput ? rankNameInput.value.trim() : '';
  const y = 435, startX = 96, gapX = 10;
  targetCtx.textAlign = 'left';
  targetCtx.font = `28px ${canvasFont}`;

  if (topValue !== '' && state.top[topValue]) {
    const imgSrc = state.top[topValue].src;
    const img = state.images[imgSrc];
    if (img && img.complete) targetCtx.drawImage(img, startX, y - 25, 50, 50);
    let textX = startX + 50 + gapX;
    if (rankValue) { targetCtx.fillStyle = '#dfeef5'; targetCtx.fillText(rankValue, textX, y + 10); textX += targetCtx.measureText(rankValue).width + gapX; }
    if (rankName) { targetCtx.fillStyle = '#c0c5ed'; targetCtx.fillText(rankName, textX, y + 10); }
  } else {
    targetCtx.fillStyle = '#c0c5ed'; targetCtx.fillText('Chưa dùng danh hiệu', startX, y + 10);
  }
}

function drawKyTenTo(targetCtx) {
  const kytenInput = document.getElementById('kytenInput');                                                                                                                                                                                                                                                                                     /* © 2025 52HzMisfit – Profile AOV Creator */
  let text = kytenInput ? kytenInput.value.trim() : '';
  if (!text) text = 'Ký                 Lưu chữ ký';
  targetCtx.font = `28px ${canvasFont}`;
  targetCtx.fillStyle = '#c0c5ed';
  targetCtx.textAlign = 'left';
  targetCtx.fillText(text, 96, 520);
}

function drawHeroSettingTo(targetCtx) {
  const heroSettingSelect = document.getElementById('heroSettingSelect');
  if (!heroSettingSelect) return;
  const val = heroSettingSelect.value;
  targetCtx.font = `30px ${canvasFont}`;
  targetCtx.fillStyle = '#c0c5ed';
  if (val === 'set') { targetCtx.textAlign = 'left'; targetCtx.fillText('Hero', 105, 640); }
  else { targetCtx.textAlign = 'center'; targetCtx.fillText('Chưa thiết lập hiện tướng', canvas.width/2, 640); }
}

function drawHeroesTo(targetCtx) {
  const heroBlocks = [
    {av: document.getElementById('heroAvatarSelect1'), top: document.getElementById('heroTopSelect1')},
    {av: document.getElementById('heroAvatarSelect2'), top: document.getElementById('heroTopSelect2')},
    {av: document.getElementById('heroAvatarSelect3'), top: document.getElementById('heroTopSelect3')}
  ];
  const startX = 200, y = 630, gapX = 120, scale = 1.325;
  const selected = [];
  heroBlocks.forEach((b) => { if (b.av && b.av.value !== '') selected.push({ avatarIndex: parseInt(b.av.value), topIndex: b.top && b.top.value !== '' ? parseInt(b.top.value) : null }); });
/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/
  selected.forEach((sel, i) => {
    const xPos = startX + i*gapX;
    // circle background
    if (state.circleImg && state.circleImg.complete) targetCtx.drawImage(state.circleImg, xPos, y - 40*scale, 80*scale, 80*scale);
    const avatarInfo = state.heroAvatars[sel.avatarIndex];
    if (avatarInfo && avatarInfo.image) {
  const ava = state.images[avatarInfo.image];
      if (ava && ava.complete) {
        targetCtx.save();
        const cx = xPos + 40*scale, cy = y - 40*scale + 40*scale, r = 36*scale;
        targetCtx.beginPath(); targetCtx.arc(cx, cy, r, 0, Math.PI*2); targetCtx.closePath(); targetCtx.clip();
        targetCtx.drawImage(ava, xPos + 4*scale, y - 36*scale, 72*scale, 72*scale);
        targetCtx.restore();
      }
    }
    if (sel.topIndex !== null && state.top[sel.topIndex] && state.images[state.top[sel.topIndex].src]) {
      const topImg = state.images[state.top[sel.topIndex].src]; if (topImg && topImg.complete) targetCtx.drawImage(topImg, xPos + 50*scale, y - 42*scale, 40*scale, 40*scale);
    }
  });
}
function drawCopyright(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.15; // mờ nhẹ
  ctx.font = '500 16px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'right';
  ctx.fillText('© 52HzMisfit.com', canvas.width - 20, canvas.height - 20);
  ctx.restore();
}
// ------------------ INIT UI BUILD (mimic original insertions) ------------------
/* =================================================
   PROFILE UI LOGIC (HTML TĨNH)
================================================= */

// ===== TOP / DANH HIỆU =====
const topSelect = document.getElementById("topSelect");
const rankBox = document.getElementById("rankBox");
const rankSelect = document.getElementById("rankSelect");
const rankNameInput = document.getElementById("rankNameInput");

topSelect.addEventListener("change", () => {
  if (topSelect.value !== "") {
    rankBox.style.display = "flex";
  } else {
    rankBox.style.display = "none";
    rankSelect.value = "";
    rankNameInput.value = "";
  }
});

// ===== HERO SETTING =====
const heroSettingSelect = document.getElementById("heroSettingSelect");
const heroBlocksWrapper = document.getElementById("heroBlocks");

const heroBlocks = [
  {
    block: document.getElementById("heroBlock1"),
    avatar: document.getElementById("heroAvatarSelect1"),
    top: document.getElementById("heroTopSelect1")
  },
  {
    block: document.getElementById("heroBlock2"),
    avatar: document.getElementById("heroAvatarSelect2"),
    top: document.getElementById("heroTopSelect2")
  },
  {
    block: document.getElementById("heroBlock3"),
    avatar: document.getElementById("heroAvatarSelect3"),
    top: document.getElementById("heroTopSelect3")
  }
];

heroSettingSelect.addEventListener("change", () => {
  const enable = heroSettingSelect.value === "set";
  heroBlocksWrapper.style.display = enable ? "block" : "none";

  heroBlocks.forEach((b, i) => {
    b.block.style.display = enable && i === 0 ? "block" : "none";
    b.avatar.value = "";
    b.top.innerHTML = "";
    b.top.parentElement.style.display = "none";
  });
});

// ===== HERO AVATAR CHANGE =====
heroBlocks.forEach((b, index) => {
  b.avatar.addEventListener("change", () => {
    if (!b.avatar.value) {
      b.top.parentElement.style.display = "none";
      for (let i = index + 1; i < heroBlocks.length; i++) {
        heroBlocks[i].block.style.display = "none";
        heroBlocks[i].avatar.value = "";
      }
      return;
    }

    // show mastery
    b.top.parentElement.style.display = "inline-block";
    b.top.innerHTML = "";

    state.top.forEach((t, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = t.name || `Top ${i}`;
      b.top.appendChild(opt);
    });

    // show next hero block
    if (heroBlocks[index + 1]) {
      heroBlocks[index + 1].block.style.display = "block";
    }
  });
});

// ------------------ CREATE / SAVE ------------------
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const link = document.createElement('a'); link.download = 'profileaov.png'; link.href = canvas.toDataURL('image/png'); link.click();
  });
}

// ------------------ START ------------------
preloadAssets().catch(e => console.error('Preload fail', e));

// expose a tiny API for debugging in console
window.__AOV = { state, markDirty };




/* ====== KHỞI TẠO BIẾN ĐÚNG THỨ TỰ ======
   © 52HzMisfit – Profile AOV Creator
   Không được sao chép khi chưa có sự cho phép
*/

