import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
const logoImage = "/favicon.png";

export default function Privacy() {
  useEffect(() => {
    document.title = "Kebijakan Privasi | KriptoEcer";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Kebijakan privasi KriptoEcer — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pengguna layanan bot Telegram kami.");
    return () => { document.title = "KriptoEcer - Beli & Jual Crypto Eceran Mulai Rp10.000 via Telegram"; };
  }, []);

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
        <h1 className="text-3xl font-bold mb-2">Kebijakan Privasi</h1>
        <p className="text-muted-foreground mb-8">Terakhir diperbarui: Februari 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Kami mengumpulkan informasi berikut saat Anda menggunakan layanan KriptoEcer:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>ID Telegram dan username</li>
              <li>Riwayat transaksi</li>
              <li>Alamat wallet cryptocurrency</li>
              <li>Informasi pembayaran</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Penggunaan Informasi</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Memproses transaksi jual beli cryptocurrency</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Mengirim notifikasi terkait transaksi</li>
              <li>Meningkatkan kualitas layanan kami</li>
              <li>Mematuhi regulasi yang berlaku</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Perlindungan Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data Anda 
              dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. Data sensitif dienkripsi 
              dan disimpan dengan aman.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Berbagi Informasi</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. 
              Informasi hanya akan dibagikan jika:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
              <li>Diperlukan untuk memproses transaksi</li>
              <li>Diwajibkan oleh hukum atau regulasi</li>
              <li>Diperlukan untuk melindungi hak kami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Penyimpanan Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Data transaksi disimpan selama diperlukan untuk memenuhi kewajiban hukum dan operasional. 
              Anda dapat meminta penghapusan data dengan menghubungi kami, dengan catatan bahwa beberapa 
              data mungkin perlu dipertahankan untuk keperluan hukum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Hak Pengguna</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Mengakses data pribadi Anda</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan data (dengan batasan tertentu)</li>
              <li>Menarik persetujuan penggunaan data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookie dan Teknologi Pelacakan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Website kami mungkin menggunakan cookie untuk meningkatkan pengalaman pengguna. 
              Bot Telegram kami tidak menggunakan cookie, tetapi Telegram sendiri mungkin memiliki 
              kebijakan privasi tersendiri.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Perubahan Kebijakan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan 
              akan diumumkan melalui channel resmi kami. Tanggal pembaruan terakhir akan ditampilkan 
              di bagian atas halaman ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Hubungi Kami</h2>
            <p className="text-muted-foreground leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan hak 
              Anda terkait data pribadi, silakan hubungi kami melalui bot Telegram @kriptoecerbot 
              atau channel resmi kami.
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
