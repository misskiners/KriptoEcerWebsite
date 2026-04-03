import { LegalLayout, LegalSection, LegalList } from "@/components/legal-layout";
import { Shield, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function Risk() {
  return (
    <LegalLayout
      title="Pengungkapan Risiko"
      description="Pahami risiko jual beli crypto di KriptoEcer sebelum bertransaksi — volatilitas harga, risiko teknologi, regulasi, dan likuiditas dijelaskan secara transparan."
      lastUpdated="Maret 2026"
      icon={<AlertTriangle className="w-6 h-6" />}
    >
      <section className="p-5 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Penting untuk dibaca:</strong> Dokumen ini bukan untuk 
            menakut-nakuti, tapi untuk memastikan kamu membuat keputusan yang terinformasi. Cryptocurrency 
            adalah aset dengan risiko tinggi. Hanya gunakan dana yang kamu siap kehilangan sepenuhnya.
          </p>
        </div>
      </section>

      <LegalSection title="1. Apa Itu Pengungkapan Risiko?">
        <p>
          Sebelum kamu mulai bertransaksi di KriptoEcer, kami ingin memastikan kamu paham bahwa 
          investasi dan perdagangan cryptocurrency mengandung risiko yang sangat berbeda — dan 
          umumnya jauh lebih tinggi — dibandingkan instrumen keuangan konvensional seperti deposito 
          bank atau reksa dana.
        </p>
        <p>
          Dokumen Pengungkapan Risiko ini adalah bagian dari komitmen transparansi kami. Kami tidak 
          ingin kamu terkejut di kemudian hari. Membaca dokumen ini sampai selesai adalah keputusan 
          yang baik sebelum kamu melakukan deposit pertama.
        </p>
        <p>
          KriptoEcer berposisi sebagai <strong>fasilitator pertukaran</strong>, bukan penasihat keuangan. 
          Kami tidak memberikan saran investasi, tidak memprediksi pergerakan harga, dan tidak 
          bertanggung jawab atas keputusan finansial yang kamu ambil.
        </p>
      </LegalSection>

      <LegalSection title="2. Risiko Volatilitas Harga">
        <p>
          Ini adalah risiko paling utama dalam dunia crypto. Harga aset digital bisa bergerak secara 
          dramatis dalam waktu yang sangat singkat — naik atau turun puluhan persen dalam hitungan jam.
        </p>
        <LegalList items={[
          "Harga Bitcoin pernah turun lebih dari 80% dalam waktu kurang dari setahun, dan juga naik ribuan persen dalam periode tertentu.",
          "Altcoin (cryptocurrency selain Bitcoin) umumnya memiliki volatilitas yang jauh lebih tinggi dari Bitcoin.",
          "Berita, regulasi pemerintah, pernyataan tokoh berpengaruh, atau bahkan rumor bisa menyebabkan pergerakan harga yang ekstrem.",
          "Rate yang ditampilkan di bot adalah harga saat itu juga (real-time). Tidak ada jaminan harga akan sama di menit berikutnya.",
          "Setelah transaksi selesai, nilai crypto yang kamu terima bisa naik atau turun signifikan sebelum kamu sempat menggunakannya.",
        ]} />
        <p>
          KriptoEcer tidak dapat dan tidak akan memberikan jaminan apapun terkait pergerakan harga 
          di masa depan. Keputusan untuk membeli atau menjual sepenuhnya ada di tanganmu.
        </p>
      </LegalSection>

      <LegalSection title="3. Risiko Teknologi dan Operasional">
        <p>
          Cryptocurrency dan layanan yang mendukungnya bergantung sepenuhnya pada teknologi. 
          Ini membawa risiko tersendiri:
        </p>
        <LegalList items={[
          "Jaringan blockchain bisa mengalami kemacetan (kongesti) yang menyebabkan transaksi tertunda lebih lama dari biasanya.",
          "Gangguan teknis pada sistem kami, payment gateway, atau Telegram sendiri bisa menyebabkan keterlambatan layanan.",
          "Smart contract atau protokol blockchain pihak ketiga yang terkait dengan aset tertentu mungkin mengandung bug atau kerentanan.",
          "Serangan siber (hacking, phishing, dll) adalah ancaman nyata di ekosistem crypto. Meskipun kami menjaga keamanan sistem kami, tidak ada sistem yang 100% kebal.",
          "Kehilangan akses ke akun Telegram atau perangkat kamu bisa menyebabkan kesulitan mengakses layanan kami.",
        ]} />
      </LegalSection>

      <LegalSection title="4. Risiko Regulasi">
        <p>
          Regulasi cryptocurrency di Indonesia dan di seluruh dunia masih terus berkembang dan bisa 
          berubah sewaktu-waktu. Perubahan regulasi bisa berdampak signifikan pada layanan kami 
          dan nilai aset yang kamu miliki.
        </p>
        <LegalList items={[
          "Pemerintah Indonesia atau otoritas keuangan dapat sewaktu-waktu membatasi, melarang, atau mengatur penggunaan cryptocurrency secara lebih ketat.",
          "Perubahan pajak atas keuntungan crypto bisa mempengaruhi nilai bersih investasimu.",
          "Regulasi di negara lain juga bisa mempengaruhi likuiditas dan nilai aset crypto secara global.",
          "Dalam kondisi perubahan regulasi mendadak, kami mungkin terpaksa menghentikan atau membatasi layanan tanpa pemberitahuan panjang.",
          "KriptoEcer akan selalu berupaya untuk mematuhi regulasi yang berlaku dan akan menginformasikan pengguna mengenai perubahan material yang mempengaruhi layanan.",
        ]} />
      </LegalSection>

      <LegalSection title="5. Risiko Transaksi">
        <p>
          Ada beberapa risiko spesifik yang berkaitan langsung dengan proses transaksi di KriptoEcer:
        </p>
        <LegalList items={[
          "Salah memasukkan alamat wallet tujuan: Transaksi blockchain bersifat irreversible — jika kamu mengirim crypto ke alamat yang salah, tidak ada cara untuk memulihkannya.",
          "Rate kadaluarsa: Rate harga yang ditampilkan berlaku untuk waktu terbatas. Jika kamu terlalu lama mengkonfirmasi, rate bisa sudah berubah.",
          "Deposit ke jaringan yang salah: Pastikan kamu mengirim deposit sesuai dengan jaringan blockchain yang diminta. Kesalahan jaringan umumnya tidak bisa dipulihkan.",
          "Transaksi minimum dan maksimum: Beberapa transaksi mungkin gagal jika tidak memenuhi batas minimum atau melebihi batas maksimum yang berlaku.",
          "Keterlambatan blockchain: Waktu konfirmasi transaksi di blockchain bergantung pada kondisi jaringan, bukan sistem kami.",
        ]} />
      </LegalSection>

      <LegalSection title="6. Risiko Likuiditas">
        <p>
          Likuiditas mengacu pada kemudahan untuk mengkonversi aset kembali menjadi uang tunai 
          atau aset lain:
        </p>
        <LegalList items={[
          "Beberapa altcoin yang tersedia di KriptoEcer mungkin memiliki volume perdagangan yang rendah di pasar, yang bisa membuat sulit untuk menjual kembali dengan harga yang diinginkan.",
          "Dalam kondisi pasar yang sangat volatile atau krisis, likuiditas pasar crypto secara umum bisa menurun drastis.",
          "KriptoEcer mungkin tidak selalu memiliki likuiditas untuk semua aset dalam semua kondisi. Ketersediaan aset tertentu bisa berubah.",
        ]} />
      </LegalSection>

      <LegalSection title="7. Risiko yang Tidak Dapat Kami Kendalikan">
        <p>
          Ada risiko-risiko yang sepenuhnya berada di luar kendali kami dan menjadi tanggung jawab 
          pengguna sepenuhnya:
        </p>
        <LegalList items={[
          "Keamanan perangkat dan akun Telegram kamu sendiri — jika perangkatmu diretas atau akun Telegram-mu dikompromikan, aset yang terkait bisa dalam bahaya.",
          "Penggunaan layanan ini untuk tujuan yang melanggar hukum — risiko hukum sepenuhnya ditanggung oleh pengguna.",
          "Keputusan investasi berdasarkan informasi dari pihak ketiga, grup Telegram, media sosial, atau sumber lainnya yang tidak terkait dengan KriptoEcer.",
          "Kehilangan private key atau seed phrase wallet eksternalmu — KriptoEcer tidak memiliki akses ke wallet eksternalmu dan tidak bisa memulihkan akses.",
        ]} />
      </LegalSection>

      <LegalSection title="8. Pernyataan Akhir">
        <p>
          Dengan menggunakan layanan KriptoEcer, kamu menyatakan bahwa:
        </p>
        <LegalList items={[
          "Kamu telah membaca dan memahami risiko-risiko yang dijelaskan dalam dokumen ini.",
          "Kamu menggunakan dana pribadi yang bukan merupakan pinjaman atau dana yang tidak mampu kamu risiko kehilangan.",
          "Kamu tidak bergantung pada rekomendasi atau saran dari KriptoEcer dalam membuat keputusan transaksi.",
          "Kamu memahami bahwa kinerja masa lalu tidak menjamin kinerja di masa depan.",
          "Kamu bertanggung jawab penuh atas semua keputusan transaksi yang kamu buat melalui platform kami.",
        ]} />
        <p>
          Jika kamu merasa belum sepenuhnya memahami risiko yang terlibat, atau jika kamu ragu 
          apakah crypto cocok untuk situasi keuanganmu, kami menyarankan untuk berkonsultasi dengan 
          penasihat keuangan profesional yang independen sebelum memulai.
        </p>
        <p>
          KriptoEcer peduli dengan keberlanjutan penggunamu. Kami ingin kamu tetap bisa menikmati 
          layanan ini dalam jangka panjang — dan itu hanya mungkin kalau kamu berinvestasi dengan bijak.
        </p>
        <p>
          Untuk memahami hak dan kewajiban lebih lanjut, baca juga{" "}
          <Link href="/terms" className="text-primary hover:underline">Syarat & Ketentuan</Link> dan{" "}
          <Link href="/refund" className="text-primary hover:underline">Kebijakan Refund</Link> kami.
        </p>
      </LegalSection>

      <LegalSection title="9. Hubungi Kami">
        <p>
          Ada pertanyaan tentang risiko layanan ini, atau butuh klarifikasi sebelum mulai bertransaksi? 
          Jangan ragu untuk menghubungi kami:
        </p>
        <LegalList items={[
          "Bot Telegram: @kriptoecerbot — untuk pertanyaan terkait transaksi.",
          "Channel Resmi: @kriptoecerofficial — untuk pengumuman dan informasi umum.",
          "X (Twitter): @kriptoecer",
        ]} />
      </LegalSection>
    </LegalLayout>
  );
}
