# Cara submit sebelum deadline

Deadline resmi: **Senin, 12 Oktober 2026, pukul 13.59 WIB** (11 Oktober pukul 23.59 PDT). [Aturan khusus](https://dev.to/page/hacktoberfest-week1-2026-10-05-contest-rules).

## 1. Coba aplikasinya

Jalankan dari folder ini:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Buka http://127.0.0.1:4173. Klik Enable open-source AI, tunggu siap, lalu coba satu query. Kalau sempat, lakukan misi lima menit dekat rumah dan tambahkan pengalaman **yang benar-benar dilakukan** ke tulisan.

## 2. Publikasikan kode + demo

Login GitHub di browser. Buat repository PUBLIC baru bernama `keluar-sebentar`. Upload isi folder proyek ini, termasuk folder `dist`, README, LICENSE, dan `.github/workflows/pages.yml`. GitHub CLI di perangkat ini memiliki token kedaluwarsa sehingga belum bisa membuat repo otomatis.

Alternatif CLI setelah kamu menyelesaikan login sendiri:

```powershell
gh auth login --hostname github.com --web
git init -b main
git add .
git commit -m "Build Keluar Sebentar for Hacktoberfest Touch Grass"
gh repo create keluar-sebentar --public --source . --remote origin --push
```

Jalankan perintah dari **folder keluar-sebentar**, bukan folder induk HLM. Folder ini akan memiliki Git repo sendiri dari alur Sites; bila repo sudah memiliki commit, cukup buat repo GitHub dengan perintah terakhir. Jangan upload file token, credential, atau arsip deployment.

Untuk demo GitHub Pages: repository → Settings → Pages → Source: **GitHub Actions**. Actions → **Deploy static demo to GitHub Pages** → Run workflow. Workflow mengunggah hanya `dist/`. Setelah sukses gunakan URL yang dilaporkan job deploy; biasanya `https://USERNAME.github.io/keluar-sebentar/`.

Preview Sites yang dibuat di chat ini bersifat **private**. Tautan tersebut bukan demo publik untuk juri. GitHub Pages tidak bergantung pada Sites dan tidak membutuhkan hosting berbayar.

## 3. Publikasikan artikel DEV

1. Buka [halaman challenge](https://dev.to/challenges/hacktoberfest-week1-2026-10-05), klik **Submission Template**, login DEV.
2. Salin artikel dari `SUBMISSION.md` (judul masukkan ke field title; body mulai dari kalimat submission).
3. Ganti dua bagian **Before publishing** dengan link demo publik dan repo publik. Upload gambar demo ke editor DEV bila memakai screenshot.
4. Pastikan tag `devchallenge` dan `hf26challenge` ada. Tulisan bahasa Inggris sudah disiapkan.
5. Baca dan sesuaikan klaim pengujian dengan pengalamanmu. Klik Publish sebelum deadline. Simpan URL artikel: itulah submission resmi, bukan hanya repo.

Partner category tidak dicantumkan karena proyek ini belum memakai teknologi partner challenge. Jangan menambahkan Gemma/Render/dll tanpa implementasi nyata. Aturan mensyaratkan 18+; periksa kelayakan di aturan resmi sebelum submit.

## Status

- Kode aplikasi dan draf artikel tersedia.
- Real browser AI diuji; unit tests lulus.
- Repo publik, demo publik, dan artikel DEV belum dipublikasikan.
- Jangan submit tulisan yang masih berisi placeholder.
