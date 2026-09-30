import { useState } from 'react'
import logo from '../assets/logo.png'


const conclusionData = [
  {
    title: '1. Aksi Pemuda 2045',
    subtitle: 'Kontribusi Nyata Generasi Muda',
    desc: 'Menuju Indonesia Emas 2045, pemuda bukan hanya sebagai penonton, tetapi sebagai penggerak utama (agent of change). Berikut adalah aksi nyata yang dapat dilakukan oleh generasi muda:',
    points: [
      {
        bold: 'Literasi Digital & Konten Positif:',
        text: 'Memanfaatkan media sosial dan platform digital untuk mempromosikan kebudayaan lokal, pariwisata, serta karya anak bangsa guna melawan stereotip negatif dunia terhadap Indonesia.'
      },
      {
        bold: 'Inovasi Berbasis Teknologi:',
        text: 'Mengembangkan startup lokal, solusi teknologi pertanian (agritech), dan industri kreatif untuk mengoptimalkan potensi sumber daya alam secara berkelanjutan.'
      },
      {
        bold: 'Penguatan Karakter & Kebhinekaan:',
        text: 'Menjaga persatuan bangsa dengan mengamalkan nilai-nilai Pancasila dalam kehidupan sehari-hari dan menolak segala bentuk provokasi atau radikalisme.'
      },
      {
        bold: 'Kepedulian Sosial & Lingkungan:',
        text: 'Terlibat aktif dalam aksi volunteer, edukasi masyarakat daerah tertinggal, serta kampanye pelestarian lingkungan untuk menanggulangi dampak kerawanan bencana.'
      }
    ],
    image: '/img/kesimpulan-1.jpeg',
    fileName: 'pemuda_2045.jpg'
  },
  {
    title: '2. Rekomendasi Strategis',
    subtitle: 'Langkah Taktis untuk Negara & Lembaga',
    desc: 'Untuk mengatasi berbagai kelemahan (weaknesses) dan ancaman (threats) yang ada, diperlukan rekomendasi strategis berikut:',
    points: [
      {
        bold: 'Pemerataan Pendidikan & Kesehatan:',
        text: 'Menggencarkan program penuntasan stunting dan pemerataan kualitas sekolah unggulan hingga ke wilayah 3T (Tertinggal, Terdepan, dan Terluar).'
      },
      {
        bold: 'Pengembangan Ekonomi Merata:',
        text: 'Mempercepat hilirisasi industri di luar Pulau Jawa dan mendorong UMKM Go Digital untuk menekan tingkat kesenjangan ekonomi (Indeks Gini).'
      },
      {
        bold: 'Peningkatan Keamanan Siber Nasional:',
        text: 'Memperketat regulasi dan perlindungan data pribadi serta memperkuat sistem pertahanan digital dari ancaman spionase maupun kejahatan siber internasional.'
      },
      {
        bold: 'Reformasi Birokrasi & Antikorupsi:',
        text: 'Menerapkan sistem pemerintahan berbasis elektronik (e-government) secara transparan guna menutup celah pungutan liar (pungli) dan praktik korupsi.'
      }
    ],
    image: '/img/kesimpulan-2.jpeg',
    fileName: 'strategi_nasional.jpg'
  },
  {
    title: '3. Sintetis Kebijakan',
    subtitle: 'Kebijakan Makro Berkelanjutan',
    desc: 'Sintetis kebijakan merangkum arah kebijakan strategis jangka panjang yang memadukan seluruh elemen SWOT dan Wawasan Nusantara:',
    points: [
      {
        bold: 'Integrasi Wawasan Nusantara dan Ketahanan Nasional:',
        text: 'Kebijakan pembangunan nasional harus berlandaskan pada wawasan kewilayahan, di mana laut, darat, dan udara dipandang sebagai satu kesatuan pertahanan, ekonomi, dan sosial yang utuh.'
      },
      {
        bold: 'Pembangunan Berkelanjutan Berbasis Pancasila:',
        text: 'Setiap kebijakan ekonomi dan pengelolaan SDA wajib mengutamakan prinsip keadilan sosial bagi seluruh rakyat Indonesia (Sila ke-5), bukan sekadar mengejar pertumbuhan angka PDB semata.'
      },
      {
        bold: 'Diplomasi Budaya & Ekonomi Global:',
        text: 'Memanfaatkan posisi geostrategis Indonesia untuk memperkuat posisi tawar di kancah internasional melalui diplomasi hijau (green diplomacy) dan pelestarian warisan budaya dunia.'
      }
    ],
    image: '/img/kesimpulan-3.jpeg',
    fileName: 'kebijakan_makro.jpg'
  }
]

