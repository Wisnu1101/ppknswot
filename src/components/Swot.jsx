import { useState } from 'react'
import { cn } from './ui/vercel-tabs'

const swotData = {
  S: {
    title: 'STRENGTHS',
    subtitle: 'Kekuatan Internal',
    items: [
      {
        title: 'Pancasila sebagai Ideologi Pemersatu dan Falsafah Bangsa',
        desc: 'Pancasila menjadi fondasi utama, identitas nasional, serta nilai luhur yang mampu menyatukan seluruh keragaman suku, agama, ras, dan budaya di Indonesia.',
        example: 'Masyarakat Indonesia yang sangat beragam tetap hidup rukun dan berdampingan dalam bingkai NKRI berkat prinsip Bhinneka Tunggal Ika dan nilai-nilai Pancasila.'
      },
      {
        title: 'Letak Geografis yang Strategis dan Luas Wilayah Maritim',
        desc: 'Posisi Indonesia di antara dua samudra dan dua benua serta wilayah perairan yang sangat luas memberikan keuntungan geopolitik dan potensi ekonomi maritim yang besar.',
        example: 'Indonesia menjadi jalur perdagangan internasional (seperti Selat Malaka) dan kaya akan sumber daya hasil laut.'
      },
      {
        title: 'Bonus Demografi',
        desc: 'Mayoritas penduduk Indonesia berada dalam usia produktif, yang menjadi modal sosial dan ekonomi berharga untuk mendorong kemajuan bangsa.',
        example: 'Melimpahnya tenaga kerja muda, inovator, serta wirausahawan produktif di sektor industri kreatif dan teknologi modern.'
      },
      {
        title: 'Kemajemukan, Keberagaman Budaya & Tradisi Gotong Royong',
        desc: 'Kekayaan tradisi, kearifan lokal, dan sifat gotong royong serta kepedulian sosial merupakan modal sosial utama bangsa Indonesia.',
        example: 'Tradisi gotong royong seperti sinoman (Jawa), nganggung (Bangka), marsialapari (Mandailing), serta aksi solidaritas saat bencana alam.'
      },
      {
        title: 'Sumber Daya Alam (SDA)',
        desc: 'Indonesia memiliki tingkat keanekaragaman hayati darat dan laut terbesar di dunia.',
        example: 'Memiliki hutan hujan tropis yang luas (paru-paru dunia), fauna atau flora endemik, serta potensi obat-obatan alami.'
      },
      {
        title: 'Kekuatan Militer dan Pertahanan Negara',
        desc: 'Kesiapan pertahanan nasional serta kekuatan militer (TNI) yang tangguh dalam menjaga kedaulatan wilayah NKRI.',
        example: 'Keberadaan militer Indonesia yang diakui ketangguhannya di tingkat regional maupun internasional.'
      },
      {
        title: 'Potensi Pertumbuhan Pariwisata',
        desc: 'Keindahan alam, kebudayaan yang unik, dan keramahan masyarakat menjadi daya tarik pariwisata berkelas dunia.',
        example: 'Destinasi wisata alam dan budaya seperti Bali, Raja Ampat, Danau Toba, dan Labuan Bajo yang menarik wisatawan domestik maupun mancanegara.'
      }
    ],
    color: 'bg-[#bef264]',
    textColor: 'text-slate-900',
  },
  W: {
    title: 'WEAKNESSES',
    subtitle: 'Kelemahan Internal',
    items: [
      {
        title: 'Sumber Daya Manusia (SDM) yang Rendah',
        desc: 'Kualitas kesehatan dan pendidikan Indonesia tertinggal jauh dari negara tetangga, dengan Indeks Modal Manusia (HCI) sebesar 0,54 dan pasar kerja didominasi pekerja berkeahlian rendah.',
        example: 'Masih tingginya kasus anak balita yang mengalami stunting di berbagai daerah.'
      },
      {
        title: 'Pembangunan yang Tidak Merata',
        desc: 'Aktivitas pembangunan nasional selama puluhan tahun terkonsentrasi di Pulau Jawa, sehingga memicu ketimpangan ekonomi wilayah.',
        example: 'Pulau Jawa masih menjadi pusat perekonomian nasional yang menyumbang 58,48 persen dari total PDB Indonesia.'
      },
      {
        title: 'Kesenjangan Ekonomi yang Tinggi',
        desc: 'Pendapatan dan aset nasional belum terdistribusi merata, yang ditunjukkan oleh peningkatan Indeks Gini Indonesia menjadi 39,0.',
        example: 'Hampir separuh aset nasional Indonesia hanya dikuasai oleh 1 persen dari total jumlah penduduk.'
      },
      {
        title: 'Pengelolaan SDA Belum Maksimal',
        desc: 'Potensi SDA yang melimpah, termasuk sektor maritim, belum dikelola secara maksimal untuk kemakmuran rakyat.',
        example: 'Potensi kekayaan laut Indonesia yang bernilai sekitar Rp17 ribu triliun per tahun belum sepenuhnya dikelola secara optimal.'
      },
      {
        title: 'Korupsi yang Masih Merajalela',
        desc: 'Praktik korupsi oleh oknum pejabat dan penegak hukum menimbulkan kerugian besar bagi keuangan negara.',
        example: 'ICW mencatat potensi kerugian negara akibat korupsi pada tahun 2021 saja mencapai Rp29,4 triliun.'
      },
      {
        title: 'Pungutan Liar (Pungli) di Berbagai Instansi',
        desc: 'Lemahnya integritas di sektor pelayanan publik memicu maraknya praktik meminta uang di luar ketentuan resmi.',
        example: 'Instansi pemerintah daerah dan lembaga pendidikan negeri menduduki peringkat teratas yang paling banyak dilaporkan terkait pungli.'
      },
      {
        title: 'Kerawanan Bencana Alam',
        desc: 'Letak geografis Indonesia di jalur Cincin Api Pasifik membuatnya sangat rentan terhadap bencana alam yang merusak ekonomi dan infrastruktur.',
        example: 'Sepanjang tahun 2022 tercatat terjadi 3.544 total bencana alam di Indonesia yang menimbulkan korban jiwa.'
      }
    ],
    color: 'bg-[#fde047]',
    textColor: 'text-slate-900',
  },
  O: {
    title: 'OPPORTUNITIES',
    subtitle: 'Peluang Eksternal',
    items: [
      {
        title: 'Perkembangan Teknologi dan Ekonomi Digital',
        desc: 'Perkembangan teknologi memberikan peluang bagi Indonesia untuk mengembangkan ekonomi digital, industri kreatif, dan inovasi yang dapat meningkatkan daya saing bangsa.',
        example: 'Generasi muda dapat memanfaatkan media sosial, marketplace, dan platform digital untuk mempromosikan produk lokal ke pasar internasional.'
      },
      {
        title: 'Pertumbuhan Industri Kreatif',
        desc: 'Keberagaman budaya Indonesia dapat menjadi sumber inspirasi untuk mengembangkan industri kreatif seperti desain, musik, film, kuliner, fesyen, dan kerajinan.',
        example: 'Batik, tenun, kerajinan daerah, dan kuliner khas Indonesia dapat dikembangkan menjadi produk kreatif yang bernilai ekonomi di dunia.'
      },
      {
        title: 'Peluang Kerja Sama Internasional',
        desc: 'Hubungan Indonesia dengan negara lain membuka peluang dalam bidang pendidikan, ekonomi, teknologi, budaya, dan perdagangan.',
        example: 'Pelajar dan mahasiswa dapat mengikuti program pertukaran pelajar atau kerja sama pendidikan dengan negara lain.'
      },
      {
        title: 'Pengembangan Pariwisata Berbasis Budaya dan Alam',
        desc: 'Kekayaan alam dan budaya Indonesia dapat dikembangkan menjadi pariwisata berkelanjutan sekaligus memperkenalkan identitas bangsa.',
        example: 'Destinasi seperti Bali, Raja Ampat, Danau Toba dapat dikembangkan dengan tetap menjaga lingkungan serta budaya setempat.'
      },
      {
        title: 'Pelestarian Budaya melalui Teknologi Digital',
        desc: 'Teknologi dapat digunakan sebagai sarana untuk mendokumentasikan, mengenalkan, dan melestarikan budaya Indonesia agar tetap dikenal.',
        example: 'Budaya daerah seperti tarian, bahasa, dan cerita rakyat dapat diperkenalkan melalui website dan media sosial.'
      },
      {
        title: 'Peningkatan Kualitas Sumber Daya Manusia',
        desc: 'Bonus demografi menjadi peluang untuk meningkatkan kualitas generasi muda melalui pendidikan, pelatihan, dan penguasaan teknologi.',
        example: 'Generasi muda dapat mengikuti pelatihan keterampilan digital sehingga mampu menciptakan inovasi dan lapangan kerja.'
      },
      {
        title: 'Penguatan Produk Lokal ke Pasar Global',
        desc: 'Kemajuan perdagangan dan teknologi memberikan kesempatan bagi produk Indonesia untuk menjangkau konsumen di berbagai negara.',
        example: 'UMKM dapat memasarkan produk seperti makanan, pakaian, kerajinan melalui platform digital hingga ke pasar internasional.'
      }
    ],
    color: 'bg-purple-300',
    textColor: 'text-slate-900',
  },
  T: {
    title: 'THREATS',
    subtitle: 'Ancaman Eksternal',
    items: [
      {
        title: 'Masuknya Ideologi dari Luar',
        desc: 'Kemajuan teknologi memudahkan masuknya ideologi seperti konsumerisme, radikalisme, dan terorisme yang dapat memengaruhi pola pikir masyarakat.',
        example: 'Masyarakat menjadi konsumtif karena membeli barang hanya untuk mengikuti tren di media sosial.'
      },
      {
        title: 'Ancaman terhadap Keamanan Data Pribadi',
        desc: 'Penggunaan teknologi yang semakin luas membuat data pribadi seperti NIK, identitas, dan lokasi berisiko disalahgunakan.',
        example: 'Data pribadi dicuri dan digunakan untuk penipuan atau membuat akun palsu.'
      },
      {
        title: 'Penyeragaman Budaya',
        desc: 'Globalisasi membuat budaya asing semakin mudah masuk dan dapat memengaruhi kecintaan masyarakat terhadap budaya Indonesia.',
        example: 'Generasi muda lebih mengikuti budaya K-pop atau film Hollywood hingga kurang mengenal budaya daerah sendiri.'
      },
      {
        title: 'Stereotip Negatif terhadap Indonesia',
        desc: 'Indonesia masih menghadapi pandangan bahwa negara ini tertinggal atau miskin, yang dapat memengaruhi citra Indonesia di mata dunia.',
        example: 'Produk dan karya Indonesia terkadang dianggap kurang berkualitas dibandingkan produk dari negara lain.'
      }
    ],
    color: 'bg-rose-300',
    textColor: 'text-slate-900',
  }
}

