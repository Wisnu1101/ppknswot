// Dataset Kuis Kilas Bangsa: Wawasan Kebangsaan & Analisis SWOT Indonesia

export const QUIZ_INFO = {
  id: 'ppkn-swot',
  title: 'Kuis Analisis SWOT & Wawasan Nusantara',
  subtitle: 'Uji pemahamanmu tentang kekuatan, kelemahan, peluang, dan ancaman strategis Indonesia.',
  badge: 'Kilas Bangsa',
  timeLimit: 600, // 10 minutes in seconds
  totalQuestions: 15,
  passingScore: 70, // percentage
};

export const PPKN_QUESTIONS = [
  {
    id: 1,
    category: 'Peluang & Kekuatan',
    question: 'Berdasarkan posisi geopolitik, Indonesia berada di posisi silang (cross-position) dunia antara dua benua dan dua samudera. Dalam analisis SWOT, hal ini merupakan...',
    options: [
      { label: 'A', text: 'Kelemahan internal struktural dalam pengawasan' },
      { label: 'B', text: 'Kekuatan dan Peluang strategis maritim serta jalur perdagangan dunia' },
      { label: 'C', text: 'Ancaman mutlak yang tidak dapat dimanfaatkan secara ekonomi' },
      { label: 'D', text: 'Kelemahan sistem pertahanan teritorial kepulauan' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Posisi silang menghubungkan Samudera Hindia - Samudera Pasifik serta Benua Asia - Australia.',
        'Wilayah perairan Indonesia dilintasi 4 choke points perdagangan dunia dan ALKI (Alur Laut Kepulauan Indonesia).',
        'Secara analisis SWOT, kondisi geografis ini adalah Kekuatan (Strength) sekaligus Peluang (Opportunity) emas ekonomi maritim.',
      ],
      conclusion: 'Posisi silang adalah Kekuatan dan Peluang strategis maritim Indonesia.',
    },
    tips: 'Kondisi geografis alami yang menguntungkan dipetakan sebagai Kekuatan (Strength) dan Peluang (Opportunity).',
  },
  {
    id: 2,
    category: 'Kekuatan & Kelemahan',
    question: 'Bonus Demografi Indonesia yang diperkirakan memuncak pada 2030–2040 dapat berubah menjadi kelemahan (Weakness) apabila...',
    options: [
      { label: 'A', text: 'Jumlah generasi muda usia produktif meningkat pesat' },
      { label: 'B', text: 'Kualitas pendidikan dan daya serap lapangan kerja bernilai tambah rendah' },
      { label: 'C', text: 'Pemerintah memperbanyak investasi teknologi ramah lingkungan' },
      { label: 'D', text: 'Terjadi peningkatan produktivitas riset dan inovasi sains nasional' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Bonus demografi berarti rasio ketergantungan rendah karena usia kerja (15-64 tahun) mendominasi.',
        'Jika tidak diimbangi mutu pendidikan dan ketersediaan lapangan kerja, akan memicu pengangguran terdidik dan beban sosial.',
        'Akibatnya, potensi kekuatan justru berbalik menjadi kelemahan internal (Weakness).',
      ],
      conclusion: 'Rendahnya kualitas SDM dan daya serap industri mengubah bonus demografi menjadi kelemahan.',
    },
    tips: 'Bonus demografi adalah pisau bermata dua: menjadi kekuatan jika SDM unggul, atau kelemahan jika tidak terdidik.',
  },
  {
    id: 3,
    category: 'Wawasan Nusantara',
    question: 'Wawasan Nusantara memandang wilayah NKRI sebagai satu kesatuan yang utuh. Prinsip kesatuan ekonomi menegaskan bahwa...',
    options: [
      { label: 'A', text: 'Pembangunan hanya dipusatkan di pulau dengan populasi terbesar' },
      { label: 'B', text: 'Kekayaan seluruh kepulauan adalah modal dan milik bersama seluruh bangsa' },
      { label: 'C', text: 'Setiap daerah berhak memonopoli sumber daya alam untuk kepentingannya sendiri' },
      { label: 'D', text: 'Daerah terpencil menanggung seluruh pembiayaan infrastrukturnya sendiri' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Salah satu perwujudan Wawasan Nusantara adalah Kesatuan Ekonomi.',
        'Pasal 33 UUD 1945 mengamanatkan bumi, air, dan kekayaan alam dikuasai negara untuk kemakmuran rakyat.',
        'Potensi di satu wilayah merupakan milik bersama bangsa untuk pemerataan keadilan sosial.',
      ],
      conclusion: 'Kekayaan alam nusantara adalah modal bersama untuk kemakmuran seluruh rakyat.',
    },
    tips: 'Sila ke-5 Pancasila (Keadilan Sosial) menjadi ruh dari prinsip kesatuan ekonomi kepulauan.',
  },
  {
    id: 4,
    category: 'Kelemahan Pertahanan',
    question: 'Dalam analisis SWOT ketahanan nasional, ketergantungan tinggi pada rantai pasok alutsista dan teknologi pertahanan impor termasuk dalam kategori...',
    options: [
      { label: 'A', text: 'Kekuatan diplomasi militer' },
      { label: 'B', text: 'Peluang perdagangan bebas antarnegara' },
      { label: 'C', text: 'Kelemahan (Weakness) kemandirian industri pertahanan domestik' },
      { label: 'D', text: 'Faktor pendorong kedaulatan maritim' },
    ],
    correct: 'C',
    explanation: {
      steps: [
        'Ketergantungan alutsista impor membuat sistem pertahanan rentan embargo teknologi dan tekanan geopolitik negara produsen.',
        'Karena faktor ini berasal dari keterbatasan kapasitas teknologi dalam negeri, ini merupakan Kelemahan (Weakness) internal.',
        'Solusinya adalah memperkuat kemandirian industri pertahanan dalam negeri (Defend ID).',
      ],
      conclusion: 'Ketergantungan alutsista impor adalah Kelemahan internal strategis pertahanan.',
    },
    tips: 'Kelemahan (Weakness) adalah faktor internal yang membatasi kemampuan bangsa dalam mencapai kedaulatan penuh.',
  },
  {
    id: 5,
    category: 'Peluang Industri',
    question: 'Strategi hilirisasi nikel dan bahan tambang di Indonesia dirancang untuk mentransformasi perekonomian dari pengekspor bahan mentah menjadi...',
    options: [
      { label: 'A', text: 'Pemain kunci dalam rantai pasok baterai dan kendaraan listrik dunia (Peluang)' },
      { label: 'B', text: 'Konsumen pasif barang jadi luar negeri' },
      { label: 'C', text: 'Negara yang menutup seluruh hubungan dagang internasional' },
      { label: 'D', text: 'Eksportir bijih mentah berbiaya rendah tanpa nilai tambah' },
    ],
    correct: 'A',
    explanation: {
      steps: [
        'Hilirisasi melipatgandakan nilai tambah komoditas di dalam negeri.',
        'Membuka lapangan kerja spesifik dan mendorong transfer teknologi manufaktur baterai EV.',
        'Menangkap Peluang (Opportunity) global menuju transisi energi hijau terbarukan.',
      ],
      conclusion: 'Hilirisasi menangkap peluang ekosistem rantai pasok kendaraan listrik (EV) dunia.',
    },
    tips: 'Hilirisasi adalah strategi mengonversi Kekuatan alam menjadi Peluang industri manufaktur bernilai tinggi.',
  },
  {
    id: 6,
    category: 'Kekuatan Pancasila',
    question: 'Sila ke-3 Pancasila, "Persatuan Indonesia", menjadi benteng pertahanan utama bangsa terhadap ancaman kontemporer berupa...',
    options: [
      { label: 'A', text: 'Polarisasi sosial, politik identitas, dan disinformasi berbasis SARA' },
      { label: 'B', text: 'Kenaikan suku bunga bank sentral global' },
      { label: 'C', text: 'Perkembangan kecerdasan buatan (AI) di sektor perbankan' },
      { label: 'D', text: 'Pembangunan infrastruktur transportasi antarpulau' },
    ],
    correct: 'A',
    explanation: {
      steps: [
        'Ancaman non-militer di era digital kerap memanfaatkan isu SARA untuk memecah belah solidaritas kebangsaan.',
        'Persatuan Indonesia menanamkan kesadaran Bhinneka Tunggal Ika sebagai modal sosial utama.',
        'Menjadi imunisasi alami terhadap segregasi sosial dan perang narasi (information warfare).',
      ],
      conclusion: 'Persatuan Indonesia membentengi bangsa dari polarisasi sosial dan politik identitas.',
    },
    tips: 'Persatuan adalah modal sosial (social capital) paling krusial bagi kelangsungan bangsa majemuk.',
  },
  {
    id: 7,
    category: 'Wawasan Nusantara',
    question: 'Deklarasi Djuanda 13 Desember 1957 berhasil memperjuangkan konsep Indonesia sebagai Negara Kepulauan (Archipelagic State). Hal ini memperkuat...',
    options: [
      { label: 'A', text: 'Status laut antarpulau sebagai pemisah teritori terisolir' },
      { label: 'B', text: 'Kedaulatan wilayah laut nusantara menjadi satu kesatuan NKRI yang utuh' },
      { label: 'C', text: 'Hak negara lain untuk mengklaim laut pedalaman Indonesia' },
      { label: 'D', text: 'Penyerahan perairan nusantara kepada rezim hukum kolonial 1939' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Sebelum Deklarasi Djuanda, laut antar pulau dianggap perairan internasional bebas (Territoriale Zee 1939).',
        'Deklarasi Djuanda menyatukan daratan dan perairan laut menjadi satu kesatuan utuh berdaulat.',
        'Konsep ini diakui secara global dalam Konvensi PBB UNCLOS 1982.',
      ],
      conclusion: 'Deklarasi Djuanda menegaskan bahwa laut adalah pemersatu, bukan pemisah bangsa.',
    },
    tips: 'Deklarasi Djuanda adalah tonggak hukum terpenting lahirnya konsep geopolitik Wawasan Nusantara.',
  },
  {
    id: 8,
    category: 'Strategi SWOT',
    question: 'Dalam matriks analisis SWOT, kombinasi strategi "S - O" (Strengths - Opportunities) bertujuan untuk...',
    options: [
      { label: 'A', text: 'Meminimalkan kelemahan internal demi bertahan dari ancaman luar' },
      { label: 'B', text: 'Menggunakan kekuatan internal untuk merebut dan memaksimalkan peluang eksternal' },
      { label: 'C', text: 'Mengabaikan ancaman demi mengejar keuntungan jangka pendek' },
      { label: 'D', text: 'Membiarkan kekuatan internal tanpa arahan kebijakan yang terukur' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Strategi S-O memanfaatkan Kekuatan internal (Strengths) guna merebut Peluang eksternal (Opportunities).',
        'Contoh: Menggunakan keunggulan jalur laut strategis dan kekayaan maritim untuk memimpin ekonomi maritim kawasan.',
      ],
      conclusion: 'Strategi S-O menggunakan kekuatan untuk merebut peluang sebesar-besarnya.',
    },
    tips: 'S-O adalah strategi ofensif/pertumbuhan agresif dalam matriks perencanaan strategis SWOT.',
  },
  {
    id: 9,
    category: 'Ancaman Geopolitik',
    question: 'Ketegangan geopolitik klaim sepihak di kawasan Laut China Selatan (LCS) yang berdekatan dengan ZEE Kepulauan Natuna merupakan bentuk...',
    options: [
      { label: 'A', text: 'Kelemahan internal kelembagaan sipil' },
      { label: 'B', text: 'Ancaman (Threat) eksternal bagi stabilitas keamanan dan kedaulatan maritim' },
      { label: 'C', text: 'Peluang memperbesar konflik militer terbuka' },
      { label: 'D', text: 'Kekuatan ekonomi kawasan regional semata' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Sengketa sembilan garis putus-putus di Laut China Selatan bersinggungan dengan ZEE Indonesia di Laut Natuna Utara.',
        'Faktor ini berasal dari lingkungan luar negeri (eksternal).',
        'Maka tergolong Ancaman (Threat) yang menuntut diplomasi aktif dan patroli pengawasan maritim yang solid.',
      ],
      conclusion: 'Konflik LCS adalah Ancaman (Threat) eksternal terhadap stabilitas perairan Natuna.',
    },
    tips: 'Ancaman (Threat) berasal dari dinamika eksternal yang dapat membahayakan kedaulatan atau stabilitas nasional.',
  },
  {
    id: 10,
    category: 'Kelemahan Konektivitas',
    question: 'Kesenjangan pembangunan infrastruktur antara Kawasan Barat Indonesia (KBI) dan Kawasan Timur Indonesia (KTI) dalam SWOT diidentifikasi sebagai...',
    options: [
      { label: 'A', text: 'Kelemahan (Weakness) konektivitas dan disparitas biaya logistik nasional' },
      { label: 'B', text: 'Kekuatan keanekaragaman budaya nusantara' },
      { label: 'C', text: 'Peluang perdagangan ekspor komoditas' },
      { label: 'D', text: 'Ancaman diplomasi luar negeri' },
    ],
    correct: 'A',
    explanation: {
      steps: [
        'Konsentrasi logistik dan perputaran modal yang belum merata adalah persoalan internal domestik.',
        'Hal ini menciptakan kesenjangan harga barang dan layanan publik di kawasan timur.',
        'Karena itu dikategorikan sebagai Kelemahan (Weakness) yang dijawab melalui tol laut dan pemerataan infrastruktur.',
      ],
      conclusion: 'Disparitas antarwilayah adalah Kelemahan internal pembangunan logistik nasional.',
    },
    tips: 'Pembangunan infrastruktur konektivitas antarpulau ditujukan untuk mengikis kelemahan disparitas harga ini.',
  },
  {
    id: 11,
    category: 'Politik Luar Negeri',
    question: 'Prinsip Politik Luar Negeri "Bebas dan Aktif" Indonesia mencerminkan komitmen bangsa untuk...',
    options: [
      { label: 'A', text: 'Terikat secara permanen pada salah satu pakta pertahanan militer adidaya' },
      { label: 'B', text: 'Bebas menentukan sikap tanpa memihak blok, aktif menjaga ketertiban dan perdamaian dunia' },
      { label: 'C', text: 'Mengisolasi diri dari seluruh dinamika hubungan internasional' },
      { label: 'D', text: 'Hanya menjalin kemitraan dagang dengan negara-negara satu kawasan saja' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Digagas oleh Drs. Mohammad Hatta ("Mendayung Antara Dua Karang").',
        'Bebas: Tidak terikat pada blok kekuatan manapun secara ideologis/militer.',
        'Aktif: Turut andil meredakan konflik dan menegakkan keadilan internasional berdasarkan kemerdekaan abadi.',
      ],
      conclusion: 'Bebas Aktif berarti merdeka bersikap dan aktif menjaga perdamaian dunia.',
    },
    tips: 'Landasan konstitusional politik luar negeri bebas aktif tercantum dalam Pembukaan UUD 1945 alinea ke-4.',
  },
  {
    id: 12,
    category: 'Peluang Energi Hijau',
    question: 'Salah satu peluang (Opportunity) Indonesia dalam era transisi energi global adalah pemanfaatan potensi Energi Baru Terbarukan (EBT) berupa...',
    options: [
      { label: 'A', text: 'Energi panas bumi (geotermal), tenaga surya, dan hidro yang melimpah' },
      { label: 'B', text: 'Peningkatan impor bahan bakar minyak fosil' },
      { label: 'C', text: 'Eksploitasi tambang batu bara tanpa kendali kelestarian lingkungan' },
      { label: 'D', text: 'Ketergantungan pembangkit listrik tenaga diesel impor' },
    ],
    correct: 'A',
    explanation: {
      steps: [
        'Indonesia berada di kawasan Ring of Fire dengan potensi panas bumi (geotermal) terbesar ke-2 di dunia.',
        'Sebagai negara tropis kepulauan, potensi surya, angin, dan hidro tersebar luas sepanjang tahun.',
        'Menjadi Peluang (Opportunity) emas menjadi pemimpin green economy di Asia Tenggara.',
      ],
      conclusion: 'Potensi geotermal dan EBT tropis adalah Peluang strategis transisi energi hijau Indonesia.',
    },
    tips: 'Peluang (Opportunity) tercipta dari tren global dekarbonisasi yang sejalan dengan kekayaan alam nusantara.',
  },
  {
    id: 13,
    category: 'Ancaman Hibrida',
    question: 'Serangan siber terhadap infrastruktur digital nasional (seperti Pusat Data Nasional) merupakan wujud nyata ancaman...',
    options: [
      { label: 'A', text: 'Militer konvensional darat' },
      { label: 'B', text: 'Non-militer dan hibrida di ruang siber (cyber warfare) terhadap kedaulatan data' },
      { label: 'C', text: 'Peluang digitalisasi instan' },
      { label: 'D', text: 'Kekuatan diplomasi kebudayaan' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Ancaman modern tidak hanya mengandalkan kekuatan kinetik militer fisik, melainkan perang siber dan informasi.',
        'Dapat melumpuhkan layanan publik dan mengorbankan data kedaulatan warga negara.',
        'Merupakan ancaman non-militer/hibrida yang menuntut ketahanan siber (cyber resilience) berstandar tinggi.',
      ],
      conclusion: 'Serangan siber adalah ancaman non-militer hibrida modern terhadap kedaulatan data nasional.',
    },
    tips: 'Kedaulatan bangsa modern mencakup kedaulatan teritorial darat, laut, udara, dan ruang siber (cyber domain).',
  },
  {
    id: 14,
    category: 'Bela Negara Pemuda',
    question: 'Implementasi Bela Negara yang paling relevan bagi generasi muda pelajar dan mahasiswa saat ini adalah...',
    options: [
      { label: 'A', text: 'Membeli perlengkapan militer untuk koleksi pribadi' },
      { label: 'B', text: 'Berprestasi di bidang sains, bijak bermedia sosial, dan menjaga persatuan bangsa' },
      { label: 'C', text: 'Menyebarkan informasi yang belum diverifikasi kebenarannya di media sosial' },
      { label: 'D', text: 'Menolak mempelajari budaya daerah nusantara lainnya' },
    ],
    correct: 'B',
    explanation: {
      steps: [
        'Bela negara tidak selalu berarti memanggul senjata di medan perang (Pasal 27 ayat 3 UUD 1945).',
        'Bela negara non-fisik diwujudkan melalui dedikasi profesi, karya inovatif, integritas, dan literasi digital berkarakter Pancasila.',
      ],
      conclusion: 'Berprestasi dan merawat persatuan adalah wujud nyata bela negara generasi muda.',
    },
    tips: 'Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara sesuai kapasitas masing-masing.',
  },
  {
    id: 15,
    category: 'Pemerataan IKN',
    question: 'Pemindahan Ibu Kota Nusantara (IKN) ke Kalimantan Timur ditinjau dari perspektif Wawasan Nusantara bertujuan untuk...',
    options: [
      { label: 'A', text: 'Memperkuat paradigma Indonesia-sentris dan pemerataan koridor pertumbuhan nasional' },
      { label: 'B', text: 'Menghentikan seluruh pembangunan di Pulau Jawa' },
      { label: 'C', text: 'Memusatkan seluruh aktivitas keuangan dunia di satu titik terisolasi' },
      { label: 'D', text: 'Meninggalkan peradaban maritim kepulauan' },
    ],
    correct: 'A',
    explanation: {
      steps: [
        'Selama beberapa dekade, konsentrasi pembangunan cenderung terkonsentrasi di Jawa (Jawa-sentris).',
        'Penempatan IKN di titik tengah geografis kepulauan mendorong orientasi Indonesia-sentris.',
        'Mendorong pemerataan koridor ekonomi baru, keadilan sosial, dan integrasi antarwilayah.',
      ],
      conclusion: 'IKN mendorong pergeseran paradigma dari Jawa-sentris menuju Indonesia-sentris.',
    },
    tips: 'Indonesia-sentris memastikan setiap pulau mendapatkan perhatian pembangunan yang adil dan proporsional.',
  },
];
