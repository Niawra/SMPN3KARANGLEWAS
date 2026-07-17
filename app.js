// ===== NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  const el = document.getElementById('page-'+page);
  if(el){ el.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>{ if(l.getAttribute('onclick') && l.getAttribute('onclick').includes("'"+page+"'")) l.classList.add('active'); });
  if(page==='guru') renderGuru();
  if(page==='galeri') renderGaleri();
  if(page==='game') renderGames();
  if(page==='ekskul') renderEkskul();
  if(page==='link') renderLinks();
  if(page==='profil') renderProfilGuru();
  renderBeritaHome();
  renderPrestasi();
}

// ===== LOADING =====
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loading-screen').classList.add('hide');
    renderBeritaHome(); renderGames(); renderEkskul(); renderGuru(); renderGaleri(); renderLinks(); renderProfilGuru(); renderPrestasi();
    initCounters(); initFadeIn();
  },1800);
});

// ===== THEME =====
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  document.getElementById('themeBtn').textContent=isDark?'🌙':'☀️';
}

// ===== MOBILE MENU =====
function toggleMobile(){document.getElementById('mobileMenu').classList.toggle('open');}
function closeMobile(){document.getElementById('mobileMenu').classList.remove('open');}

// ===== SEARCH =====
function openSearch(){document.getElementById('searchOverlay').classList.add('open');document.getElementById('searchInput').focus();}
function closeSearch(e){if(!e||e.target===document.getElementById('searchOverlay')||!e)document.getElementById('searchOverlay').classList.remove('open');}
function doSearch(q){
  const res=document.getElementById('searchResults');
  if(!q.trim()){res.innerHTML='';return;}
  const items=[];
  db.berita.filter(b=>b.judul.toLowerCase().includes(q.toLowerCase())).forEach(b=>items.push({icon:'📰',title:b.judul,sub:'Berita',page:'beranda'}));
  db.guru.filter(g=>g.nama.toLowerCase().includes(q.toLowerCase())).forEach(g=>items.push({icon:'👩‍🏫',title:g.nama,sub:g.mapel,page:'guru'}));
  db.ekskul.filter(e=>e.nama.toLowerCase().includes(q.toLowerCase())).forEach(e=>items.push({icon:'⭐',title:e.nama,sub:'Ekstrakurikuler',page:'ekskul'}));
  db.game.filter(g=>g.nama.toLowerCase().includes(q.toLowerCase())).forEach(g=>items.push({icon:'🎮',title:g.nama,sub:'Game Edukasi',page:'game'}));
  db.link.filter(l=>l.nama.toLowerCase().includes(q.toLowerCase())).forEach(l=>items.push({icon:'🔗',title:l.nama,sub:'Link Penting',page:'link'}));
  res.innerHTML = items.length ? items.map(i=>`<div class="search-result-item" onclick="showPage('${i.page}');closeSearch()"><div class="search-result-icon">${i.icon}</div><div><strong>${i.title}</strong><div style="font-size:0.78rem;color:var(--text-muted)">${i.sub}</div></div></div>`).join('') : '<p style="text-align:center;color:var(--text-muted);padding:1rem">Tidak ada hasil ditemukan</p>';
}

// ===== COUNTERS =====
function initCounters(){
  document.querySelectorAll('.counter').forEach(el=>{
    const target=parseInt(el.dataset.target);
    let cur=0;
    const step=Math.ceil(target/60);
    const t=setInterval(()=>{
      cur=Math.min(cur+step,target);
      el.textContent=cur;
      if(cur>=target)clearInterval(t);
    },30);
  });
}

// ===== FADE IN =====
function initFadeIn(){
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
}

// ===== BACK TO TOP =====
window.addEventListener('scroll',()=>{
  const btn=document.getElementById('back-to-top');
  if(window.scrollY>400)btn.classList.add('show'); else btn.classList.remove('show');
});

// ===== BERITA HOME =====
function renderBeritaHome(){
  const el=document.getElementById('berita-home');
  if(!el)return;
  el.innerHTML=db.berita.slice(0,3).map(b=>`
    <div class="card fade-in">
      <div class="news-img" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE);font-size:4rem;height:180px">${b.emoji}</div>
      <div class="card-body">
        <div class="card-category">${b.kat}</div>
        <div class="card-title">${b.judul}</div>
        <div class="card-meta">📅 ${formatDate(b.tgl)}</div>
        <div class="card-text">${b.isi.substring(0,100)}...</div>
        <button class="btn btn-outline btn-sm">Baca Selengkapnya →</button>
      </div>
    </div>`).join('');
}

// helper untuk preview galeri admin
function clearGaleriImgPreview(){
  const previewWrap=document.getElementById('m-img-preview');
  if(previewWrap) previewWrap.style.display='none';
  const fileInput=document.getElementById('m-img');
  if(fileInput) fileInput.value='';
}


function formatDate(d){const [y,m,da]=d.split('-');const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];return `${da} ${months[parseInt(m)-1]} ${y}`;}

