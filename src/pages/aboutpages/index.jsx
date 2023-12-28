import Logo from "../../assets/About.png";
const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  { name: 'Material', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
]

export default function index() {
  return (
    <div className="bg-violet-100 ">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 ">
      <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={Logo}
            alt="StuntingGuard"
            className="rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">StuntGuard Is ?</h2>
          <div className="mt-4 text-gray-500 border-t text-pretty">
              <p>StuntGuard memungkinkan pengguna untuk mendaftar secara manual dan memasukkan data perkembangan anak mereka, atau menggunakan fitur dukungan digital yang kami sediakan. Setelah registrasi dan entri data berhasil, setiap pengguna akan memiliki akses ke riwayat kesehatan anak mereka di platform.</p>
          </div>
          <div className="mt-4 text-gray-500 text-pretty">
              <p>StuntGuard memungkinkan pengguna untuk mendaftar secara manual dan memasukkan data perkembangan anak mereka, atau menggunakan fitur dukungan digital yang kami sediakan. Setelah registrasi dan entri data berhasil, setiap pengguna akan memiliki akses ke riwayat kesehatan anak mereka di platform.</p>
          </div>
          <div className="mt-4 text-gray-500  text-pretty">
              <p>StuntGuard memungkinkan pengguna untuk mendaftar secara manual dan memasukkan data perkembangan anak mereka, atau menggunakan fitur dukungan digital yang kami sediakan. Setelah registrasi dan entri data berhasil, setiap pengguna akan memiliki akses ke riwayat kesehatan anak mereka di platform.</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}