export default function Conclusion() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === conclusionData.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? conclusionData.length - 1 : prev - 1))
  }

  const slide = conclusionData[currentIndex]

  return (
    <section id="kesimpulan" className="scroll-mt-16 py-24 bg-[#a7f3d0] relative overflow-hidden">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 2px, transparent 2px, transparent 12px)'
      }}></div>


      
      
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 relative z-10" style={{ zoom: 0.8 }}>
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Kesimpulan
          </h2>
          <div className="inline-block mt-1 rounded-[10px] border-[2.5px] border-[#11172E] bg-[#FAF8EC] px-5 py-2 shadow-[4px_4px_0px_0px_#11172E]">
            <p className="text-xs sm:text-sm md:text-base font-bold text-slate-900 tracking-tight">
              Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Retro Mac OS Window */}
        <div className="relative mx-auto max-w-5xl">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-48 right-[8%] z-0 w-48 sm:w-60 lg:w-72 object-contain"
          />
          <div className="relative z-10 rounded-lg border-[3px] border-slate-900 bg-[#f4f1e1] shadow-[12px_12px_0px_0px_#0f172a] overflow-hidden">
          
          {/* Window Title Bar */}
          <div className="flex h-10 items-center justify-between border-b-[3px] border-slate-900 bg-[#f4f1e1] px-4">
            {/* Left Window Controls */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-slate-900 bg-white shadow-inner"></div>
              <div className="h-3 w-3 rounded-full border-2 border-slate-900 bg-white shadow-inner"></div>
            </div>
            
            {/* Title */}
            <div className="font-bold text-slate-900 text-sm tracking-wide">
              kesimpulan.exe
            </div>
            
            {/* Right Pattern (Decorative) */}
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 border-2 border-slate-900 flex flex-col justify-between p-0.5">
                <div className="border-b-2 border-slate-900 h-1/2"></div>
              </div>
            </div>
          </div>

          {/* Window Body */}
          <div className="flex flex-col lg:flex-row p-6 md:p-8 gap-8 items-stretch">
            
            {/* Left Side - Image Viewer */}
            <div className="w-full lg:w-5/12 flex flex-col gap-4">
              <div className="border-[3px] border-slate-900 bg-white p-2 shadow-[4px_4px_0px_0px_#0f172a] relative group overflow-hidden">
                {/* Tape decoration */}
                <div className="absolute -top-3 right-4 w-12 h-6 bg-white/60 backdrop-blur-sm border border-slate-300 rotate-3 z-10 shadow-sm"></div>
                
                <div className="aspect-[3/4] sm:aspect-video lg:aspect-[3/4] relative overflow-hidden border-2 border-slate-900 bg-slate-100">
                  <img 
                    key={currentIndex}
                    src={slide.image} 
                    alt={slide.fileName}
                    className="w-full h-full object-cover animate-fade-in-up"
                  />
                  {/* Filename overlay */}
                  <div className="absolute bottom-3 right-3 bg-white border-2 border-slate-900 px-3 py-1 font-bold text-xs shadow-[2px_2px_0px_0px_#0f172a] rotate-2">
                    {slide.fileName}
                  </div>
                </div>
              </div>

              {/* Retro Scrollbar / Navigation track */}
              <div className="border-[3px] border-slate-900 bg-[#f4f1e1] h-8 flex items-center p-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <button onClick={handlePrev} className="h-full px-2 border-r-[3px] border-slate-900 hover:bg-slate-200 active:bg-slate-300 font-bold flex items-center justify-center">
                  &lt;
                </button>
                <div className="flex-1 px-2 h-full flex items-center">
                  <div className="w-full h-2 bg-slate-300 border-y border-slate-400 relative">
                    <div 
                      className="absolute top-0 h-full bg-slate-600 border border-slate-900 transition-all duration-300"
                      style={{ 
                        width: '33.33%', 
                        left: `${(currentIndex / conclusionData.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <button onClick={handleNext} className="h-full px-2 border-l-[3px] border-slate-900 hover:bg-slate-200 active:bg-slate-300 font-bold flex items-center justify-center">
                  &gt;
                </button>
              </div>
            </div>

            {/* Right Side - Content & Buttons */}
            <div className="w-full lg:w-7/12 flex flex-col justify-between">
              <div key={currentIndex} className="animate-fade-in-up">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 leading-tight">
                  {slide.title}
                </h3>
                <h4 className="text-sm md:text-base font-bold text-purple-700 mb-4 border-b-2 border-slate-900 pb-2 inline-block">
                  {slide.subtitle}
                </h4>
                
                <p className="text-slate-800 font-medium mb-6 text-sm md:text-base">
                  {slide.desc}
                </p>

                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {slide.points.map((point, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-900 p-3 shadow-[2px_2px_0px_0px_#0f172a] text-sm">
                      <span className="font-bold text-slate-900 block mb-1">{point.bold}</span>
                      <span className="text-slate-700 font-medium">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t-[3px] border-slate-900 border-dashed">
                <button 
                  onClick={handlePrev}
                  className="px-6 py-2.5 border-[3px] border-slate-900 bg-white font-black text-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Previous
                </button>
                <button 
                  onClick={handleNext}
                  className="px-6 py-2.5 border-[3px] border-slate-900 bg-[#bef264] font-black text-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Next
                </button>
              </div>

            </div>

          </div>
          </div>
        </div>

      </div>
    </section>
  )
}