export default function Swot() {
  const [activeTab, setActiveTab] = useState(null)

  const handleTabClick = (tab) => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <section id="swot" className="scroll-mt-16 py-24 bg-grid-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-16 text-right" style={{ zoom: 0.9 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Analisis <span className="text-purple-700">SWOT</span>
          </h2>
          <div className="inline-block mt-1 rounded-[10px] border-[2.5px] border-[#11172E] bg-[#FAF8EC] px-5 py-2 shadow-[4px_4px_0px_0px_#11172E]">
            <p className="text-xs sm:text-sm md:text-base font-bold text-slate-900 tracking-tight">
              Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-end gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* SWOT Diamond Grid */}
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex-shrink-0">
            {/* Center SWOT Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all pointer-events-none flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-slate-900 rounded-2xl rotate-45 shadow-[4px_4px_0px_0px_#0f172a]">
              <span className="-rotate-45 font-black text-slate-900 text-lg sm:text-xl tracking-widest">SWOT</span>
            </div>

            {/* S - Top */}
            <button
              onClick={() => handleTabClick('S')}
              className={cn(
                'absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-slate-900 rotate-45 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 outline-none focus:ring-4 focus:ring-purple-500/50',
                swotData.S.color,
                'translate-x-[-50%] translate-y-[calc(-50%-64px)] sm:translate-y-[calc(-50%-76px)]',
                activeTab === 'S' 
                  ? 'translate-y-[calc(-50%-60px)] sm:translate-y-[calc(-50%-72px)] shadow-none opacity-100' 
                  : 'shadow-[6px_6px_0px_0px_#0f172a] opacity-60 hover:opacity-90 hover:translate-y-[calc(-50%-68px)] sm:hover:translate-y-[calc(-50%-80px)] hover:shadow-[8px_8px_0px_0px_#0f172a] active:translate-y-[calc(-50%-60px)] sm:active:translate-y-[calc(-50%-72px)] active:shadow-none'
              )}
            >
              <span className={cn('-rotate-45 font-black text-3xl', swotData.S.textColor)}>S</span>
            </button>

            {/* W - Left */}
            <button
              onClick={() => handleTabClick('W')}
              className={cn(
                'absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-slate-900 rotate-45 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 outline-none focus:ring-4 focus:ring-purple-500/50',
                swotData.W.color,
                'translate-x-[calc(-50%-64px)] sm:translate-x-[calc(-50%-76px)] translate-y-[-50%]',
                activeTab === 'W'
                  ? 'translate-x-[calc(-50%-60px)] sm:translate-x-[calc(-50%-72px)] translate-y-[calc(-50%+4px)] shadow-none opacity-100'
                  : 'shadow-[6px_6px_0px_0px_#0f172a] opacity-60 hover:opacity-90 hover:translate-x-[calc(-50%-68px)] sm:hover:translate-x-[calc(-50%-80px)] hover:translate-y-[calc(-50%-4px)] hover:shadow-[8px_8px_0px_0px_#0f172a] active:translate-x-[calc(-50%-60px)] sm:active:translate-x-[calc(-50%-72px)] active:translate-y-[calc(-50%+4px)] active:shadow-none'
              )}
            >
              <span className={cn('-rotate-45 font-black text-3xl', swotData.W.textColor)}>W</span>
            </button>

            {/* O - Right */}
            <button
              onClick={() => handleTabClick('O')}
              className={cn(
                'absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-slate-900 rotate-45 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 outline-none focus:ring-4 focus:ring-purple-500/50',
                swotData.O.color,
                'translate-x-[calc(-50%+64px)] sm:translate-x-[calc(-50%+76px)] translate-y-[-50%]',
                activeTab === 'O'
                  ? 'translate-x-[calc(-50%+60px)] sm:translate-x-[calc(-50%+72px)] translate-y-[calc(-50%+4px)] shadow-none opacity-100'
                  : 'shadow-[6px_6px_0px_0px_#0f172a] opacity-60 hover:opacity-90 hover:translate-x-[calc(-50%+68px)] sm:hover:translate-x-[calc(-50%+80px)] hover:translate-y-[calc(-50%-4px)] hover:shadow-[8px_8px_0px_0px_#0f172a] active:translate-x-[calc(-50%+60px)] sm:active:translate-x-[calc(-50%+72px)] active:translate-y-[calc(-50%+4px)] active:shadow-none'
              )}
            >
              <span className={cn('-rotate-45 font-black text-3xl', swotData.O.textColor)}>O</span>
            </button>

            {/* T - Bottom */}
            <button
              onClick={() => handleTabClick('T')}
              className={cn(
                'absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-slate-900 rotate-45 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 outline-none focus:ring-4 focus:ring-purple-500/50',
                swotData.T.color,
                'translate-x-[-50%] translate-y-[calc(-50%+64px)] sm:translate-y-[calc(-50%+76px)]',
                activeTab === 'T'
                  ? 'translate-y-[calc(-50%+60px)] sm:translate-y-[calc(-50%+72px)] shadow-none opacity-100'
                  : 'shadow-[6px_6px_0px_0px_#0f172a] opacity-60 hover:opacity-90 hover:translate-y-[calc(-50%+68px)] sm:hover:translate-y-[calc(-50%+80px)] hover:shadow-[8px_8px_0px_0px_#0f172a] active:translate-y-[calc(-50%+60px)] sm:active:translate-y-[calc(-50%+72px)] active:shadow-none'
              )}
            >
              <span className={cn('-rotate-45 font-black text-3xl', swotData.T.textColor)}>T</span>
            </button>
          </div>

          {/* Card Content Area */}
          <div className="w-full max-w-2xl min-h-[400px]" style={{ zoom: 0.9 }}>
            {activeTab ? (
              <div 
                key={activeTab} // Forces re-render for animation on tab change
                className={cn(
                  'w-full max-h-[500px] flex flex-col rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] transition-all animate-fade-in-up',
                  swotData[activeTab].color,
                  swotData[activeTab].textColor
                )}
              >
                {/* Header (Static) */}
                <div className="flex-shrink-0 p-6 sm:p-8 pb-4 border-b-4 border-current/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 border-2 border-current flex items-center justify-center flex-shrink-0">
                      <span className="font-black text-2xl">{activeTab}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black leading-tight">{swotData[activeTab].title}</h3>
                      <p className="font-bold opacity-80 text-sm uppercase tracking-wider">{swotData[activeTab].subtitle}</p>
                    </div>
                  </div>
                </div>
                
                {/* Scrollable Items */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 pt-4 space-y-6">
                  {swotData[activeTab].items.map((item, idx) => (
                    <div key={idx} className="bg-[#fffdf0] text-slate-900 p-5 rounded-lg border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                      <h4 className="font-black text-lg mb-2 flex items-start gap-2">
                        <span className="bg-black/10 dark:bg-white/20 px-2 py-0.5 rounded text-sm shrink-0 mt-0.5">{idx + 1}</span>
                        {item.title}
                      </h4>
                      <p className="font-bold text-sm sm:text-base opacity-90 mb-3 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="bg-black/5 p-3 rounded-lg border-l-4 border-current">
                        <p className="font-bold text-xs sm:text-sm italic opacity-90">
                          <span className="font-black not-italic mr-1">Contoh:</span> {item.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-full min-h-[400px] p-8 rounded-2xl border-4 border-dashed border-slate-300 bg-white/50 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-inner">
                  <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-2">Pilih Kategori</h4>
                <p className="text-slate-500 font-bold max-w-xs">
                  Klik salah satu belah ketupat di samping untuk melihat detail analisis SWOT.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
