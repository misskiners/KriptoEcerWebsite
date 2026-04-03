import { LegalLayout, LegalSection, LegalList } from "@/components/legal-layout";

export default function Refund() {
  return (
    <LegalLayout
      title="Kebijakan Refund"
      description="Kebijakan pengembalian dana KriptoEcer — kondisi deposit tidak masuk, kelebihan bayar, transaksi gagal, cara klaim, dan jangka waktu pengajuan refund."
      lastUpdated="Maret 2026"
    >
      <LegalSection title="1. Prinsip Dasar">
        <p>
          Di KriptoEcer, kami berusaha semaksimal mungkin untuk memastikan setiap transaksi berjalan 
          lancar. Namun, kami memahami bahwa terkadang ada situasi di luar ekspektasi — deposit yang 
          tidak masuk, kelebihan bayar, atau masalah teknis yang tidak terduga.
        </p>
        <p>
          Kebijakan Refund ini menjelaskan kondisi-kondisi di mana pengembalian dana dapat dilakukan, 
          proses pengajuannya, dan jangka waktu yang diharapkan. Kami berusaha untuk adil dan transparan 
          dalam setiap kasus.
        </p>
        <p>
          Sebelum membaca lebih lanjut, ada satu hal paling penting yang perlu kamu pahami: 
          <strong> transaksi cryptocurrency yang sudah dikonfirmasi dan terkirim ke blockchain 
          bersifat permanen dan tidak bisa dibalik</strong>. Ini adalah sifat fundamental dari 
          teknologi blockchain, bukan kebijakan kami.
        </p>
      </LegalSection>

      <LegalSection title="2. Transaksi yang Sudah Diproses — Tidak Dapat Dibatalkan">
        <p>
          Berikut kondisi di mana refund <strong>tidak dapat</strong> dilakukan:
        </p>
        <LegalList items={[
          "Pembelian cryptocurrency yang sudah berhasil diproses dan crypto sudah terkirim ke wallet kamu.",
          "Penjualan cryptocurrency yang sudah selesai dan saldo Rupiah sudah dikreditkan ke akun kamu.",
          "Transaksi yang dibatalkan karena pengguna tidak mengkonfirmasi dalam batas waktu yang ditetapkan (saldo akan dikembalikan ke saldo akun bot, bukan ke metode pembayaran asal).",
          "Kerugian akibat perubahan harga pasar setelah transaksi selesai.",
          "Transaksi yang dilakukan dengan kesalahan input dari pengguna (alamat wallet salah, jumlah salah yang sudah dikonfirmasi).",
        ]} />
        <p>
          Kami sangat menyarankan kamu untuk selalu memeriksa ulang semua detail sebelum 
          mengkonfirmasi transaksi apapun.
        </p>
      </LegalSection>

      <LegalSection title="3. Kondisi di Mana Refund Dapat Dilakukan">
        <p>
          Refund atau kredit saldo dapat dilakukan dalam situasi berikut:
        </p>
        <p><strong>a. Deposit Terbayar Tapi Saldo Tidak Masuk</strong></p>
        <p>
          Jika kamu sudah melakukan pembayaran deposit (via QRIS, VA, PayPal, atau CryptoBot Telegram) 
          namun saldo tidak masuk ke akun bot dalam waktu 30 menit sejak pembayaran berhasil, kamu 
          berhak mengajukan klaim. Dalam kasus ini, kami akan menyelidiki dan jika terbukti ada 
          masalah teknis di sistem kami, dana akan dikembalikan atau dikreditkan ke saldo akun kamu.
        </p>
        <p><strong>b. Kelebihan Bayar</strong></p>
        <p>
          Jika karena bug atau kesalahan sistem kamu membayar lebih dari yang seharusnya, selisih 
          lebih akan dikembalikan ke saldo akun bot kamu atau ke metode pembayaran asal (tergantung 
          metode yang digunakan dan kebijakan payment gateway).
        </p>
        <p><strong>c. Transaksi Gagal Setelah Saldo Dipotong</strong></p>
        <p>
          Jika saldo akun kamu sudah dipotong namun crypto gagal terkirim karena masalah teknis di 
          sistem kami (bukan karena masalah jaringan blockchain eksternal), saldo akan dikembalikan 
          ke akun bot kamu dalam waktu 24 jam.
        </p>
        <p><strong>d. Penghentian Layanan oleh KriptoEcer</strong></p>
        <p>
          Jika kami memutuskan untuk menghentikan layanan atau menutup akun kamu bukan karena 
          pelanggaran dari pihak kamu, saldo yang tersisa di akun akan dikembalikan ke kamu melalui 
          mekanisme yang akan kami informasikan.
        </p>
      </LegalSection>

      <LegalSection title="4. Prosedur Pengajuan Klaim Refund">
        <p>
          Jika kamu yakin berhak mendapatkan refund berdasarkan kondisi di atas, ikuti langkah-langkah 
          berikut:
        </p>
        <LegalList items={[
          "Hubungi kami melalui @kriptoecerbot dan pilih menu bantuan/support, atau kirim pesan langsung ke channel resmi @kriptoecerofficial.",
          "Jelaskan masalah yang kamu alami secara detail — tanggal dan waktu transaksi, jumlah yang dibayarkan, dan metode pembayaran yang digunakan.",
          "Lampirkan bukti pembayaran yang valid — screenshot konfirmasi QRIS, bukti transfer VA, bukti pembayaran PayPal, atau bukti transaksi CryptoBot.",
          "Sertakan ID transaksi jika tersedia di dalam bot.",
          "Tim kami akan memverifikasi klaim dalam waktu 1-3 hari kerja.",
        ]} />
        <p>
          Klaim yang diajukan tanpa bukti yang memadai tidak dapat diproses. Kami mungkin meminta 
          informasi tambahan untuk memverifikasi identitasmu sebagai pemilik transaksi.
        </p>
      </LegalSection>

      <LegalSection title="5. Jangka Waktu Klaim">
        <p>
          Klaim refund harus diajukan dalam jangka waktu berikut:
        </p>
        <LegalList items={[
          "Deposit tidak masuk: Maksimal 7 hari kalender sejak tanggal pembayaran.",
          "Kelebihan bayar: Maksimal 14 hari kalender sejak transaksi terjadi.",
          "Transaksi gagal: Maksimal 3 hari kalender sejak transaksi gagal.",
        ]} />
        <p>
          Klaim yang diajukan di luar jangka waktu ini tidak dapat diproses kecuali ada kondisi 
          khusus yang dapat dipertimbangkan oleh tim kami.
        </p>
      </LegalSection>

      <LegalSection title="6. Metode Pengembalian Dana">
        <p>
          Pengembalian dana dilakukan berdasarkan prioritas berikut:
        </p>
        <LegalList items={[
          "Kredit ke saldo akun KriptoEcer kamu (paling cepat, biasanya dalam 24 jam setelah verifikasi).",
          "Pengembalian ke metode pembayaran asal (jika secara teknis memungkinkan oleh payment gateway). Waktu pemrosesan tergantung payment gateway, bisa 1-7 hari kerja.",
          "Transfer manual jika metode lain tidak memungkinkan — memerlukan data tambahan dan diproses dalam 3-5 hari kerja.",
        ]} />
        <p>
          Kami tidak memungut biaya untuk proses refund dari kesalahan di pihak kami. Namun, 
          biaya transaksi yang dikenakan oleh payment gateway atau jaringan blockchain (jika ada) 
          mungkin tidak dapat dikembalikan.
        </p>
      </LegalSection>

      <LegalSection title="7. Penyalahgunaan Kebijakan Refund">
        <p>
          Kami memiliki sistem deteksi untuk mengidentifikasi pengajuan refund yang tidak jujur 
          atau penyalahgunaan sistem. Pengguna yang terbukti mengajukan klaim refund secara tidak 
          jujur, atau yang mencoba memanipulasi sistem pembayaran, dapat dikenai:
        </p>
        <LegalList items={[
          "Penolakan klaim refund.",
          "Pemblokiran akun secara permanen.",
          "Pelaporan ke pihak berwenang jika tindakan tersebut masuk kategori penipuan.",
        ]} />
      </LegalSection>

      <LegalSection title="8. Hubungi Kami">
        <p>
          Jika kamu memiliki pertanyaan tentang kebijakan refund ini atau ingin mengajukan klaim, 
          jangan ragu untuk menghubungi kami:
        </p>
        <LegalList items={[
          "Bot Telegram: @kriptoecerbot",
          "Channel Resmi: @kriptoecerofficial",
          "X (Twitter): @kriptoecer",
        ]} />
        <p>
          Kami berkomitmen untuk menangani setiap klaim dengan adil dan secepat mungkin. 
          Kepercayaan kamu adalah prioritas utama kami.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
