# Budgetin Prototype

Prototype frontend statis untuk `Budgetin`, aplikasi mobile budgeting personal. Repo ini berisi kumpulan halaman HTML, styling global, dan logic JavaScript ringan untuk mensimulasikan onboarding, quiz budgeting, hasil rekomendasi metode, serta beberapa layar dashboard keuangan.

## Filosofi nama

`Budgetin` dipilih sebagai nama brand karena langsung terhubung ke aktivitas utama produk: membantu pengguna membagi, merencanakan, dan menjalankan budget dengan cara yang terasa ringan. Nama ini terdengar lebih dekat ke gaya bahasa pengguna Indonesia, sekaligus tetap jelas mengarah ke fungsi inti aplikasi.

Makna brand yang ingin dibawa:

- budgeting yang terasa actionable, bukan kaku
- dekat, ringan, dan mudah dipahami Gen Z Indonesia
- memberi kesan personal: "budget-in" uangmu sesuai metode yang paling cocok
- menekankan bahwa mengatur uang bisa terasa lebih simpel dan terarah

## Tujuan

Project ini dipakai sebagai design prototype untuk `Budgetin`, bukan aplikasi production-ready. Data masih berupa mock data di sisi frontend dan belum terhubung ke backend, database, atau API.

## Stack

- HTML statis per layar
- CSS tunggal di `styles.css`
- JavaScript vanilla di `app.js`
- Asset badge SVG di `assets/badges/`

## Alur prototype

Urutan flow utama yang terlihat dari struktur project:

1. `index.html` - onboarding
2. `auth.html` - auth / masuk
3. `quiz.html` - quiz profil budgeting
4. `result.html` - hasil metode budgeting
5. `budget-preview.html` - preview auto-budget
6. `dashboard.html` - dashboard utama

Setelah itu ada layar pendukung:

- `accounts.html` - daftar aset / rekening
- `budget.html` - detail budget
- `goals.html` - target finansial
- `gold.html` - brankas emas
- `insights.html` - insight mingguan
- `profile.html` - badge room / profil budgeting
- `settings.html` - pengaturan
- `transactions.html` - daftar transaksi

## Struktur file

- `app.js` - pusat logic prototype, mock data, formatter, dan interaksi antarlayar
- `styles.css` - seluruh visual system dan layout mobile preview
- `*.html` - masing-masing layar prototype
- `assets/badges/` - badge SVG untuk tipe profil budgeting

## Konteks logic di `app.js`

Beberapa domain utama yang sudah terlihat:

- Mapping metode budgeting seperti `kakeibo`, `50/30/20`, `zero-based`, `sinking fund`, dan `FIRE`
- Mock data akun/aset seperti tabungan, e-wallet, cash, emas, dan saham
- Aturan profil, template budget, dan badge per persona
- Utility formatting nominal rupiah

Artinya, file `app.js` saat ini berfungsi sebagai source of truth untuk state prototype.

## Cara menjalankan

Karena ini prototype statis, file bisa dibuka langsung di browser. Opsi yang lebih aman adalah lewat local server sederhana supaya navigasi dan asset loading konsisten.

Contoh:

```bash
python3 -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000/index.html
```

## Catatan

- Belum ada `package.json`, build tool, atau framework frontend
- Belum ada dokumentasi teknis selain source code
- Nama folder project masih `prototype-finbestie`, tetapi branding produk di source sudah memakai `Budgetin`
- Cocok untuk eksplorasi UX flow, presentasi prototype, atau dasar refactor ke framework frontend
