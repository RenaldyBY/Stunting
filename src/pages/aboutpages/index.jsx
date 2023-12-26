const About = () => {
    const team = [
      {
        nama: "Ahmad Farhan Kholik",
        image:
          "https://greatnusa.com/wp-content/uploads/2023/05/Contoh-profesionalisme-1200x900.webp",
      },
      {
        nama: "Hanifah Eka Cahyani",
        image:
          "https://greatnusa.com/wp-content/uploads/2023/05/Contoh-profesionalisme-1200x900.webp",
      },
      {
        nama: "Hesti Lusita",
        image:
          "https://greatnusa.com/wp-content/uploads/2023/05/Contoh-profesionalisme-1200x900.webp",
      },
      {
        nama: "Moch Dapa Adhari",
        image:
          "https://greatnusa.com/wp-content/uploads/2023/05/Contoh-profesionalisme-1200x900.webp",
      },
      {
        nama: "Renaldy Baleano Yohzain",
        image:
          "https://greatnusa.com/wp-content/uploads/2023/05/Contoh-profesionalisme-1200x900.webp",
      },
    ];
  
    const aboutDesc = [
      "StuntGuard memungkinkan pengguna untuk mendaftar secara manual dan memasukkan data perkembangan anak mereka, atau menggunakan fitur    dukungan digital yang kami sediakan. Setelah registrasi dan entri data berhasil, setiap pengguna akan memiliki akses ke riwayat    kesehatan anak mereka di platform.",
      "Platform ini bertujuan untuk memungkinkan organisasi layanan kesehatan mengakses dan menganalisis data kesehatan anak secara    komprehensif dengan mudah. Para profesional layanan kesehatan dapat dengan cepat meninjau riwayat kesehatan anak, memperoleh    informasi yang relevan, dan membuat keputusan yang lebih baik mengenai perawatan dan perkembangan anak.",
      "Tujuan StuntGuard adalah untuk meningkatkan kesadaran tentang kesehatan anak-anak, memberikan alat yang dapat diandalkan kepada    orang tua, dan membantu penyedia layanan kesehatan memberikan pelayanan yang lebih baik kepada mereka.Dan memastikan bahwa    setiap anak menerima layanan kesehatan yang optimal untuk pertumbuhan dan perkembangan yang sehat",
    ];
  
    return (
      <div>
        <section className=" flex flex-col items-center justify-center py-32 gap-10">
          <div className="flex flex-col gap-3 items-center">
            <h1
              className="text-6xl font-black leading-relaxed text-center text-gray-900"
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              About Us
            </h1>
            <p className="text-[#6B7280] text-xl w-8/12 text-center">
              Here at flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-primary px-5 py-3 rounded-lg text-white font-semibold">
              Get Started
            </button>
            <button className="border-primary border px-5 py-3 rounded-lg text-primary font-semibold">
              Protect now
            </button>
          </div>
        </section>
  
        <section className="flex lg:flex-row flex-col container mx-auto items-center justify-center gap-16 py-32 px-10">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-gray-900 lg:text-6xl text-4xl font-black pb-5">
              StuntGuard Is ?
            </h1>
            <div className="flex flex-col text-gray-500 lg:text-xl text-base gap-5">
              {aboutDesc.map((item, index) => (
                <p key={index} className="indent-0 lg:indent-8">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="md:w-[375px] w-[280px] md:h-[375px] h-[280px]">
            <img
              src="https://play-lh.googleusercontent.com/qw7ES8XLlRV1tbFRNfQNpXpJbS8jxKAaxODep8PIxJcvJSKXE6Lhv7NuyHroJWdo2XG0=w240-h480-rw"
              alt="icon-stunting"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
  
        <section className="bg-slate-400 pt-16 pb-20">
        <h1 className="lg:text-xl font-black leading-relaxed text-center text-gray-900 pb-24 text-3xl">
            Our Team
          </h1>
          <h1 className="lg:text-5xl font-black leading-relaxed text-center text-gray-900 pb-24 text-3xl">
            Our Professinal Team
          </h1>
          <div className="container mx-auto px-10">
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-10 gap-y-20">
              {team.map((item, index) => (
                <div key={index} className="relative">
                  <div className="w-auto h-[375px]">
                    <img
                      src={item.image}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white absolute -bottom-10 w-10/12 left-1/2 -translate-x-1/2 text-center px-2 py-5 rounded-lg">
                    <h1 className="font-bold text-[#333]">{item.nama}</h1>
                    <p className="text-xs text-[#333]">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default About;
  
  
