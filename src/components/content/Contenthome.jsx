import Child1 from "../../assets/child1.jpg";
import Child2 from "../../assets/child1.jpg";
const content = [
  { id: 1, title: 'Stunting Is', description: 'Stunting adalah kondisi ketika anak tidak mencapai tinggi badan yang seharusnya karena kekurangan gizi selama masa pertumbuhan awal, terutama pada 1.000 hari pertama kehidupan. Orangtua perlu memberikan makanan bergizi sejak dini untuk mencegah stunting dan memastikan pertumbuhan optimal anak.', img: Child1 },
  { id: 2, title: 'Prevention', description: 'Orang tua dapat mencegah stunting dengan memberikan makanan bergizi kepada anak, memberikan perhatian gizi selama kehamilan, memastikan sanitasi yang baik, dan mengakses layanan kesehatan secara teratur untuk pemeriksaan dan konsultasi.', img: Child2 },
]

export default function Contenthome() {
  return (
    <div className="bg-white">
      {content.map((post) => (
        <div key={post.id} className="max-w-screen-xl px-4 py-8 mx-auto space-y-2 lg:space-y-8 lg:py-24 lg:px-6">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h2>
              <p className="mt-4 text-gray-500">
                {post.description}
              </p>
            </div>

            <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">
              <img
                src={post.img}
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes. shadow-black-500/50"
                className="rounded-lg bg-gray-100 md:h-full md:w-100 "
              />
            </div>

          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">
              <img
                src={post.img}
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                className="rounded-lg bg-gray-100 md:h-full md:w-100 shadow-lg shadow-black-500/50 "
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-right">{post.title}</h2>
              <p className="mt-4 text-gray-500  text-right">
                {post.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