// ===== GURU =====
let guruPage=1;const guruPerPage=8;
function renderGuru(){  `zd
  r`
  const search=document.getElementById('guruSearch')?.value.toLowerCase()||'';
  const mapel=document.getElementById('guruMapel')?.value||'';
  let list = db.guru.filter(g => {
    const nama = (g.nama ?? '').toString();
    const mapelGuru = (g.mapel ?? '').toString();

    const cocokNama = !search || nama.toLowerCase().includes(search);

    const cocokMapel = !mapel ||
      mapelGuru
        .split(" dan ")
        .map(m => m.trim().toLowerCase())
        .includes(mapel.toLowerCase());

    return cocokNama && cocokMapel;
  });
  const pages=Math.ceil(list.length/guruPerPage);
  const slice=list.slice((guruPage-1)*guruPerPage,guruPage*guruPerPage);
  const grid=document.getElementById('guru-grid');
  if(grid) grid.innerHTML=slice.map(g=>{
    const nama = g.nama ?? '';
    const mapelGuru = g.mapel ?? '';
    const mapelText = (mapelGuru === 'undefined' || mapelGuru === undefined || mapelGuru === null) ? '' : mapelGuru;
    return `<div class="guru-card"><div class="guru-photo">${g.emoji ?? ''}</div><div class="guru-name">${nama}</div><div class="guru-mapel">${mapelText}</div><div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.25rem"> ${g.email ?? ''}</div></div>`;
  }).join('');
  renderPagination('guru-pagination',pages,guruPage,p=>{guruPage=p;renderGuru();});
}
function filterGuru(){guruPage=1;renderGuru();}
function renderProfilGuru(){
  const g=document.getElementById('guru-profil-grid');
  if(g) g.innerHTML=db.guru.map(gu=>`<div class="guru-card"><div class="guru-photo">${gu.emoji}</div></div>`).join('');
}

// ===== GAME =====
let gamePage=1;const gamePerPage=8;
function openGameMapelModal(game){
  if(!game) return;
  const modal=document.getElementById('gameMapelModal');
  const title=document.getElementById('gameMapelTitle');
  const sub=document.getElementById('gameMapelSub');
  const qrWrap=document.getElementById('gameMapelQR');
  const linkText=document.getElementById('gameMapelLinkText');
  const openLink=document.getElementById('gameMapelOpenLink');
  if(!modal||!qrWrap) return;

  title.textContent=game.nama || 'Mata Pelajaran';
  sub.textContent=`${game.kat || ''} • ${game.platform || ''}`.trim();

  // UI game sekarang hanya memakai "Daftar Soal" per kelas (7/8/9)
  if(linkText) linkText.textContent = '—';
  if(openLink){
    openLink.href = '#';
    openLink.style.pointerEvents = 'none';
  }

  if(qrWrap){
    qrWrap.innerHTML = '<div style="color:var(--text-muted);text-align:center">QR/URL materi sudah dihapus.</div>';
  }

  modal.classList.add('open');
}

function closeGameMapelModal(){
  const modal=document.getElementById('gameMapelModal');
  if(modal) modal.classList.remove('open');
}

async function copyGameMapelLink(){
  const linkText=document.getElementById('gameMapelLinkText')?.textContent || '';
  if(!linkText || linkText==='—') return;
  try{
    await navigator.clipboard.writeText(linkText);
    alert('Link berhasil disalin!');
  }catch(e){
    const tmp=document.createElement('textarea');
    tmp.value=linkText;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    tmp.remove();
    alert('Link berhasil disalin!');
  }
}

// ===== GAME -> BANK SOAL =====
let gameSoalCurrentGameId = null;
let gameSoalCurrentKelas = null;

function openGameSoalPage(gameId, kelas=null){
  gameSoalCurrentGameId = gameId;
  gameSoalCurrentKelas = kelas;
  showPage('bank-soal');
  renderSoalLinks();
}

function openPilihKelasForGame(gameId){
  const game = db.game.find(g=>g.id===gameId);
  if(game && game.nama && game.nama.toLowerCase() === 'cbp rupiah'){
    openGameSoalPage(gameId, null);
    return;
  }
  const modal = document.getElementById('pilih-kelas-modal');
  const title = document.getElementById('pilih-kelas-title');
  if(modal){
    if(title) title.textContent = `Pilih Kelas - ${game?.nama || 'Game'}`;
    modal.dataset.gameId = String(gameId);
    modal.classList.add('open');
  }
}

function closePilihKelasModal(){
  const modal = document.getElementById('pilih-kelas-modal');
  if(modal) modal.classList.remove('open');
}

function chooseKelas(kelas){
  const modal = document.getElementById('pilih-kelas-modal');
  if(!modal) return;
  const gameId = Number(modal.dataset.gameId);
  closePilihKelasModal();
  openGameSoalPage(gameId, kelas);
}

