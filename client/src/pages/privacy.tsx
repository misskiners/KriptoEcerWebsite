import { LegalLayout, LegalSection, LegalList } from "@/components/legal-layout";
import { Lock } from "lucide-react";

export default function Privacy() {
  return (
    <LegalLayout
      title="Kebijakan Privasi"
      description="Kebijakan privasi KriptoEcer — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pengguna layanan bot Telegram kripto kami."
      lastUpdated="Maret 2026"
      icon={<Lock className="w-6 h-6" />}
    >
      <LegalSection title="1. Komitmen Kami terhadap Privasi">
        <p>
          Di KriptoEcer, kami percaya bahwa privasi bukan sekadar kewajiban hukum — ini adalah bentuk 
          rasa hormat kami kepada setiap pengguna yang mempercayai layanan kami. Kebijakan Privasi ini 
          menjelaskan secara transparan data apa yang kami kumpulkan, bagaimana kami menggunakannya, 
          siapa yang bisa mengaksesnya, dan apa hak-hak kamu atas data tersebut.
        </p>
        <p>
          Dengan menggunakan layanan KriptoEcer melalui bot Telegram <strong>@kriptoecerbot</strong> 
          atau website kami, kamu menyetujui praktik pengumpulan dan penggunaan data yang dijelaskan 
          dalam kebijakan ini. Jika ada yang tidak kamu setujui, mohon pertimbangkan untuk tidak 
          menggunakan layanan kami, atau hubungi kami untuk mendiskusikan kekhawatiranmu.
        </p>
        <p>
          Kebijakan ini berlaku untuk semua data yang kami kumpulkan melalui platform KriptoEcer, 
          termasuk bot Telegram, website, dan saluran komunikasi resmi kami lainnya.
        </p>
      </LegalSection>

      <LegalSection title="2. Data Apa yang Kami Kumpulkan?">
        <p>
          Kami hanya mengumpulkan data yang benar-benar diperlukan untuk menjalankan layanan. Berikut 
          rinciannya:
        </p>
        <p><strong>Data Identitas dari Telegram:</strong></p>
        <LegalList items={[
          "ID Telegram unik kamu (user ID) — ini adalah angka identifikasi yang diberikan Telegram secara otomatis.",
          "Username Telegram (jika kamu memilikinya dan bersifat publik).",
          "Nama tampilan (display name) di Telegram.",
        ]} />
        <p><strong>Data Transaksi:</strong></p>
        <LegalList items={[
          "Riwayat semua transaksi: tanggal, waktu, jenis transaksi (beli/jual), jenis aset crypto, jumlah nominal, dan status transaksi.",
          "Alamat wallet cryptocurrency yang kamu masukkan sebagai tujuan pengiriman.",
          "Saldo akun di sistem KriptoEcer.",
          "ID dan referensi pembayaran dari setiap deposit yang dilakukan.",
        ]} />
        <p><strong>Data Teknis:</strong></p>
        <LegalList items={[
          "Log interaksi dengan bot (perintah yang dikirim, waktu interaksi) untuk keperluan debugging dan keamanan sistem.",
          "Informasi teknis perangkat yang digunakan jika kamu mengakses website kami (browser, sistem operasi, IP address).",
        ]} />
        <p>
          Kami <strong>tidak</strong> mengumpulkan nomor telepon kamu secara langsung (meskipun Telegram 
          memiliki data ini). Kami juga tidak meminta atau menyimpan password, seed phrase wallet, atau 
          informasi sensitif perbankan kamu.
        </p>
      </LegalSection>

      <LegalSection title="3. Bagaimana Kami Mendapatkan Data Ini?">
        <p>
          Data dikumpulkan melalui beberapa cara:
        </p>
        <LegalList items={[
          "Langsung dari kamu saat berinteraksi dengan bot — misalnya saat kamu memasukkan alamat wallet atau memilih jumlah transaksi.",
          "Secara otomatis dari Telegram API saat kamu menggunakan bot kami, termasuk ID dan nama Telegram.",
          "Dari payment gateway (QRIS, Virtual Account, PayPal) saat kamu melakukan deposit — kami menerima notifikasi pembayaran yang berisi referensi transaksi.",
          "Dari blockchain saat transaksi crypto dikonfirmasi — data ini bersifat publik secara alaminya.",
          "Dari website kami melalui cookie dan analitik standar jika kamu mengunjungi kriptoecer.com atau domain terkait.",
        ]} />
      </LegalSection>

      <LegalSection title="4. Untuk Apa Data Ini Digunakan?">
        <p>
          Setiap data yang kami kumpulkan memiliki tujuan yang jelas:
        </p>
        <LegalList items={[
          "Memproses transaksi jual beli cryptocurrency kamu secara otomatis dan akurat.",
          "Mencocokkan pembayaran deposit yang masuk dengan akun pengguna yang tepat.",
          "Mengirimkan notifikasi status transaksi — seperti konfirmasi deposit, konfirmasi pembelian, dan pengiriman crypto.",
          "Menampilkan riwayat transaksi yang bisa kamu lihat kapan saja melalui bot.",
          "Mendeteksi dan mencegah aktivitas yang mencurigakan, penipuan, atau penyalahgunaan sistem.",
          "Meningkatkan kualitas layanan berdasarkan pola penggunaan secara agregat dan anonim.",
          "Memenuhi kewajiban hukum dan regulasi yang berlaku, termasuk permintaan dari otoritas yang berwenang.",
          "Menghubungi kamu jika ada masalah dengan transaksi atau akun, jika kamu dapat kami hubungi melalui Telegram.",
        ]} />
        <p>
          Kami tidak menggunakan data kamu untuk keperluan pemasaran produk pihak ketiga, profiling komersial, 
          atau menjual data ke pengiklan.
        </p>
      </LegalSection>

      <LegalSection title="5. Berapa Lama Data Kamu Disimpan?">
        <p>
          Kami menyimpan data berbeda-beda tergantung jenisnya:
        </p>
        <LegalList items={[
          "Data transaksi disimpan minimal 5 tahun sejak transaksi terjadi. Ini diperlukan untuk keperluan audit, penyelesaian sengketa, dan kepatuhan regulasi keuangan.",
          "Data akun (ID Telegram, nama) disimpan selama akun aktif digunakan. Jika tidak ada aktivitas selama 2 tahun, data non-kritis dapat dihapus.",
          "Log teknis disimpan selama maksimal 90 hari untuk keperluan debugging dan keamanan.",
          "Referensi pembayaran dari payment gateway disimpan sesuai kebijakan masing-masing gateway, minimal 1 tahun.",
        ]} />
        <p>
          Kamu bisa meminta penghapusan data akun kamu (lihat bagian Hak Pengguna). Namun, data transaksi 
          yang sudah terjadi tidak dapat dihapus karena terkait kewajiban legal kami.
        </p>
      </LegalSection>

      <LegalSection title="6. Siapa yang Dapat Mengakses Data Kamu?">
        <p>
          Kami sangat selektif dalam berbagi data. Data kamu hanya dapat diakses oleh:
        </p>
        <LegalList items={[
          "Tim internal KriptoEcer yang memiliki kebutuhan akses untuk menjalankan layanan (misalnya menangani masalah teknis atau sengketa transaksi).",
          "Penyedia layanan teknis pihak ketiga yang kami gunakan — seperti payment gateway, hosting server, dan layanan pemantauan sistem — berdasarkan perjanjian kerahasiaan yang ketat.",
          "Otoritas hukum yang berwenang (kepolisian, pengadilan, atau regulator keuangan) jika ada permintaan resmi yang sah berdasarkan hukum Indonesia.",
        ]} />
        <p>
          Kami <strong>tidak pernah menjual, menyewakan, atau menukarkan</strong> data pribadimu kepada 
          pihak ketiga untuk kepentingan komersial. Ini bukan sekadar janji — ini prinsip bisnis kami.
        </p>
      </LegalSection>

      <LegalSection title="7. Keamanan Data">
        <p>
          Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk melindungi data kamu:
        </p>
        <LegalList items={[
          "Data sensitif disimpan dalam bentuk terenkripsi menggunakan standar enkripsi industri.",
          "Akses ke database produksi dibatasi hanya untuk personel yang membutuhkan (prinsip least privilege).",
          "Sistem kami dipantau secara aktif untuk mendeteksi aktivitas yang tidak biasa.",
          "Komunikasi antara bot dan server menggunakan koneksi terenkripsi (HTTPS/TLS).",
          "Kami melakukan review keamanan secara berkala untuk mengidentifikasi dan memperbaiki potensi kerentanan.",
        ]} />
        <p>
          Namun, perlu dipahami bahwa tidak ada sistem keamanan yang 100% sempurna. Kami tidak dapat 
          menjamin keamanan absolut dari data yang dikirimkan melalui internet. Kamu juga memiliki 
          peran penting dalam menjaga keamanan akun Telegram-mu sendiri.
        </p>
        <p>
          Jika terjadi insiden keamanan yang berdampak signifikan terhadap data pengguna, kami akan 
          memberitahu pengguna yang terdampak melalui channel resmi kami dalam waktu yang wajar.
        </p>
      </LegalSection>

      <LegalSection title="8. Hak-Hak Kamu atas Data">
        <p>
          Sebagai pengguna, kamu memiliki hak-hak berikut terkait data pribadimu:
        </p>
        <LegalList items={[
          "Hak Akses: Kamu bisa meminta ringkasan data apa saja yang kami simpan tentang kamu.",
          "Hak Koreksi: Jika ada data yang tidak akurat, kamu bisa meminta kami untuk memperbaikinya.",
          "Hak Penghapusan: Kamu bisa meminta penghapusan data akun kamu. Data transaksi yang sudah terjadi tidak bisa dihapus karena kewajiban hukum, tetapi data non-esensial bisa kami hapus.",
          "Hak Portabilitas: Kamu bisa meminta salinan riwayat transaksimu dalam format yang dapat dibaca.",
          "Hak Keberatan: Kamu bisa keberatan terhadap penggunaan datamu untuk tujuan tertentu (kecuali jika penggunaan tersebut wajib secara hukum).",
          "Hak Tarik Persetujuan: Jika ada penggunaan data yang berdasarkan persetujuanmu, kamu bisa menarik persetujuan tersebut kapan saja.",
        ]} />
        <p>
          Untuk menggunakan hak-hak di atas, hubungi kami melalui @kriptoecerbot dengan menjelaskan 
          permintaanmu. Kami akan merespons dalam waktu 30 hari kerja.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookie dan Teknologi Pelacakan di Website">
        <p>
          Website KriptoEcer menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman 
          pengguna. Berikut penjelasannya:
        </p>
        <LegalList items={[
          "Cookie esensial: Diperlukan untuk fungsi dasar website, seperti mengingat preferensi tema (gelap/terang). Cookie ini tidak bisa dinonaktifkan.",
          "Cookie analitik: Kami mungkin menggunakan layanan analitik untuk memahami bagaimana pengunjung menggunakan website kami secara agregat dan anonim.",
          "Cookie tidak digunakan untuk melacak aktivitas kamu di website lain atau untuk iklan bertarget.",
        ]} />
        <p>
          Bot Telegram @kriptoecerbot sendiri tidak menggunakan cookie. Telegram memiliki kebijakan 
          privasi tersendiri yang mengatur bagaimana data diproses di platform mereka. Kami menyarankan 
          kamu juga membaca kebijakan privasi Telegram di telegram.org/privacy.
        </p>
      </LegalSection>

      <LegalSection title="10. Layanan Pihak Ketiga yang Kami Gunakan">
        <p>
          Dalam menjalankan layanan, kami menggunakan beberapa layanan pihak ketiga yang masing-masing 
          memiliki kebijakan privasi sendiri:
        </p>
        <LegalList items={[
          "Telegram — platform utama di mana bot kami beroperasi. Telegram memiliki akses ke data komunikasi sesuai kebijakan mereka.",
          "Payment gateway (QRIS, VA, PayPal) — memproses pembayaran depositan. Mereka tunduk pada regulasi keuangan dan memiliki kebijakan privasi masing-masing.",
          "Penyedia infrastruktur cloud — digunakan untuk hosting server dan database kami.",
        ]} />
        <p>
          Kami memilih mitra pihak ketiga yang memiliki standar keamanan dan privasi yang baik, dan 
          kami memastikan adanya perjanjian pemrosesan data yang sesuai dengan setiap mitra yang 
          mengakses data pengguna kami.
        </p>
      </LegalSection>

      <LegalSection title="11. Perubahan Kebijakan Privasi">
        <p>
          Kebijakan privasi ini dapat kami perbarui dari waktu ke waktu seiring perkembangan layanan 
          dan regulasi yang berlaku. Untuk perubahan yang signifikan — misalnya yang mempengaruhi 
          cara kami menggunakan datamu secara material — kami akan memberikan pemberitahuan melalui 
          channel resmi Telegram kami setidaknya 14 hari sebelum perubahan berlaku.
        </p>
        <p>
          Tanggal "Terakhir diperbarui" di bagian atas halaman ini selalu mencerminkan versi terkini 
          dari kebijakan ini. Kami mendorong kamu untuk meninjau halaman ini secara berkala.
        </p>
      </LegalSection>

      <LegalSection title="12. Hubungi Kami">
        <p>
          Jika kamu memiliki pertanyaan, kekhawatiran, atau permintaan terkait kebijakan privasi ini 
          atau data pribadimu, kami siap mendengar:
        </p>
        <LegalList items={[
          "Bot Telegram: @kriptoecerbot — untuk pertanyaan terkait data transaksi kamu.",
          "Channel Resmi: @kriptoecerofficial — untuk pengumuman dan informasi umum.",
          "X (Twitter): @kriptoecer",
        ]} />
        <p>
          Sertakan detail yang relevan dalam pesanmu agar kami bisa membantu lebih cepat dan tepat.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
