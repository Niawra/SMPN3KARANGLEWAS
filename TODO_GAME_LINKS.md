# TODO - Penghapusan URL Game & Multi Link Soal per Kelas

## Rencana
1. Update `index.html`
   - Hapus kolom tabel admin Game Edukasi: `URL`.
   - (Pastikan tidak ada tombol/section yang menampilkan URL materi.)

2. Update `app.js`
   - Admin modal `type==='game'`: hapus field input `URL Game` (`m-url`) dari UI.
   - `saveAdminModal()`: hapus penyimpanan `obj.url` dari game.
   - `renderAdminTables()`: hapus rendering kolom `g.url`.
   - Front-end modal `openGameMapelModal`: hapus/disable section “Link Materi” (QR & tombol buka link) agar hanya daftar soal per kelas yang dipakai.

3. Update `data.js`
   - Rapikan game entries: hapus/abaikan properti `url` dan `materiUrl`.
   - Pastikan tiap game memakai `soalLinksByKelas` untuk kelas `7/8/9`.

4. Testing manual
   - Login admin, tambah/edit game: isi multi link kelas 7/8/9.
   - Pastikan “Daftar Soal” menampilkan semua link per kelas.
   - Pastikan tidak ada lagi akses “Link Materi/URL game”.

