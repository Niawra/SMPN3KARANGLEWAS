# TODO - Admin dapat upload file gambar untuk Galeri

## Rencana
1. Update `app.js` agar modal admin galeri memiliki field upload gambar (`input type=file`).
2. Simpan gambar ke `db.galeri[*].img` dalam bentuk Base64 (`FileReader.readAsDataURL`).
3. Update `renderGaleri()` agar thumbnail dan lightbox menampilkan gambar asli bila `g.tipe==='foto'` dan `g.img` tersedia.
4. Update `openLightbox()` agar untuk foto menampilkan gambar besar; untuk video tetap fallback ke emoji/overlay.
5. Pastikan edit item galeri mempertahankan gambar lama jika admin tidak memilih file baru.
6. Testing manual: tambah/edit galeri foto dan pastikan setelah logout tampil di menu utama.

## Status
- [ ] Implementasi input upload + preview (modal admin galeri)
- [ ] Implementasi penyimpanan Base64 ke `db.galeri[*].img`
- [ ] Render thumbnail & lightbox pakai `img`
- [ ] Pertahankan `img` saat edit tanpa ganti file
- [ ] Testing manual

