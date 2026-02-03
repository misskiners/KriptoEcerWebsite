import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
const logoImage = "/favicon.png";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoImage} alt="KriptoEcer" className="w-8 h-8 rounded-md" />
            <span className="text-base font-bold tracking-tight">KriptoEcer</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Syarat dan Ketentuan</h1>
        <p className="text-muted-foreground mb-8">Terakhir diperbarui: Februari 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Pendahuluan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Selamat datang di KriptoEcer. Dengan menggunakan layanan bot Telegram kami (@kriptoecerbot), 
              Anda menyetujui untuk terikat dengan syarat dan ketentuan berikut. Mohon baca dengan seksama 
              sebelum menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Definisi Layanan</h2>
            <p className="text-muted-foreground leading-relaxed">
              KriptoEcer adalah platform yang memfasilitasi jual beli cryptocurrency dalam nominal kecil 
              (eceran) melalui bot Telegram. Kami menyediakan layanan pertukaran crypto dengan Rupiah 
              Indonesia untuk berbagai jenis aset digital.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Persyaratan Pengguna</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Pengguna harus berusia minimal 18 tahun</li>
              <li>Pengguna harus memiliki akun Telegram yang valid</li>
              <li>Pengguna bertanggung jawab atas keamanan akun mereka</li>
              <li>Pengguna wajib memberikan informasi yang akurat dan benar</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Transaksi</h2>
            <p className="text-muted-foreground leading-relaxed">
              Semua transaksi yang dilakukan melalui KriptoEcer bersifat final dan tidak dapat dibatalkan 
              setelah dikonfirmasi. Harga cryptocurrency dapat berfluktuasi dan kami tidak bertanggung jawab 
              atas perubahan harga setelah transaksi selesai.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Biaya dan Pembayaran</h2>
            <p className="text-muted-foreground leading-relaxed">
              Biaya layanan akan ditampilkan secara transparan sebelum Anda mengkonfirmasi transaksi. 
              Pembayaran dilakukan melalui metode yang tersedia di bot. Kami berhak mengubah struktur 
              biaya dengan pemberitahuan sebelumnya.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Batasan Tanggung Jawab</h2>
            <p className="text-muted-foreground leading-relaxed">
              KriptoEcer tidak bertanggung jawab atas kerugian yang timbul akibat fluktuasi harga, 
              kesalahan pengguna dalam memasukkan alamat wallet, atau gangguan teknis di luar kendali kami. 
              Pengguna bertanggung jawab penuh atas keputusan investasi mereka.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Keamanan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami berkomitmen menjaga keamanan data dan transaksi Anda. Namun, pengguna juga harus 
              menjaga kerahasiaan informasi akun mereka dan tidak membagikan data sensitif kepada pihak lain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Perubahan Ketentuan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diumumkan 
              melalui channel resmi kami. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan 
              terhadap ketentuan baru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Kontak</h2>
            <p className="text-muted-foreground leading-relaxed">
              Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami 
              melalui bot Telegram @kriptoecerbot atau channel resmi kami.
            </p>
          </section>
        </div>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KriptoEcer. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
