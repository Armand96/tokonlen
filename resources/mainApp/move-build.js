const fs = require("fs-extra");
const path = require("path");

const source = path.join(__dirname, "out"); // Hasil export Next.js
const destination = path.join(__dirname, "../../public/mainApp"); // Folder tujuan di Laravel

(async () => {
  try {
    console.log("🚀 Menghapus folder lama di public/mainApp...");
    await fs.remove(destination);

    console.log("📂 Memindahkan hasil build ke public/mainApp...");
    await fs.copy(source, destination);

    console.log("✅ Next.js berhasil dipindahkan ke Laravel!");
  } catch (err) {
    console.error("❌ Gagal memindahkan Next.js:", err);
  }
})();
