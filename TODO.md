# TODO - Update Game Edukasi (Pilih Kelas)

## Rencana
1. (Data) Ubah struktur soal untuk semua game kecuali **CBP Rupiah** menjadi berbasis kelas (7/8/9).
   - Informatika: soal lama dipindah ke kelas 7.
   - Kelas 8/9 dibuat kosong.
2. (UI) Tambahkan modal “Pilih Kelas” di `index.html` pada halaman Game Edukasi.
3. (Logic) Perbarui flow di `app.js`:
   - Saat klik “Daftar Soal” untuk game non-CBP → tampilkan modal pilih kelas.
   - Saat pilih kelas → buka `page-bank-soal` dan tampilkan soal sesuai kelas.
   - Untuk CBP Rupiah → tetap langsung tampil daftar soal (tanpa modal kelas).
4. (Render) Update `renderSoalLinks()` di `app.js` agar mengambil soal sesuai kelas.
5. (Styling) Jika perlu, tambah style modal pilih kelas di `style.css`.
6. (Test) Verifikasi:
   - Informatika kelas 7 tampil 3 soal.
   - Informatika kelas 8/9 kosong.
   - CBP Rupiah tidak ada modal kelas.

