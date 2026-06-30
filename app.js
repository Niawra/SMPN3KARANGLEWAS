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

function formatDate(d){const [y,m,da]=d.split('-');const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];return `${da} ${months[parseInt(m)-1]} ${y}`;}

// ===== GURU =====
let guruPage=1;const guruPerPage=8;
function renderGuru(){
  const search=document.getElementById('guruSearch')?.value.toLowerCase()||'';
  const mapel=document.getElementById('guruMapel')?.value||'';
  let list=db.guru.filter(g=>(!search||g.nama.toLowerCase().includes(search))&&(!mapel||g.mapel===mapel));
  const pages=Math.ceil(list.length/guruPerPage);
  const slice=list.slice((guruPage-1)*guruPerPage,guruPage*guruPerPage);
  const grid=document.getElementById('guru-grid');
  if(grid) grid.innerHTML=slice.map(g=>`<div class="guru-card"><div class="guru-photo">${g.emoji}</div><div class="guru-name">${g.nama}</div><div class="guru-mapel">${g.mapel}</div><div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.25rem">✉️ ${g.email}</div></div>`).join('');
  renderPagination('guru-pagination',pages,guruPage,p=>{guruPage=p;renderGuru();});
}
function filterGuru(){guruPage=1;renderGuru();}
function renderProfilGuru(){
  const g=document.getElementById('guru-profil-grid');
  if(g) g.innerHTML=db.guru.map(gu=>`<div class="guru-card"><div class="guru-photo">${gu.emoji}</div></div>`).join('');
}

// ===== GAME =====
let gamePage=1;const gamePerPage=8;
function renderGames(){
  const search=document.getElementById('gameSearch')?.value.toLowerCase()||'';
  const kat=document.getElementById('gameKat')?.value||'';
  let list=db.game.filter(g=>(!search||g.nama.toLowerCase().includes(search)||g.desc.toLowerCase().includes(search))&&(!kat||g.kat===kat));
  const pages=Math.ceil(list.length/gamePerPage);
  const slice=list.slice((gamePage-1)*gamePerPage,gamePage*gamePerPage);
  const grid=document.getElementById('game-grid');
  if(grid) grid.innerHTML=slice.map(g=>`<div class="game-card"><div class="game-thumb">${g.emoji}<span class="game-platform">${g.platform}</span></div><div class="game-body"><div class="game-cat">${g.kat}</div><div class="game-title">${g.nama}</div><div class="game-desc">${g.desc}</div><a href="${g.url}" target="_blank" class="btn btn-primary btn-sm btn-full">▶ Mainkan</a></div></div>`).join('');
  renderPagination('game-pagination',pages,gamePage,p=>{gamePage=p;renderGames();});
}
function filterGames(){gamePage=1;renderGames();}

// ===== EKSKUL =====
function renderEkskul(){
  const grid=document.getElementById('ekskul-grid');
  if(!grid)return;
  grid.innerHTML=db.ekskul.map(e=>`<div class="ekskul-card" onclick="openEkskulModal(${e.id})"><div class="ekskul-img" style="background:linear-gradient(135deg,${e.warna}22,${e.warna}44)">${e.emoji}<span class="ekskul-badge">Ekskul</span></div><div class="ekskul-body"><div class="ekskul-title">${e.nama}</div><div class="ekskul-meta"><span>⏰ ${e.jadwal.split(',')[0]}</span><span>👤 ${e.pembina.split(',')[0]}</span></div></div></div>`).join('');
}
function openEkskulModal(id){
  const e=db.ekskul.find(x=>x.id===id);
  if(!e)return;
  document.getElementById('ekskul-modal-content').innerHTML=`<div class="ekskul-modal-header" style="background:linear-gradient(135deg,${e.warna}44,${e.warna}88)">${e.emoji}<button class="ekskul-modal-close" onclick="closeEkskulModal()">✕</button></div><div class="ekskul-modal-body"><h2 style="font-family:'Poppins',sans-serif;font-weight:700;color:var(--text);margin-bottom:0.5rem">${e.nama}</h2><p style="color:var(--text-muted);line-height:1.7;margin-bottom:1.5rem">${e.desc}</p><div class="ekskul-detail-grid"><div class="ekskul-detail-item"><label>Pembina</label><span>${e.pembina}</span></div><div class="ekskul-detail-item"><label>Jadwal Latihan</label><span>${e.jadwal}</span></div><div class="ekskul-detail-item"><label>Prestasi Terkini</label><span>${e.prestasi}</span></div></div></div>`;
  document.getElementById('ekskul-modal').classList.add('open');
}
function closeEkskulModal(){document.getElementById('ekskul-modal').classList.remove('open');}