function renderSoalLinks(){
  const wrap=document.getElementById('soal-links-wrap');
  const titleEl=document.getElementById('soal-page-title');
  if(!wrap || !titleEl) return;

  const game=db.game.find(g=>g.id===gameSoalCurrentGameId);
  if(!game){
    titleEl.textContent='Daftar Soal';
    wrap.innerHTML='<p style="color:var(--text-muted)">Game belum dipilih.</p>';
    return;
  }

  titleEl.textContent=`Daftar Soal - ${game.nama}`;

  const isCBPRupiah = game && game.nama && game.nama.toLowerCase() === 'cbp rupiah';
  let links = [];
  if(isCBPRupiah){
    links = Array.isArray(game.soalLinks) ? game.soalLinks : [];
  }else{
    const mapByKelas = game.soalLinksByKelas || game.soalLinksPerKelas || null;
    const kelasKey = String(gameSoalCurrentKelas ?? '');
    if(mapByKelas && kelasKey && Array.isArray(mapByKelas[kelasKey])){
      links = mapByKelas[kelasKey];
    }
  }

  if(!links.length){
    wrap.innerHTML='<p style="color:var(--text-muted)">Belum ada link soal untuk kelas ini.</p>';
    return;
  }

  wrap.innerHTML = links.map((s,idx)=>{
    const nama=s.nama||`Soal ${idx+1}`;
    const url=s.url||'';
    const desc=s.desc||'';
    return `
      <div class="soal-card">
        <div class="soal-card-head">
          <div class="soal-card-title">${nama}</div>
          <div class="soal-card-cat">${game.kat || 'Soal'}</div>
        </div>
        ${desc?`<div class="soal-card-desc">${desc}</div>`:''}
        <div class="soal-card-actions">
          <a class="btn btn-primary btn-sm" href="${url}" target="_blank" rel="noopener" style="pointer-events:${url?'auto':'none'}">Buka Soal →</a>
          <button class="btn btn-outline btn-sm" onclick="copySoalLink('${url}')">Salin Link</button>
        </div>
      </div>
    `;
  }).join('');
}

async function copySoalLink(url){
  if(!url) return;
  try{
    await navigator.clipboard.writeText(url);
    alert('Link soal berhasil disalin!');
  }catch(e){
    const tmp=document.createElement('textarea');
    tmp.value=url;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    tmp.remove();
    alert('Link soal berhasil disalin!');
  }
}

function renderGames(){
  const search=document.getElementById('gameSearch')?.value.toLowerCase()||'';
  const kat=document.getElementById('gameKat')?.value||'';
  let list=db.game.filter(g=>(!search||g.nama.toLowerCase().includes(search)||g.desc.toLowerCase().includes(search))&&(!kat||g.kat===kat));
  const pages=Math.ceil(list.length/gamePerPage);
  const slice=list.slice((gamePage-1)*gamePerPage,gamePage*gamePerPage);
  const grid=document.getElementById('game-grid');
  if(grid) grid.innerHTML=slice.map(g=>{
    const isCBPRupiah = g && g.nama && g.nama.toLowerCase()==='cbp rupiah';
    const onClick = isCBPRupiah ? `openGameSoalPage(${g.id})` : `openPilihKelasForGame(${g.id})`;
    return `<div class="game-card"><div class="game-thumb">${g.emoji}<span class="game-platform">${g.platform}</span></div><div class="game-body"><div class="game-cat">${g.kat}</div><div class="game-title">${g.nama}</div><div class="game-desc">${g.desc}</div><div style="display:flex;gap:0.6rem;flex-wrap:wrap"><button class="btn btn-primary btn-sm" style="flex:1 1 160px" onclick="${onClick}">🧾 Daftar Soal</button></div></div></div>`;
  }).join('');
  renderPagination('game-pagination',pages,gamePage,p=>{gamePage=p;renderGames();});
}

function filterGames(){gamePage=1;renderGames();}

window.openGameMapelModal = function(gameId){
  const game = typeof gameId === 'number' ? db.game.find(g=>g.id===gameId) : db.game.find(g=>g.id==gameId);
  return openGameMapelModal(game);
};

// ===== EKSKUL =====
function renderEkskul(){
  const grid=document.getElementById('ekskul-grid');
  if(!grid)return;
  grid.innerHTML=db.ekskul.map(e=>`<div class="ekskul-card" onclick="openEkskulModal(${e.id})"><div class="ekskul-img" style="background:linear-gradient(135deg,${e.warna}22,${e.warna}44)">${e.emoji}<span class="ekskul-badge">Ekskul</span></div><div class="ekskul-body"><div class="ekskul-title">${e.nama}</div><div class="ekskul-meta"><span>⏰ ${e.jadwal.split(',')[0]}</span><span>👤 ${e.pembina.split(',')[0]}</span></div></div></div>`).join('');
}
function openEkskulModal(id){
  const e=db.ekskul.find(x=>x.id===id);
  if(!e)return;
  document.getElementById('ekskul-modal-content').innerHTML=`<div class="ekskul-modal-header" style="background:linear-gradient(135deg,${e.warna}44,${e.warna}88)">${e.emoji}<button class="ekskul-modal-close" onclick="closeEkskulModal()">✕</button></div><div class="ekskul-modal-body"><h2 style="font-family:'Poppins',sans-serif;font-weight:700;color:var(--text);margin-bottom:0.5rem">${e.nama}</h2><p style="color:var(--text-muted);line-height:1.7;margin-bottom:1.5rem">${e.desc}</p><div class="ekskul-detail-grid"><div class="ekskul-detail-item"><label>Pembina</label><span>${e.pembina}</span></div><div class="ekskul-detail-item"><label>Jadwal Latihan</label><span>${e.jadwal}</span></div>`;
  document.getElementById('ekskul-modal').classList.add('open');
}
function closeEkskulModal(){document.getElementById('ekskul-modal').classList.remove('open');}

