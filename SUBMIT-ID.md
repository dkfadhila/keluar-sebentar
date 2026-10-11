# Cara submit sebelum deadline

Deadline resmi: **Senin, 12 Oktober 2026, pukul 13.59 WIB** (11 Oktober pukul 23.59 PDT). [Aturan khusus](https://dev.to/page/hacktoberfest-week1-2026-10-05-contest-rules).

## 1. Coba aplikasinya

Jalankan dari folder ini:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Buka http://127.0.0.1:4173. Klik Enable open-source AI, tunggu siap, lalu coba satu query. Kalau sempat, lakukan misi lima menit dekat rumah dan tambahkan pengalaman **yang benar-benar dilakukan** ke tulisan.

## 2. Publikasikan kode + demo

Kode sudah di-push ke [repository publik dkfadhila/keluar-sebentar](https://github.com/dkfadhila/keluar-sebentar). Demo publik tersedia melalui [GitHub Pages](https://dkfadhila.github.io/keluar-sebentar/). Login GitHub CLI sudah diperbarui.

Untuk perubahan berikutnya dari folder proyek ini:

```powershell
git add .
git commit -m "Update Keluar Sebentar"
git push origin main
```

Jalankan perintah dari **folder keluar-sebentar**, bukan folder induk HLM. Jangan upload file token, credential, atau arsip deployment.

GitHub Pages sudah dikonfigurasi dengan **GitHub Actions**. Workflow mengunggah hanya `dist/`. Push berikutnya ke `main` menjalankan deployment lagi.

Preview Sites yang dibuat di chat ini bersifat **private**. Tautan tersebut bukan demo publik untuk juri. GitHub Pages tidak bergantung pada Sites dan tidak membutuhkan hosting berbayar.

## 3. Publikasikan artikel DEV

1. Buka [halaman challenge](https://dev.to/challenges/hacktoberfest-week1-2026-10-05), klik **Submission Template**, login DEV.
2. Salin artikel dari `SUBMISSION.md` (judul masukkan ke field title; body mulai dari kalimat submission).
3. Link demo, repository, dan screenshot sudah diisi. Kamu bisa upload screenshot ke editor DEV bila ingin mengganti URL gambar GitHub.
4. Pastikan tag `devchallenge` dan `hf26challenge` ada. Tulisan bahasa Inggris sudah disiapkan.
5. Baca dan sesuaikan klaim pengujian dengan pengalamanmu. Klik Publish sebelum deadline. Simpan URL artikel: itulah submission resmi, bukan hanya repo.

Partner category tidak dicantumkan karena proyek ini belum memakai teknologi partner challenge. Jangan menambahkan Gemma/Render/dll tanpa implementasi nyata. Aturan mensyaratkan 18+; periksa kelayakan di aturan resmi sebelum submit.

## Status

- Kode aplikasi dan draf artikel tersedia.
- Real browser AI diuji; unit tests lulus.
- Repo sudah publik dan GitHub Pages sudah dikonfigurasi untuk demo publik.
- Artikel DEV **belum dipublikasikan**; entry challenge belum tersubmit.
