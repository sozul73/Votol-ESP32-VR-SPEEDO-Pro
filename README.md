
🛵 Votol Dash Pro - ESP32 BLE Web Dashboard
Votol Dash Pro adalah antarmuka web modern dan responsif berbasis Progressive Web App (PWA) yang dirancang untuk memonitor data CAN Bus dari controller Votol motor listrik secara real-time. Proyek ini bekerja dengan cara menerima data JSON dari modul ESP32 yang terhubung ke controller melalui koneksi Bluetooth Low Energy (BLE).

Dashboard ini dapat dijalankan langsung dari browser web pendukung (seperti Chrome) dan dapat diinstal ke layar utama (Home Screen) HP sebagai aplikasi native yang dapat berjalan 100% Offline.

Web UI Speedometer dapat diakses dari link berikut
----------------------------------------------------------------------------------------------------------------------------------------------
https://sozul73.github.io/Votol-ESP32-VR-SPEEDO-Pro/
----------------------------------------------------------------------------------------------------------------------------------------------

Pengetesan menggunakan data JSON dari modul esp32c3-supermini dan can reader MCP2515 dengan firmware dari:
Atzarhika (https://github.com/atzarhika)
https://github.com/atzarhika/jamFoxRS-MCP-OledBLE

Works bagi yang menggunakan modul dan firmware dari (format data JSON sudah disesuaikan namun ada data yang tidak muncul dan Perlu pengetesan):
Yudhaime (https://github.com/yudhaime)
https://github.com/yudhaime/JAMFOXRS/tree/main
Zekry619 (https://github.com/zexry619)
https://github.com/zexry619/votol-esp32-can-bus

✨ Fitur Utama
📊 Real-time Dashboard: Menampilkan Speedometer (KM/H), RPM, dan Status Mode Berkendara (PARK, MID, SPORT, DRIVE) tanpa hambatan (zero-lag).

🔋 Advanced BMS Monitoring: Pantau status Baterai (SOC), Tegangan (V), Arus (A), Estimasi Waktu Pengecasan (ETA), Health (SOH), Cycles, hingga visualisasi dinamis Tegangan per-Cell.

⚡ Dynamic Power Meter: Indikator visual instan (dalam satuan Watt) untuk melihat besaran daya tarik maupun regen/pengereman.

🗺️ Trip Analytics: Menampilkan estimasi sisa jarak tempuh, jarak trip, efisiensi (Wh/km), suhu (ECU, Motor, Baterai), serta grafik history kecepatan dan arus secara langsung menggunakan Chart.js.

📱 Responsif & Adaptive: Tata letak grid yang secara otomatis menyesuaikan orientasi perangkat (Portrait/Landscape) baik untuk Smartphone maupun Layar PC/Tablet horizontal.

🌐 PWA Ready: Mendukung Progressive Web App dengan implementasi Service Worker (Cache First) agar bisa diakses 100% tanpa jaringan internet.

🎨 Tema Kustomisasi: Mendukung perpindahan Dark Mode dan Light Mode sesuai kenyamanan mata pengguna.

⚙️ Sistem Kalibrasi & Log: Tab pengaturan khusus untuk sinkronisasi waktu dan kalibrasi rasio jarak tempuh (Maps vs Dashboard), serta tampilan log raw CAN Bus untuk proses debugging.

🛠️ Arsitektur Sistem / Cara Kerja
Votol Controller (CAN Bus): Mengirimkan data telemetri motor.

ESP32 (Hardware): Membaca data CAN Bus, mem-parsing ke format JSON, dan memancarkannya (broadcast) melalui karakteristik Bluetooth Low Energy (BLE).

Votol Dash Pro (Web Client): Menangkap sinyal dari ESP32 menggunakan Web Bluetooth API, lalu memproses string JSON untuk menggerakkan indikator visual di layar.

🚀 Cara Penggunaan (Instalasi)
Karena aplikasi ini berjalan sepenuhnya di sisi klien (Client-side), Anda tidak perlu melakukan setup server khusus.

Hosting Gratis: Anda dapat meng-host repository ini menggunakan GitHub Pages, Vercel, atau Netlify.

Koneksi BLE: Buka URL web yang telah di-host menggunakan Google Chrome di Android atau PC (Browser iOS saat ini memerlukan browser khusus seperti Bluefy untuk Web BLE). Pastikan Bluetooth menyala.

Hubungkan: Klik tombol CONNECT berwarna merah di sudut kanan atas dan pilih perangkat Bluetooth ESP32 Anda (misal: Votol_BLE).

Install ke HP (PWA): Buka menu opsi di browser (titik tiga) lalu pilih "Add to Home screen" atau "Install app". Aplikasi sekarang bisa dibuka dari drawer aplikasi HP Anda dan berfungsi sepenuhnya secara offline.

💻 Tech Stack
HTML5 & CSS3 (Vanilla CSS dengan CSS Variables, CSS Grid, dan Flexbox)

Vanilla JavaScript (Web Bluetooth API, Service Workers, DOM Manipulation)

Chart.js (Untuk rendering grafik secara real-time)

Lucide Icons (Untuk sistem ikon yang tajam dan ringan)

📝 Konfigurasi ESP32 (Opsional)
Untuk menghubungkan web ini, ESP32 Anda harus disetel sebagai GATT Server dengan parameter berikut:

Service UUID: 4fafc201-1fb5-459e-8fcc-c5c9c331914b

TX Characteristic UUID: beb5483e-36e1-4688-b7f5-ea07361b26a8 (Menerima string JSON yang diakhiri baris baru \n)
