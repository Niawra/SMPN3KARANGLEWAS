// ===== DATA STORE =====
const db = {
  berita: [
    {id:1,judul:'Persiapan PPDB Tahun Ajaran 2025/2026',kat:'Pengumuman',tgl:'2025-05-15',isi:'SMP Negeri 3 Karanglewas membuka pendaftaran siswa baru untuk tahun ajaran 2025/2026. Daftarkan putra-putri Anda sekarang melalui PPDB Online.',status:'Aktif',emoji:'📢'},
    {id:2,judul:'Juara 1 Olimpiade Matematika Tingkat Kabupaten',kat:'Prestasi',tgl:'2025-04-20',isi:'Siswa kami berhasil meraih juara 1 dalam ajang Olimpiade Matematika tingkat Kabupaten Banyumas. Bangga dan terus semangat!',status:'Aktif',emoji:'🏆'},
    {id:3,judul:'Kegiatan Pesantren Ramadan 1446 H',kat:'Kegiatan',tgl:'2025-03-10',isi:'SMP Negeri 3 Karanglewas mengadakan kegiatan pesantren Ramadan selama 3 hari sebagai upaya penguatan karakter dan spiritual siswa.',status:'Aktif',emoji:'🕌'},
    {id:4,judul:'Workshop Digital Learning untuk Guru',kat:'Pendidikan',tgl:'2025-02-25',isi:'Dalam rangka meningkatkan kompetensi digital, sekolah mengadakan workshop pemanfaatan teknologi dalam pembelajaran modern.',status:'Aktif',emoji:'💻'},
    {id:5,judul:'Tim Voli Putra Juara 2 Tingkat Kecamatan',kat:'Olahraga',tgl:'2025-01-30',isi:'Tim voli putra SMPN 3 Karanglewas berhasil meraih posisi runner-up dalam turnamen voli antar SMP se-Kecamatan Karanglewas.',status:'Aktif',emoji:'🏐'}
  ],
  guru: [
    {id:1,nama:'Drs. Ahmad Fauzi, M.Pd.',mapel:'Matematika',jabatan:'Kepala Sekolah',email:'ahmad.fauzi@smpn3karanglewas.sch.id',emoji:'👨‍💼'},
    {id:2,nama:'Sri Wahyuni, S.Pd.',mapel:'Bahasa Indonesia',jabatan:'Waka Kurikulum',email:'sri.wahyuni@smpn3karanglewas.sch.id',emoji:'👩‍🏫'},
    {id:3,nama:'Bambang Susanto, S.Pd.',mapel:'IPA',jabatan:'Waka Kesiswaan',email:'bambang.s@smpn3karanglewas.sch.id',emoji:'👨‍🏫'},
    {id:4,nama:'Dewi Rahayu, S.Pd.',mapel:'IPS',jabatan:'Waka Sarpras',email:'dewi.r@smpn3karanglewas.sch.id',emoji:'👩‍🏫'},
    {id:5,nama:'Rina Fitriani, S.Pd.',mapel:'Bahasa Inggris',jabatan:'Koordinator BK',email:'rina.f@smpn3karanglewas.sch.id',emoji:'👩‍🏫'},
    {id:6,nama:'Hendra Wibowo, S.Pd.',mapel:'Matematika',jabatan:'Guru',email:'hendra.w@smpn3karanglewas.sch.id',emoji:'👨‍🏫'},
    {id:7,nama:'Siti Aminah, S.Pd.I.',mapel:'Agama',jabatan:'Guru',email:'siti.a@smpn3karanglewas.sch.id',emoji:'👩‍🏫'},
    {id:8,nama:'Joko Purnomo, S.Pd.',mapel:'PJOK',jabatan:'Guru',email:'joko.p@smpn3karanglewas.sch.id',emoji:'👨‍🏫'},
    {id:9,nama:'Yanti Kusuma, S.Pd.',mapel:'Seni Budaya',jabatan:'Guru',email:'yanti.k@smpn3karanglewas.sch.id',emoji:'👩‍🏫'},
    {id:10,nama:'Agus Salim, S.Kom.',mapel:'TIK',jabatan:'Guru',email:'agus.s@smpn3karanglewas.sch.id',emoji:'👨‍🏫'},
    {id:11,nama:'Nurul Hidayah, S.Pd.',mapel:'PPKn',jabatan:'Guru',email:'nurul.h@smpn3karanglewas.sch.id',emoji:'👩‍🏫'},
    {id:12,nama:'Wahyu Santoso, S.Pd.',mapel:'IPA',jabatan:'Guru',email:'wahyu.s@smpn3karanglewas.sch.id',emoji:'👨‍🏫'}
  ],
  game: [
    {id:1,nama:'Matematika',kat:'Matematika',emoji:'🎯'},
    {id:2,nama:'IPA',kat:'IPA',emoji:'🔬'},
    {id:3,nama:'Bahasa Indonesia',kat:'Bahasa',emoji:'📝'},
    {id:4,nama:'Pendidikan Agama',kat:'Bahasa',emoji:'🍬'},
    {id:5,nama:'IPS Quiz',kat:'IPS',emoji:'🌍'},
    {id:6,nama:'PPKn',kat:'Umum',emoji:'🏛️'},
    {id:7,nama:'Bahasa Inggris',emoji:'🗣️'},
    {id:8,nama:'Informatika',kat:'IPS',emoji:'📜'}
  ],
  ekskul: [
    {id:1,nama:'Pramuka',emoji:'⚜️',warna:'#F59E0B',pembina:'Kak Agus Santoso, S.Pd.',jadwal:'Jumat, 14.00 - 16.00 WIB',desc:'Kegiatan kepramukaan sebagai ekskul wajib yang membentuk karakter, kedisiplinan, dan jiwa sosial peserta didik.',prestasi:'Juara 1 Jambore Kab. Banyumas 2024'},
    {id:2,nama:'Bola Voli',emoji:'🏐',warna:'#2563EB',pembina:'Bpk. Joko Purnomo, S.Pd.',jadwal:'Senin & Rabu, 15.30 - 17.30 WIB',desc:'Ekskul voli aktif mengikuti berbagai turnamen dan melahirkan atlet-atlet berbakat di tingkat daerah.',prestasi:'Juara 2 Turnamen Voli Kecamatan 2025'},
    {id:3,nama:'PMR',emoji:'🏥',warna:'#EF4444',pembina:'Ibu Rina Fitriani, S.Pd.',jadwal:'Sabtu, 08.00 - 10.00 WIB',desc:'Palang Merah Remaja yang mengajarkan pertolongan pertama, kepedulian sosial, dan kemanusiaan.',prestasi:'Terbaik PMR Kabupaten 2024'},
    {id:4,nama:'Sepak Bola',emoji:'⚽',warna:'#16A34A',pembina:'Bpk. Wahyu Santoso, S.Pd.',jadwal:'Selasa & Kamis, 15.30 - 17.30 WIB',desc:'Tim sepak bola sekolah yang aktif berlatih dan mengikuti kompetisi antar sekolah tingkat kecamatan dan kabupaten.',prestasi:'Semifinalis Liga Pelajar Banyumas 2024'},
    {id:5,nama:'Seni Tari',emoji:'💃',warna:'#9333EA',pembina:'Ibu Yanti Kusuma, S.Pd.',jadwal:'Rabu & Jumat, 14.00 - 16.00 WIB',desc:'Ekstrakurikuler seni tari melatih kemampuan seni dan budaya siswa melalui tari tradisional dan kreasi modern.',prestasi:'Juara 1 Festival Seni Kecamatan 2024'},
    {id:6,nama:'Hadroh',emoji:'🎵',warna:'#EA580C',pembina:'Bpk. Samsul Bahri, S.Pd.I.',jadwal:'Sabtu, 13.00 - 15.00 WIB',desc:'Kesenian hadroh sebagai wujud pelestarian budaya Islam dan pengembangan bakat seni Islami peserta didik.',prestasi:'Juara 2 Festival Hadroh Kabupaten 2024'}
  ],
  galeri: [
    {id:1,judul:'Upacara Bendera Senin',kat:'Upacara',tipe:'foto',emoji:'🇮🇩',tinggi:'tall'},
    {id:2,judul:'Olimpiade Matematika',kat:'Perlombaan',tipe:'foto',emoji:'🏆',tinggi:'short'},
    {id:3,judul:'Kegiatan Pramuka',kat:'Ekstrakurikuler',tipe:'foto',emoji:'⚜️',tinggi:'short'},
    {id:4,judul:'Perpisahan Kelas IX',kat:'Acara Sekolah',tipe:'foto',emoji:'🎓',tinggi:'tall'},
    {id:5,judul:'Latihan Seni Tari',kat:'Ekstrakurikuler',tipe:'foto',emoji:'💃',tinggi:'short'},
    {id:6,judul:'Pelajaran di Lab IPA',kat:'Kegiatan Belajar',tipe:'foto',emoji:'🔬',tinggi:'short'},
    {id:7,judul:'Turnamen Voli Antar Kelas',kat:'Perlombaan',tipe:'foto',emoji:'🏐',tinggi:'tall'},
    {id:8,judul:'Workshop Digitalisasi',kat:'Kegiatan Belajar',tipe:'foto',emoji:'💻',tinggi:'short'},
    {id:9,judul:'Festival Hadroh',kat:'Acara Sekolah',tipe:'video',emoji:'🎵',tinggi:'short'},
    {id:10,judul:'Kunjungan Edukasi',kat:'Kegiatan Belajar',tipe:'foto',emoji:'🚌',tinggi:'tall'},
    {id:11,judul:'Kegiatan PMR',kat:'Ekstrakurikuler',tipe:'foto',emoji:'🏥',tinggi:'short'},
    {id:12,judul:'Pelantikan OSIS',kat:'Acara Sekolah',tipe:'foto',emoji:'👑',tinggi:'short'}
  ],
  link: [
    {id:1,nama:'E-Learning',kat:'Akademik',icon:'💻',desc:'Platform belajar online sekolah',url:'https://elearning.smpn3karanglewas.sch.id'},
    {id:2,nama:'Google Classroom',kat:'Akademik',icon:'📚',desc:'Kelas virtual berbasis Google',url:'https://classroom.google.com'},
    {id:3,nama:'Perpustakaan Digital',kat:'Akademik',icon:'📖',desc:'Akses koleksi buku digital',url:'https://s.id/PERPUSDIGITALSMPN3KARANGLEWAS'},
    {id:4,nama:'Portal Siswa',kat:'Akademik',icon:'👨‍🎓',desc:'Akses nilai dan informasi siswa',url:'#'},
    {id:5,nama:'Portal Guru',kat:'Akademik',icon:'👩‍🏫',desc:'Portal khusus tenaga pendidik',url:'#'},
    {id:6,nama:'ANBK',kat:'Pemerintah',icon:'📋',desc:'Asesmen Nasional Berbasis Komputer',url:'https://anbk.kemdikbud.go.id'},
    {id:7,nama:'Dapodik',kat:'Pemerintah',icon:'🗂️',desc:'Data Pokok Pendidikan Kemdikbud',url:'https://dapodik.kemdikbud.go.id'},
    {id:8,nama:'Kemendikbud',kat:'Pemerintah',icon:'🏛️',desc:'Website Kementerian Pendidikan',url:'https://www.kemdikbud.go.id'},
    {id:9,nama:'Dinas Pendidikan',kat:'Pemerintah',icon:'🏢',desc:'Dinas Pendidikan Kab. Banyumas',url:'#'},
    {id:10,nama:'Alumni SMPN 3',kat:'Komunitas',icon:'🤝',desc:'Komunitas alumni sekolah',url:'#'}
  ],
  ppdb: [],
  perpus: {nama:'Perpustakaan Digital SMPN 3 Karanglewas',desc:'Akses ribuan koleksi buku, jurnal, dan referensi digital.',url:'https://s.id/PERPUSDIGITALSMPN3KARANGLEWAS'},
  prestasi: [
    {id:1,judul:'Juara 1 Olimpiade Matematika Kab. Banyumas',tahun:'2024',medal:'🥇'},
    {id:2,judul:'Juara 2 Turnamen Bola Voli Kecamatan',tahun:'2025',medal:'🥈'},
    {id:3,judul:'Juara 1 Jambore Pramuka Kab. Banyumas',tahun:'2024',medal:'🥇'},
    {id:4,judul:'Juara 1 Festival Seni Tari Kecamatan',tahun:'2024',medal:'🥇'},
    {id:5,judul:'Terbaik PMR Kabupaten Banyumas',tahun:'2024',medal:'🏆'},
    {id:6,judul:'Semifinalis Liga Pelajar Banyumas',tahun:'2024',medal:'🏅'},
    {id:7,judul:'Juara 2 Festival Hadroh Kab. Banyumas',tahun:'2024',medal:'🥈'},
    {id:8,judul:'Peraih Nilai UN Tertinggi Se-Kecamatan',tahun:'2023',medal:'🌟'},
  ]
};