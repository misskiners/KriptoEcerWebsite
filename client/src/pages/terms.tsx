import { LegalLayout, LegalSection, LegalList } from "@/components/legal-layout";

export default function Terms() {
  return (
    <LegalLayout
      title="Syarat dan Ketentuan"
      description="Baca syarat dan ketentuan penggunaan layanan KriptoEcer — bot Telegram jual beli cryptocurrency otomatis di Indonesia."
      lastUpdated="Maret 2026"
    >
      <LegalSection title="1. Pendahuluan">
        <p>
          Selamat datang di KriptoEcer! Kami senang kamu memilih layanan kami untuk kebutuhan jual beli cryptocurrency. 
          Sebelum mulai, harap luangkan waktu sebentar untuk membaca syarat dan ketentuan ini. Kami menulis dokumen ini 
          dengan bahasa yang sejernih mungkin — bukan legalese yang bikin pusing — supaya kamu benar-benar paham hak 
          dan kewajiban masing-masing pihak.
        </p>
        <p>
          Syarat dan Ketentuan ini ("S&K") merupakan perjanjian yang berlaku antara kamu sebagai pengguna dengan 
          KriptoEcer sebagai penyedia layanan. Dengan menggunakan bot Telegram <strong>@kriptoecerbot</strong>, 
          mengakses website kami, atau melakukan transaksi apapun melalui platform kami, kamu dianggap telah membaca, 
          memahami, dan menyetujui seluruh ketentuan yang tercantum di sini.
        </p>
        <p>
          Jika ada bagian dari S&K ini yang tidak kamu setujui, mohon untuk tidak menggunakan layanan kami. 
          Kalau ada yang kurang jelas, jangan ragu untuk tanya langsung ke kami melalui bot atau channel resmi.
        </p>
      </LegalSection>

      <LegalSection title="2. Tentang Layanan KriptoEcer">
        <p>
          KriptoEcer adalah layanan pertukaran cryptocurrency (crypto exchange) yang beroperasi sepenuhnya melalui 
          bot Telegram <strong>@kriptoecerbot</strong>. Kami memungkinkan pengguna untuk membeli dan menjual 
          berbagai aset digital — termasuk Bitcoin (BTC), Ethereum (ETH), USDT, BNB, Solana (SOL), dan berbagai 
          altcoin populer lainnya — menggunakan Rupiah Indonesia (IDR).
        </p>
        <p>
          Yang membedakan KriptoEcer dari exchange konvensional adalah kemudahan akses dan otomatisasi penuh. 
          Tidak ada proses pendaftaran panjang, tidak perlu download aplikasi tambahan, dan seluruh alur transaksi 
          — mulai dari deposit hingga pengiriman crypto — berjalan otomatis tanpa intervensi manual dari admin.
        </p>
        <p>
          KriptoEcer beroperasi sebagai <strong>penyedia layanan pertukaran</strong>, bukan sebagai penasihat 
          keuangan atau investasi. Kami tidak memberikan rekomendasi untuk membeli atau menjual aset tertentu, 
          dan keputusan transaksi sepenuhnya ada di tangan pengguna.
        </p>
      </LegalSection>

      <LegalSection title="3. Siapa yang Boleh Menggunakan Layanan Ini?">
        <p>
          Layanan KriptoEcer ditujukan untuk pengguna yang memenuhi kriteria berikut:
        </p>
        <LegalList items={[
          "Berusia minimal 18 tahun atau sudah dewasa secara hukum di yurisdiksi tempat tinggalmu.",
          "Memiliki akun Telegram yang aktif dan valid.",
          "Bukan merupakan warga negara atau penduduk dari wilayah yang dikenakan sanksi internasional atau yang melarang penggunaan cryptocurrency.",
          "Tidak menggunakan layanan ini untuk aktivitas yang melanggar hukum, termasuk namun tidak terbatas pada pencucian uang, pendanaan terorisme, penipuan, atau aktivitas ilegal lainnya.",
          "Menggunakan layanan ini atas nama pribadi, bukan atas nama pihak ketiga tanpa izin yang jelas.",
        ]} />
        <p>
          Dengan menggunakan layanan kami, kamu menyatakan bahwa kamu memenuhi seluruh persyaratan di atas. 
          Kami berhak menangguhkan atau menghentikan akses layanan jika ada indikasi pelanggaran terhadap 
          persyaratan ini.
        </p>
      </LegalSection>

      <LegalSection title="4. Cara Kerja Bot KriptoEcer">
        <p>
          Bot KriptoEcer bekerja melalui serangkaian perintah dan menu interaktif di Telegram. Berikut gambaran 
          umum alurnya:
        </p>
        <LegalList items={[
          "Pengguna membuka @kriptoecerbot dan mengetik /start untuk memulai.",
          "Bot menampilkan menu pilihan — termasuk beli crypto, jual crypto, cek saldo, dan riwayat transaksi.",
          "Pengguna melakukan deposit saldo menggunakan metode pembayaran yang tersedia.",
          "Setelah saldo aktif, pengguna memilih jenis crypto dan nominal yang ingin dibeli atau dijual.",
          "Sistem memproses transaksi secara otomatis dan mengirimkan konfirmasi ke pengguna.",
        ]} />
        <p>
          Seluruh proses berjalan secara otomatis. Bot kami aktif 24 jam sehari, 7 hari seminggu, termasuk 
          hari libur nasional. Respons bot umumnya terjadi dalam hitungan detik setelah perintah dikirimkan.
        </p>
        <p>
          Perlu diingat bahwa pengiriman crypto ke wallet eksternal bergantung pada kondisi jaringan blockchain 
          masing-masing aset. Waktu konfirmasi bisa bervariasi, biasanya dalam rentang beberapa menit hingga 
          lebih lama tergantung kepadatan jaringan saat itu.
        </p>
      </LegalSection>

      <LegalSection title="5. Proses Transaksi">
        <p>
          Setiap transaksi yang dilakukan melalui KriptoEcer tunduk pada ketentuan berikut:
        </p>
        <LegalList items={[
          "Semua transaksi bersifat final dan tidak dapat dibatalkan setelah dikonfirmasi oleh sistem.",
          "Harga cryptocurrency bersifat real-time dan dapat berubah kapan saja sesuai kondisi pasar global.",
          "Rate yang ditampilkan oleh bot berlaku untuk jangka waktu terbatas. Jika konfirmasi terlambat, rate mungkin sudah berubah.",
          "Pastikan alamat wallet tujuan yang kamu masukkan sudah benar. Transaksi ke alamat wallet yang salah tidak dapat dipulihkan.",
          "Minimal transaksi pembelian dimulai dari Rp10.000. Batas maksimum per transaksi akan ditampilkan di bot dan bisa berubah sewaktu-waktu.",
          "Kami berhak menolak atau menunda transaksi yang terindikasi mencurigakan atau melanggar ketentuan penggunaan.",
        ]} />
        <p>
          Kami sangat menyarankan kamu untuk selalu memeriksa ulang detail transaksi — termasuk jumlah, jenis 
          crypto, dan alamat wallet — sebelum menekan tombol konfirmasi. Kesalahan yang terjadi karena kelalaian 
          pengguna bukan merupakan tanggung jawab KriptoEcer.
        </p>
      </LegalSection>

      <LegalSection title="6. Deposit dan Metode Pembayaran">
        <p>
          KriptoEcer menyediakan beberapa metode deposit yang semuanya diproses secara otomatis:
        </p>
        <LegalList items={[
          "QRIS — tersedia untuk semua bank dan dompet digital yang mendukung standar QRIS.",
          "Virtual Account (VA) — transfer bank ke nomor VA yang digenerate otomatis oleh sistem.",
          "PayPal — untuk pengguna yang lebih familiar dengan metode internasional.",
          "KriptoBot Telegram — deposit menggunakan saldo crypto dari bot kripto lain yang terintegrasi.",
        ]} />
        <p>
          Konfirmasi deposit berjalan secara otomatis setelah pembayaran berhasil diverifikasi oleh sistem 
          payment gateway kami. Kamu tidak perlu menghubungi admin untuk konfirmasi — semuanya berjalan sendiri.
        </p>
        <p>
          Saldo yang sudah masuk tidak dapat ditarik kembali dalam bentuk Rupiah. Saldo hanya bisa digunakan 
          untuk melakukan pembelian cryptocurrency melalui bot. Pastikan kamu hanya deposit nominal yang memang 
          ingin kamu gunakan untuk transaksi.
        </p>
        <p>
          Jika deposit sudah terbayar namun saldo tidak kunjung masuk dalam waktu yang wajar, segera hubungi 
          kami dengan menyertakan bukti pembayaran. Lihat Kebijakan Refund kami untuk ketentuan lebih lanjut.
        </p>
      </LegalSection>

      <LegalSection title="7. Biaya Layanan dan Spread">
        <p>
          KriptoEcer menerapkan spread (selisih harga beli dan harga pasar) sebagai kompensasi layanan. Spread 
          ini sudah termasuk dalam harga yang ditampilkan oleh bot — artinya harga yang kamu lihat sudah 
          merupakan harga final, tidak ada biaya tersembunyi yang ditambahkan setelahnya.
        </p>
        <p>
          Selain spread, mungkin terdapat biaya jaringan (network fee atau gas fee) yang diperlukan untuk 
          memproses transaksi di blockchain. Biaya ini ditentukan oleh kondisi jaringan masing-masing cryptocurrency 
          dan bukan merupakan pendapatan KriptoEcer.
        </p>
        <p>
          Kami berhak mengubah struktur biaya atau spread sewaktu-waktu. Perubahan akan berlaku untuk transaksi 
          yang dilakukan setelah pengumuman, bukan untuk transaksi yang sudah dikonfirmasi.
        </p>
      </LegalSection>

      <LegalSection title="8. Larangan Penggunaan">
        <p>
          Penggunaan layanan KriptoEcer dilarang untuk tujuan-tujuan berikut:
        </p>
        <LegalList items={[
          "Pencucian uang atau aktivitas keuangan ilegal dalam bentuk apapun.",
          "Pendanaan terorisme atau organisasi yang dilarang oleh hukum.",
          "Pembelian barang atau jasa ilegal menggunakan cryptocurrency.",
          "Manipulasi pasar atau aktivitas perdagangan yang curang.",
          "Penyalahgunaan sistem otomatis bot untuk kepentingan yang merugikan sistem atau pengguna lain.",
          "Memberikan informasi palsu atau menyesatkan kepada sistem kami.",
          "Mengakses atau mencoba mengakses akun pengguna lain tanpa izin.",
          "Menggunakan layanan atas nama orang lain tanpa izin yang sah.",
        ]} />
        <p>
          Pelanggaran terhadap larangan di atas dapat mengakibatkan pemblokiran akun permanen tanpa pemberitahuan 
          sebelumnya, dan kami berhak melaporkan aktivitas mencurigakan kepada pihak berwenang yang relevan.
        </p>
      </LegalSection>

      <LegalSection title="9. Keamanan Akun">
        <p>
          Keamanan akun adalah tanggung jawab bersama — kami menjaga sistem dari sisi teknis, dan kamu menjaga 
          akun Telegram-mu dari sisi pengguna. Berikut hal-hal yang perlu kamu perhatikan:
        </p>
        <LegalList items={[
          "Jangan pernah membagikan kode OTP atau link verifikasi Telegram kepada siapapun, termasuk yang mengaku sebagai tim KriptoEcer.",
          "Aktifkan verifikasi dua langkah (two-step verification) di akun Telegram-mu.",
          "Jika kamu curiga akun Telegram-mu dikompromikan, segera hubungi kami.",
          "KriptoEcer tidak pernah meminta password atau seed phrase wallet kamu.",
          "Selalu pastikan kamu berinteraksi dengan @kriptoecerbot yang asli, bukan bot palsu dengan nama serupa.",
        ]} />
        <p>
          Kami tidak bertanggung jawab atas kerugian yang terjadi akibat akun Telegram pengguna yang dikompromikan, 
          atau akibat pengguna memberikan akses kepada pihak yang tidak berwenang.
        </p>
      </LegalSection>

      <LegalSection title="10. Batasan Tanggung Jawab">
        <p>
          KriptoEcer menyediakan layanan ini "sebagaimana adanya" (as-is). Berikut hal-hal yang berada di luar 
          tanggung jawab kami:
        </p>
        <LegalList items={[
          "Kerugian finansial akibat fluktuasi harga cryptocurrency setelah transaksi selesai.",
          "Kerugian akibat kesalahan pengguna dalam memasukkan alamat wallet atau jumlah transaksi.",
          "Keterlambatan pengiriman crypto yang disebabkan oleh kongesti atau masalah pada jaringan blockchain.",
          "Gangguan layanan yang disebabkan oleh pihak ketiga (Telegram, payment gateway, dll).",
          "Kerugian akibat force majeure seperti bencana alam, perang, pemadaman internet massal, atau perubahan regulasi mendadak.",
          "Keputusan investasi yang dibuat berdasarkan penggunaan layanan kami.",
        ]} />
        <p>
          Total tanggung jawab KriptoEcer kepada pengguna dalam situasi apapun tidak akan melebihi nilai 
          transaksi terakhir yang dilakukan oleh pengguna tersebut.
        </p>
      </LegalSection>

      <LegalSection title="11. Penghentian dan Pemblokiran Akun">
        <p>
          Kami berhak menangguhkan atau menghentikan akses layanan kepada pengguna manapun, dengan atau tanpa 
          pemberitahuan sebelumnya, apabila:
        </p>
        <LegalList items={[
          "Terdapat indikasi pelanggaran terhadap Syarat dan Ketentuan ini.",
          "Terdapat aktivitas transaksi yang mencurigakan atau terindikasi penipuan.",
          "Kami menerima permintaan dari otoritas hukum yang berwenang.",
          "Pengguna terbukti memberikan informasi palsu.",
          "Terdapat risiko keamanan yang memerlukan tindakan segera.",
        ]} />
        <p>
          Pengguna juga berhak menghentikan penggunaan layanan kapan saja dengan cukup berhenti menggunakan bot. 
          Saldo yang tersisa di akun sebelum penghentian akan diproses sesuai kebijakan refund yang berlaku.
        </p>
      </LegalSection>

      <LegalSection title="12. Perubahan Layanan dan Ketentuan">
        <p>
          Dunia crypto bergerak cepat, dan kami pun terus berkembang. Kami berhak mengubah, menambah, atau 
          menghapus fitur layanan kapan saja. Demikian pula dengan Syarat dan Ketentuan ini — kami bisa 
          memperbaruinya sesuai kebutuhan.
        </p>
        <p>
          Untuk perubahan yang signifikan, kami akan mengumumkan melalui channel resmi Telegram kami 
          (@kriptoecerofficial) setidaknya 7 hari sebelum perubahan berlaku. Penggunaan layanan setelah 
          tanggal efektif perubahan dianggap sebagai persetujuan terhadap ketentuan yang baru.
        </p>
        <p>
          Selalu pantau channel resmi kami untuk mendapatkan informasi terbaru tentang layanan dan kebijakan.
        </p>
      </LegalSection>

      <LegalSection title="13. Hukum yang Berlaku">
        <p>
          Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
          Setiap sengketa yang timbul dari atau berkaitan dengan layanan KriptoEcer akan diselesaikan 
          terlebih dahulu melalui musyawarah mufakat antara kedua pihak.
        </p>
        <p>
          Apabila penyelesaian secara musyawarah tidak berhasil dalam 30 (tiga puluh) hari kalender, 
          sengketa akan diserahkan ke pengadilan yang berwenang sesuai ketentuan hukum yang berlaku 
          di Indonesia.
        </p>
      </LegalSection>

      <LegalSection title="14. Cara Menghubungi Kami">
        <p>
          Ada pertanyaan tentang S&K ini? Atau ada yang perlu diklarifikasi? Jangan ragu untuk menghubungi kami:
        </p>
        <LegalList items={[
          "Bot: @kriptoecerbot (untuk pertanyaan terkait transaksi)",
          "Channel Resmi: @kriptoecerofficial (untuk pengumuman dan info layanan)",
          "Instagram: @kriptoecer",
          "X (Twitter): @kriptoecer",
        ]} />
        <p>
          Tim kami siap membantu sesuai kemampuan kami. Karena layanan ini otomatis, untuk pertanyaan teknis 
          yang spesifik, mohon sertakan detail transaksi (tanggal, jumlah, dan ID transaksi jika ada) agar 
          kami bisa membantu lebih cepat.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