// ===== GALERI =====
let galeriFilter='';
function renderGaleri(){
  const grid=document.getElementById('galeri-grid');
  if(!grid)return;
  let list=db.galeri.filter(g=>!galeriFilter||g.kat===galeriFilter);

  grid.innerHTML=list.map(g=>{
    const isFoto = g.tipe==='foto' || g.tipe===undefined || g.tipe===null;
    const imgSrc = isFoto ? (g.img || '') : '';
    const payload = encodeURIComponent(JSON.stringify({
      emoji: g.emoji,
      judul: g.judul,
      kat: g.kat,
      tipe: g.tipe,
      img: imgSrc
    }));

    return `<div class="galeri-item" onclick="openLightboxPayload('${payload}')">`+
      `<div class="galeri-thumb ${g.tinggi}" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE);font-size:3rem;display:flex;align-items:center;justify-content:center;position:relative">`+
        (imgSrc ? `<img src="${imgSrc}" alt="${(g.judul||'Galeri').replace(/"/g,'"')}" style="width:100%;height:100%;object-fit:cover;display:block;" />` : `${g.emoji}`)+
        (g.tipe==='video'?'<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);font-size:2rem;color:white">▶</span>':'')+
      `</div></div>`;
  }).join('');
}
function filterGaleri(btn,kat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  galeriFilter=kat;
  renderGaleri();
}

function openLightboxPayload(payload){
  try{
    const decoded = JSON.parse(decodeURIComponent(payload));
    const caption = `${decoded.judul} - ${decoded.kat}`;
    const lightboxImg = document.getElementById('lightbox-img');
    const isFoto = decoded.tipe==='foto' || decoded.tipe===undefined || decoded.tipe===null;

    if(!lightboxImg) return;

    if(isFoto && decoded.img){
      lightboxImg.innerHTML = `
        <img src="${decoded.img}" alt="${(decoded.judul||'Galeri').replace(/"/g,'"')}" style="max-width:90vw;max-height:80vh;border-radius:var(--radius);object-fit:contain;display:block;" />
      `;
    }else{
      lightboxImg.innerHTML = `<div style="width:400px;height:300px;display:flex;align-items:center;justify-content:center;font-size:8rem;border-radius:var(--radius)">${decoded.emoji||'🖼️'}</div>`;
    }

    document.getElementById('lightbox-caption').textContent = caption;
    document.getElementById('lightbox').classList.add('open');
  }catch(e){
    // fallback lama
    openLightbox(null,null);
  }
}