// ===== GALERI =====
let galeriFilter='';
function renderGaleri(){
  const grid=document.getElementById('galeri-grid');
  if(!grid)return;
  let list=db.galeri.filter(g=>!galeriFilter||g.kat===galeriFilter);
  grid.innerHTML=list.map(g=>`<div class="galeri-item" onclick="openLightbox('${g.emoji}','${g.judul} - ${g.kat}')"><div class="galeri-thumb ${g.tinggi}" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE);font-size:3rem;display:flex;align-items:center;justify-content:center;position:relative">${g.emoji}${g.tipe==='video'?'<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);font-size:2rem;color:white">▶</span>':''}</div></div>`).join('');
}
function filterGaleri(btn,kat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');galeriFilter=kat;renderGaleri();
}
function openLightbox(content,caption){
  document.getElementById('lightbox-img').innerHTML=`<div style="width:400px;height:300px;display:flex;align-items:center;justify-content:center;font-size:8rem;border-radius:var(--radius)">${content}</div>`;
  document.getElementById('lightbox-caption').textContent=caption;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');}

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
    html=`<div class="form-group"><label class="form-label">Nama Game</label><input class="form-control" id="m-nama" value="${isEdit?(item?.nama||''):''}"></div><div class="form-group"><label class="form-label">Platform</label><select class="form-control" id="m-platform"><option>Wordwall</option><option>Quizizz</option><option>Kahoot</option><option>Educandy</option><option>Bamboozle</option><option>Lainnya</option></select></div><div class="form-group"><label class="form-label">Kategori</label><select class="form-control" id="m-kat"><option>Matematika</option><option>IPA</option><option>Bahasa</option><option>IPS</option><option>Umum</option></select></div><div class="form-group"><label class="form-label">URL Game</label><input type="url" class="form-control" id="m-url" value="${isEdit?(item?.url||''):''}"></div><div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-control" rows="2" id="m-desc">${isEdit?(item?.desc||''):''}</textarea></div>`;
  }else if(type==='link'){
    html=`<div class="form-group"><label class="form-label">Nama Layanan</label><input class="form-control" id="m-nama" value="${isEdit?(item?.nama||''):''}"></div><div class="form-group"><label class="form-label">Kategori</label><input class="form-control" id="m-kat" value="${isEdit?(item?.kat||''):''}"></div><div class="form-group"><label class="form-label">Icon (emoji)</label><input class="form-control" id="m-icon" value="${isEdit?(item?.icon||''):''}"></div><div class="form-group"><label class="form-label">URL</label><input type="url" class="form-control" id="m-url" value="${isEdit?(item?.url||''):''}"></div><div class="form-group"><label class="form-label">Deskripsi</label><input class="form-control" id="m-desc" value="${isEdit?(item?.desc||''):''}"></div>`;
  }else if(type==='galeri'){
    html=`<div class="form-group"><label class="form-label">Judul</label><input class="form-control" id="m-judul" value="${isEdit?(item?.judul||''):''}"></div><div class="form-group"><label class="form-label">Kategori</label><select class="form-control" id="m-kat"><option>Kegiatan Belajar</option><option>Ekstrakurikuler</option><option>Perlombaan</option><option>Upacara</option><option>Kunjungan Edukasi</option><option>Acara Sekolah</option></select></div><div class="form-group"><label class="form-label">Tipe</label><select class="form-control" id="m-tipe"><option>foto</option><option>video</option></select></div><div class="form-group"><label class="form-label">Emoji Ikon</label><input class="form-control" id="m-emoji" value="${isEdit?(item?.emoji||'🖼️'):'🖼️'}"></div>`;
  }else if(type==='ekskul'){
    html=`<div class="form-group"><label class="form-label">Nama Ekskul</label><input class="form-control" id="m-nama" value="${isEdit?(item?.nama||''):''}"></div><div class="form-group"><label class="form-label">Pembina</label><input class="form-control" id="m-pembina" value="${isEdit?(item?.pembina||''):''}"></div><div class="form-group"><label class="form-label">Jadwal</label><input class="form-control" id="m-jadwal" value="${isEdit?(item?.jadwal||''):''}"></div><div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-control" rows="3" id="m-desc">${isEdit?(item?.desc||''):''}</textarea></div>`;
  }
  html+=`<div style="display:flex;gap:0.75rem;margin-top:1.5rem"><button class="btn btn-primary" onclick="saveAdminModal()">💾 Simpan</button><button class="btn btn-outline" onclick="closeAdminModal()">Batal</button></div>`;
  body.innerHTML=html;modal.classList.add('open');
}
function closeAdminModal(){document.getElementById('adminModal').classList.remove('open');}
function saveAdminModal(){
  const type=currentModalType;const id=currentModalId;const isEdit=id!==null;
  const newId=isEdit?id:(Math.max(...(db[type]?.map(x=>x.id)||[0]))+1);
  let obj={id:newId};
  const g=i=>document.getElementById(i)?.value||'';
  if(type==='berita')obj={...obj,judul:g('m-judul'),kat:g('m-kat'),tgl:g('m-tgl')||new Date().toISOString().split('T')[0],isi:g('m-isi'),status:'Aktif',emoji:'📰'};
  else if(type==='guru')obj={...obj,nama:g('m-nama'),mapel:g('m-mapel'),email:g('m-email'),emoji:'👩‍🏫'};
  else if(type==='game')obj={...obj,nama:g('m-nama'),platform:g('m-platform'),kat:g('m-kat'),url:g('m-url'),desc:g('m-desc'),emoji:'🎮'};
  else if(type==='link')obj={...obj,nama:g('m-nama'),kat:g('m-kat'),icon:g('m-icon'),url:g('m-url'),desc:g('m-desc')};
  else if(type==='galeri')obj={...obj,judul:g('m-judul'),kat:g('m-kat'),tipe:g('m-tipe'),emoji:g('m-emoji'),tinggi:'short'};
  else if(type==='ekskul')obj={...obj,nama:g('m-nama'),pembina:g('m-pembina'),jadwal:g('m-jadwal'),desc:g('m-desc'),emoji:'⭐',warna:'#2563EB',prestasi:''};
  if(isEdit){const idx=db[type].findIndex(x=>x.id===id);if(idx!==-1)db[type][idx]={...db[type][idx],...obj};}
  else db[type].push(obj);
  closeAdminModal();updateAdminStats();renderAdminTables();
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
 