// kompatibilitas (jika ada pemanggilan lama)
function openLightbox(content,caption){
  document.getElementById('lightbox-img').innerHTML=`<div style="width:400px;height:300px;display:flex;align-items:center;justify-content:center;font-size:8rem;border-radius:var(--radius)">${content||'🖼️'}</div>`;
  document.getElementById('lightbox-caption').textContent=caption||'';
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');}

// ===== GALERI ADMIN UPLOAD (Base64) =====
function fileToDataURL(file){
  return new Promise((resolve,reject)=>{
    if(!file) return resolve('');
    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result||''));
    reader.onerror=()=>reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}


// ===== LINKS =====
function renderLinks(){
  const el=document.getElementById('link-grid');
  if(!el)return;
  const cats=[...new Set(db.link.map(l=>l.kat))];
  el.innerHTML=cats.map(cat=>`<div class="link-category"><h3>${cat}</h3><div class="link-cards">${db.link.filter(l=>l.kat===cat).map(l=>`<div class="link-card" onclick="window.open('${l.url}','_blank')"><div class="link-card-icon">${l.icon}</div><div class="link-card-name">${l.nama}</div><div class="link-card-desc">${l.desc}</div><div class="link-card-btn">Kunjungi →</div></div>`).join('')}</div></div>`).join('');
}

// ===== PERPUS =====
function openPerpus(){
  const url=document.getElementById('set-perpus-url')?.value||db.perpus.url;
  window.open(url,'_blank');
}

// ===== PRESTASI =====
function renderPrestasi(){
  const el=document.getElementById('prestasi-list');
  if(!el)return;
  el.innerHTML=db.prestasi.map(p=>`<div class="prestasi-item"><span class="prestasi-medal">${p.medal}</span><div class="prestasi-info"><h4>${p.judul}</h4><p>Tahun ${p.tahun}</p></div></div>`).join('');
}

// ===== FAQ =====
function toggleFaq(el){el.parentElement.classList.toggle('open');}

// ===== PROFIL TABS =====
function switchProfilTab(btn,id){
  document.querySelectorAll('.profil-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.profil-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  const el=document.getElementById('profil-'+id);
  if(el)el.classList.add('active');
}

// ===== PAGINATION =====
function renderPagination(containerId,total,current,cb){
  const el=document.getElementById(containerId);
  if(!el||total<=1){if(el)el.innerHTML='';return;}
  let html='';
  if(current>1)html+=`<button class="page-btn" onclick="(${cb})(${current-1})">‹</button>`;
  for(let i=1;i<=total;i++)html+=`<button class="page-btn${i===current?' active':''}" onclick="(${cb})(${i})">${i}</button>`;
  if(current<total)html+=`<button class="page-btn" onclick="(${cb})(${current+1})">›</button>`;
  el.innerHTML=html;
}

// ===== ADMIN =====
function openAdmin(){document.getElementById('main-content').style.display='none';document.getElementById('admin-panel').classList.add('active');document.getElementById('navbar').style.display='none';document.querySelector('footer').style.display='none';}
function closeAdmin(){document.getElementById('main-content').style.display='';document.getElementById('admin-panel').classList.remove('active');document.getElementById('navbar').style.display='';document.querySelector('footer').style.display='';showPage('beranda');}

function doLogin(){
  const u=document.getElementById('login-user').value;
  const p=document.getElementById('login-pass').value;
  if(u==='admin'&&p==='admin123'){
    document.getElementById('admin-login').style.display='none';
    document.getElementById('admin-dashboard').style.display='block';
    updateAdminStats();renderAdminTables();
  }else{document.getElementById('login-error').classList.add('show');}
}
function logout(){document.getElementById('admin-login').style.display='';document.getElementById('admin-dashboard').style.display='none';document.getElementById('login-error').classList.remove('show');}
function switchAdmin(el,id){
  document.querySelectorAll('.admin-nav-link').forEach(l=>l.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.admin-content').forEach(c=>c.classList.remove('active'));
  const target=document.getElementById(id);
  if(target){target.classList.add('active');}
  document.getElementById('admin-page-title').textContent=el.textContent.trim();
  renderAdminTables();
}
function updateAdminStats(){
  document.getElementById('stat-berita').textContent=db.berita.length;
  document.getElementById('stat-guru').textContent=db.guru.length;
  document.getElementById('stat-ekskul').textContent=db.ekskul.length;
  document.getElementById('stat-game').textContent=db.game.length;
  document.getElementById('stat-galeri').textContent=db.galeri.length;
  document.getElementById('stat-link').textContent=db.link.length;
  document.getElementById('stat-ppdb').textContent=db.ppdb.length;
  const ppdbCount=document.getElementById('ppdb-count');
  if(ppdbCount)ppdbCount.textContent=db.ppdb.length;
}
function renderAdminTables(){
  // Berita table
  const tb=document.getElementById('tabel-berita');
  if(tb)tb.innerHTML=db.berita.map((b,i)=>`<tr><td>${i+1}</td><td>${b.judul}</td><td><span class="badge badge-blue">${b.kat}</span></td><td>${formatDate(b.tgl)}</td><td><span class="badge badge-green">${b.status}</span></td><td><div class="admin-actions"><button class="btn-admin btn-edit" onclick="openAdminModal('berita',${b.id})">Edit</button><button class="btn-admin btn-delete" onclick="deleteItem('berita',${b.id})">Hapus</button></div></td></tr>`).join('');
  // Guru table
  const tg=document.getElementById('tabel-guru');
  if(tg)tg.innerHTML=db.guru.map((g,i)=>`<tr><td>${i+1}</td><td>${g.nama}</td><td>${g.mapel}</td><td style="font-size:0.8rem">${g.email}</td><td><div class="admin-actions"><button class="btn-admin btn-edit" onclick="openAdminModal('guru',${g.id})">Edit</button><button class="btn-admin btn-delete" onclick="deleteItem('guru',${g.id})">Hapus</button></div></td></tr>`).join('');
  // Game table
  const tgm=document.getElementById('tabel-game');
  if(tgm)tgm.innerHTML=db.game.map((g,i)=>`<tr><td>${i+1}</td><td>${g.nama}</td><td><span class="badge badge-blue">${g.platform}</span></td><td>${g.kat}</td><td style="font-size:0.8rem;max-width:150px;overflow:hidden;text-overflow:ellipsis">${g.url}</td><td><div class="admin-actions"><button class="btn-admin btn-edit" onclick="openAdminModal('game',${g.id})">Edit</button><button class="btn-admin btn-delete" onclick="deleteItem('game',${g.id})">Hapus</button></div></td></tr>`).join('');
  // Ekskul table
  const te=document.getElementById('tabel-ekskul');
  if(te)te.innerHTML=db.ekskul.map((e,i)=>`<tr><td>${i+1}</td><td>${e.nama}</td><td>${e.pembina}</td><td>${e.jadwal}</td><td><div class="admin-actions"><button class="btn-admin btn-edit" onclick="openAdminModal('ekskul',${e.id})">Edit</button><button class="btn-admin btn-delete" onclick="deleteItem('ekskul',${e.id})">Hapus</button></div></td></tr>`).join('');
  // Galeri table
  const tgl=document.getElementById('tabel-galeri');
  if(tgl)tgl.innerHTML=db.galeri.map((g,i)=>`<tr><td>${i+1}</td><td>${g.judul}</td><td>${g.kat}</td><td><span class="badge ${g.tipe==='video'?'badge-yellow':'badge-green'}">${g.tipe}</span></td><td><div class="admin-actions"><button class="btn-admin btn-edit" onclick="openAdminModal('galeri',${g.id})">Edit</button><button class="btn-admin btn-delete" onclick="deleteItem('galeri',${g.id})">Hapus</button></div></td></tr>`).join('');
  // Link table
  const tl=document.getElementById('tabel-link');
  if(tl)tl.innerHTML=db.link.map((l,i)=>`<tr><td>${i+1}</td><td>${l.nama}</td><td>${l.kat}</td><td style="font-size:0.8rem">${l.url}</td><td><div class="admin-actions"><button class="btn-admin btn-edit" onclick="openAdminModal('link',${l.id})">Edit</button><button class="btn-admin btn-delete" onclick="deleteItem('link',${l.id})">Hapus</button></div></td></tr>`).join('');
  // PPDB table
  const tp=document.getElementById('tabel-ppdb');
  if(tp)tp.innerHTML=db.ppdb.length?db.ppdb.map(p=>`<tr><td>${p.no}</td><td>${p.nama}</td><td>${p.nisn}</td><td>${p.tgl}</td><td>${p.telp}</td><td><span class="badge badge-yellow">${p.status}</span></td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;color:#64748B;padding:2rem">Belum ada data pendaftar</td></tr>';
}

// Admin Modal
let currentModalType='';
let currentModalId=null;
function openAdminModal(type,id){
  currentModalType=type;currentModalId=id;
  const modal=document.getElementById('adminModal');
  const body=document.getElementById('modal-body');
  const title=document.getElementById('modal-title');
  const isEdit=id!==null;
  title.textContent=isEdit?`Edit ${type.charAt(0).toUpperCase()+type.slice(1)}`:`Tambah ${type.charAt(0).toUpperCase()+type.slice(1)}`;
  const item=isEdit?db[type==='berita'?'berita':type==='guru'?'guru':type].find?.(x=>x.id===id):null;
  let html='';
  if(type==='berita'){
    html=`<div class="form-group"><label class="form-label">Judul Berita</label><input class="form-control" id="m-judul" value="${isEdit?(item?.judul||''):''}"></div><div class="form-group"><label class="form-label">Kategori</label><select class="form-control" id="m-kat"><option>Pengumuman</option><option>Prestasi</option><option>Kegiatan</option><option>Pendidikan</option><option>Olahraga</option></select></div><div class="form-group"><label class="form-label">Tanggal</label><input type="date" class="form-control" id="m-tgl" value="${isEdit?(item?.tgl||''):''}"></div><div class="form-group"><label class="form-label">Isi Berita</label><textarea class="form-control" rows="4" id="m-isi">${isEdit?(item?.isi||''):''}</textarea></div>`;


  }else if(type==='game'){
    // Support struktur baru: soalLinksByKelas{ '7'|'8'|'9' }
    // Support struktur lama: item.soalLinks => dipetakan ke kelas 7
    const soalLinksByKelas = (isEdit && item?.soalLinksByKelas) ? item.soalLinksByKelas : null;
    const legacySoalLinks = (isEdit && item?.soalLinks) ? item.soalLinks : [];

    const rawFromLinks = (linksArr) => (Array.isArray(linksArr) ? linksArr : [])
      .map(s => `${s.nama||''}|${s.url||''}${s.desc?`|${s.desc}`:''}`)
      .join('\n');

    const kelas7Links = (soalLinksByKelas && Array.isArray(soalLinksByKelas['7'])) ? soalLinksByKelas['7'] : legacySoalLinks;
    const kelas8Links = (soalLinksByKelas && Array.isArray(soalLinksByKelas['8'])) ? soalLinksByKelas['8'] : [];
    const kelas9Links = (soalLinksByKelas && Array.isArray(soalLinksByKelas['9'])) ? soalLinksByKelas['9'] : [];

    html=`<div class="form-group"><label class="form-label">Nama Game</label><input class="form-control" id="m-nama" value="${isEdit?(item?.nama||''):''}"></div><div class="form-group"><label class="form-label">Platform</label><select class="form-control" id="m-platform"><option>Wordwall</option><option>Quizizz</option><option>Kahoot</option><option>Educandy</option><option>Bamboozle</option><option>Lainnya</option></select></div><div class="form-group"><label class="form-label">Kategori</label><select class="form-control" id="m-kat"><option>Matematika</option><option>IPA</option><option>Bahasa</option><option>IPS</option><option>Umum</option></select></div><div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-control" rows="2" id="m-desc">${isEdit?(item?.desc||''):''}</textarea></div>

    <div class="form-group">
      <label class="form-label">Daftar Link Soal per Kelas</label>
      <div style="display:grid;grid-template-columns:1fr;gap:0.85rem">
        <div>
          <strong style="display:block;margin-bottom:0.35rem">Kelas 7</strong>
          <textarea class="form-control" rows="3" id="m-soal-links-7" placeholder="Format: Nama Soal|URL|Opsional Deskripsi">${rawFromLinks(kelas7Links)}</textarea>
        </div>
        <div>
          <strong style="display:block;margin-bottom:0.35rem">Kelas 8</strong>
          <textarea class="form-control" rows="3" id="m-soal-links-8" placeholder="Format: Nama Soal|URL|Opsional Deskripsi">${rawFromLinks(kelas8Links)}</textarea>
        </div>
        <div>
          <strong style="display:block;margin-bottom:0.35rem">Kelas 9</strong>
          <textarea class="form-control" rows="3" id="m-soal-links-9" placeholder="Format: Nama Soal|URL|Opsional Deskripsi">${rawFromLinks(kelas9Links)}</textarea>
        </div>
      </div>
      <div style="font-size:0.78rem;color:#64748B;margin-top:0.35rem">Isi per baris: Nama|URL|Deskripsi (opsional). Contoh: Soal PG 1|https://...|Pembahasan/opsional</div>
    </div>`;
  }else if(type==='link'){
    html=`<div class="form-group"><label class="form-label">Nama Layanan</label><input class="form-control" id="m-nama" value="${isEdit?(item?.nama||''):''}"></div><div class="form-group"><label class="form-label">Kategori</label><input class="form-control" id="m-kat" value="${isEdit?(item?.kat||''):''}"></div><div class="form-group"><label class="form-label">Icon (emoji)</label><input class="form-control" id="m-icon" value="${isEdit?(item?.icon||''):''}"></div><div class="form-group"><label class="form-label">URL</label><input type="url" class="form-control" id="m-url" value="${isEdit?(item?.url||''):''}"></div><div class="form-group"><label class="form-label">Deskripsi</label><input class="form-control" id="m-desc" value="${isEdit?(item?.desc||''):''}"></div>`;
  }else if(type==='galeri'){
    const currentKat = isEdit ? (item?.kat || 'Kegiatan Belajar') : 'Kegiatan Belajar';
    const currentTipe = isEdit ? (item?.tipe || 'foto') : 'foto';
    const currentEmoji = isEdit ? (item?.emoji || '🖼️') : '🖼️';
    const currentImg = isEdit ? (item?.img || '') : '';

    html=`
      <div class="form-group"><label class="form-label">Judul</label><input class="form-control" id="m-judul" value="${isEdit?(item?.judul||''):''}"></div>
      <div class="form-group"><label class="form-label">Kategori</label>
        <select class="form-control" id="m-kat">
          <option ${currentKat==='Kegiatan Belajar'?'selected':''}>Kegiatan Belajar</option>
          <option ${currentKat==='Ekstrakurikuler'?'selected':''}>Ekstrakurikuler</option>
          <option ${currentKat==='Perlombaan'?'selected':''}>Perlombaan</option>
          <option ${currentKat==='Upacara'?'selected':''}>Upacara</option>
          <option ${currentKat==='Kunjungan Edukasi'?'selected':''}>Kunjungan Edukasi</option>
          <option ${currentKat==='Acara Sekolah'?'selected':''}>Acara Sekolah</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Tipe</label>
        <select class="form-control" id="m-tipe">
          <option value="foto" ${currentTipe==='foto'?'selected':''}>foto</option>
          <option value="video" ${currentTipe==='video'?'selected':''}>video</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Emoji Ikon</label><input class="form-control" id="m-emoji" value="${currentEmoji}"></div>

      <div class="form-group">
        <label class="form-label">Upload Gambar (opsional untuk edit)</label>
        <input type="file" class="form-control" id="m-img" accept="image/*" onchange="(function(){})()">
        <div id="m-img-preview" style="margin-top:0.75rem;display:${currentImg?'block':'none'};">
          <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem">Preview saat ini:</div>
          <img src="${currentImg}" alt="Preview Galeri" style="max-width:100%;max-height:220px;border-radius:var(--radius);border:1px solid var(--border);object-fit:cover;display:block;" />
          <button class="btn btn-outline btn-sm" style="margin-top:0.75rem" onclick="clearGaleriImgPreview()">Hapus preview (tidak menghapus data)</button>
        </div>
      </div>
    `;
  }else if(type==='ekskul'){

    html=`<div class="form-group"><label class="form-label">Nama Ekskul</label><input class="form-control" id="m-nama" value="${isEdit?(item?.nama||''):''}"></div><div class="form-group"><label class="form-label">Pembina</label><input class="form-control" id="m-pembina" value="${isEdit?(item?.pembina||''):''}"></div><div class="form-group"><label class="form-label">Jadwal</label><input class="form-control" id="m-jadwal" value="${isEdit?(item?.jadwal||''):''}"></div><div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-control" rows="3" id="m-desc">${isEdit?(item?.desc||''):''}</textarea></div>`;
  }

  html+=`<div style="display:flex;gap:0.75rem;margin-top:1.5rem"><button class="btn btn-primary" onclick="saveAdminModal()">💾 Simpan</button><button class="btn btn-outline" onclick="closeAdminModal()">Batal</button></div>`;
  body.innerHTML=html;
  modal.classList.add('open');
}

function closeAdminModal(){document.getElementById('adminModal').classList.remove('open');}

function parseSoalLinks(raw){
  if(!raw || !raw.trim()) return [];
  const lines=raw.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const out=[];
  for(const line of lines){
    const parts=line.split('|');
    if(parts.length<2) continue;
    const nama=parts[0].trim();
    const url=parts[1].trim();
    const desc=(parts.slice(2).join('|')||'').trim();
    if(!url) continue;
    out.push({nama:nama||`Soal ${out.length+1}`,url,desc:desc||''});
  }
  return out;
}

async function saveAdminModal(){
  const type=currentModalType;const id=currentModalId;const isEdit=id!==null;
  const newId=isEdit?id:(Math.max(...(db[type]?.map(x=>x.id)||[0]))+1);
  let obj={id:newId};
  const g=i=>document.getElementById(i)?.value||'';

  if(type==='berita')obj={...obj,judul:g('m-judul'),kat:g('m-kat'),tgl:g('m-tgl')||new Date().toISOString().split('T')[0],isi:g('m-isi'),status:'Aktif',emoji:'📰'};
  else if(type==='guru')obj={...obj,nama:g('m-nama'),mapel:g('m-mapel'),emoji:'👩‍🏫'};
  if(type==='game'){
    const kelas7Raw=g('m-soal-links-7');
    const kelas8Raw=g('m-soal-links-8');
    const kelas9Raw=g('m-soal-links-9');

    const soalLinksByKelas={
      '7': parseSoalLinks(kelas7Raw),
      '8': parseSoalLinks(kelas8Raw),
      '9': parseSoalLinks(kelas9Raw)
    };

    obj={
      ...obj,
      nama:g('m-nama'),
      platform:g('m-platform'),
      kat:g('m-kat'),
      desc:g('m-desc'),
      soalLinksByKelas,
      emoji:'🎮'
    };
  }

  else if(type==='link')obj={...obj,nama:g('m-nama'),kat:g('m-kat'),icon:g('m-icon'),url:g('m-url'),desc:g('m-desc')};
  else if(type==='galeri'){
    const itemExisting = isEdit ? (db.galeri.find(x=>x.id===id) || {}) : {};

    obj={...obj,judul:g('m-judul'),kat:g('m-kat'),tipe:g('m-tipe'),emoji:g('m-emoji'),tinggi:'short'};

    // gambar base64 (opsional)
    const fileInput=document.getElementById('m-img');
    const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

    if(file){
      obj.img = await fileToDataURL(file);
    }else if(isEdit){
      // pertahankan gambar lama saat tidak upload ulang
      if(itemExisting.img) obj.img = itemExisting.img;
    }
  }
  else if(type==='ekskul')obj={...obj,nama:g('m-nama'),pembina:g('m-pembina'),jadwal:g('m-jadwal'),desc:g('m-desc'),emoji:'⭐',warna:'#2563EB',prestasi:''};

  if(isEdit){const idx=db[type].findIndex(x=>x.id===id);if(idx!==-1)db[type][idx]={...db[type][idx],...obj};}
  else db[type].push(obj);

  closeAdminModal();
  updateAdminStats();
  renderAdminTables();
  renderBeritaHome();renderGames();renderEkskul();renderGuru();renderGaleri();renderLinks();renderProfilGuru();
  alert('Data berhasil disimpan!');
}


function deleteItem(type,id){
  if(!confirm('Hapus data ini?'))return;
  db[type]=db[type].filter(x=>x.id!==id);
  updateAdminStats();renderAdminTables();
  renderBeritaHome();renderGames();renderEkskul();renderGuru();renderGaleri();renderLinks();renderProfilGuru();
}

function savePerpusSettings(){
  db.perpus.nama=document.getElementById('set-perpus-nama').value||db.perpus.nama;
  db.perpus.desc=document.getElementById('set-perpus-desc').value||db.perpus.desc;
  db.perpus.url=document.getElementById('set-perpus-url').value||db.perpus.url;
  alert('Pengaturan perpustakaan berhasil disimpan!');
}

function saveSettings(){alert('Pengaturan website berhasil disimpan!');}

// ===== PPDB ADMIN (hapus data ppdb) =====
function deleteAllPPDB(){
  if(!db.ppdb || !Array.isArray(db.ppdb)) return;
  if(!confirm('Hapus semua data PPDB?')) return;
  db.ppdb = [];
  updateAdminStats();
  renderAdminTables();
  alert('Semua data PPDB berhasil dihapus!');
}


