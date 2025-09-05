import { useState, useEffect } from "react";
import {
  Music,
  Users,
  Target,
  Heart,
  MapPin,
  Menu,
  X,
  Star,
  Award,
  Clock,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "mission",
        "commitment",
        "objectives",
        "faculty",
        "location",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsApp(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    const phoneNumber = "558499052232"; // Replace with actual WhatsApp number
    const message =
      "Olá! Gostaria de saber mais sobre os cursos da Sonare Academia de Música.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const openGoogleMaps = () => {
    const address = "R. Brg. Pessoa Ramos, 59 - Cohabinal, Parnamirim, RN";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank");
  };

  const facultyData = [
    {
      id: 1,
      title: "Piano Clássico",
      src: "/public/1.jpg",
      gradient: "from-red-800 to-black",
      features: [
        "• Formação em conservatório",
        "• 15+ anos de experiência",
        "• Método personalizado",
        "• Preparação para concursos",
      ],
    },
    {
      id: 2,
      title: "Violão & Guitarra",
      src: "/public/2.jpg",
      gradient: "from-red-900 to-red-800",
      features: [
        "• Especialista em diversos estilos",
        "• Técnicas modernas e clássicas",
        "• Improvisação e composição",
        "• Preparação para bandas",
      ],
    },
    {
      id: 3,
      title: "Canto & Técnica Vocal",
      src: "/public/3.jpg",
      gradient: "from-gray-700 to-black",
      features: [
        "• Técnica vocal avançada",
        "• Diversos gêneros musicais",
        "• Preparação cênica",
        "• Cuidados com a voz",
      ],
    },
    {
      id: 4,
      title: "Bateria & Percussão",
      src: "/public/4.jpg",
      gradient: "from-red-700 to-gray-800",
      features: [
        "• Técnicas avançadas de bateria",
        "• Ritmos brasileiros e internacionais",
        "• Coordenação motora",
        "• Preparação para shows",
      ],
    },
    {
      id: 5,
      title: "Violino & Viola",
      src: "/public/5.jpg",
      gradient: "from-gray-800 to-red-900",
      features: [
        "• Técnica clássica refinada",
        "• Repertório erudito e popular",
        "• Postura e arcada",
        "• Música de câmara",
      ],
    },
    {
      id: 6,
      title: "Baixo Elétrico",
      src: "/public/6.jpg",
      gradient: "from-black to-red-800",
      features: [
        "• Fundamentos do baixo",
        "• Groove e timing",
        "• Diversos estilos musicais",
        "• Técnicas de slap e fingerstyle",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(facultyData.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(facultyData.length / 3)) %
        Math.ceil(facultyData.length / 3)
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Quem Somos" },
    { id: "mission", label: "Missão" },
    { id: "commitment", label: "Compromisso" },
    { id: "objectives", label: "Objetivos" },
    { id: "faculty", label: "Professores" },
    { id: "location", label: "Localização" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="../public/LOGO SVG 2.svg" alt="" />
              <span className="text-xl font-semibold text-gray-900">
                Sonare
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-red-800 ${
                    activeSection === item.id ? "text-red-800" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-red-800 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-red-50 text-red-800"
                      : "text-gray-700 hover:bg-gray-50 hover:text-red-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="/public/4933677_Person_Human_1920x1080.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 via-black/40 to-red-900/30 z-10"></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
          <div className="text-center">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-red-200 to-red-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Sonare Academia
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-white/90 drop-shadow-xl">
                  de Música
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Desperte sua paixão pela música e transforme seu talento em
                arte. Uma jornada musical única te espera.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-gradient-to-r from-red-800 to-red-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-900 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  Conheça Nossa Academia
                </button>
                <button
                  onClick={() => scrollToSection("location")}
                  className="border-2 border-white/80 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                >
                  Nossa Localização
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Quem Somos?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-black mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                A Sonare Academia de Música é um espaço dedicado ao ensino
                musical de excelência, onde a paixão pela música se encontra com
                metodologias inovadoras e professores altamente qualificados.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Fundada com o propósito de democratizar o acesso à educação
                musical de qualidade, nossa academia oferece um ambiente
                acolhedor e inspirador para músicos de todas as idades e níveis.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-800 to-black rounded-2xl p-8 text-white">
                <Music className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Nossa Essência</h3>
                <p className="text-red-100 leading-relaxed">
                  Acreditamos que a música é uma linguagem universal que conecta
                  pessoas, desperta emoções e desenvolve habilidades únicas.
                  Nossa academia é o lugar onde sonhos musicais se tornam
                  realidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nossa Missão
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-black mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-3xl p-8 sm:p-12">
              <div className="text-center">
                <Target className="h-16 w-16 text-red-800 mx-auto mb-8" />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Formar Músicos Completos e Apaixonados
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Nossa missão é proporcionar uma educação musical de
                  excelência, desenvolvendo não apenas habilidades técnicas, mas
                  também a sensibilidade artística, criatividade e expressão
                  individual de cada aluno. Buscamos formar músicos completos,
                  capazes de se expressar através da música com técnica, emoção
                  e autenticidade.
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Star className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Excelência
                    </h4>
                    <p className="text-sm text-gray-600">
                      Padrão elevado de ensino
                    </p>
                  </div>
                  <div className="text-center">
                    <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Paixão</h4>
                    <p className="text-sm text-gray-600">Amor pela música</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-gray-700 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Comunidade
                    </h4>
                    <p className="text-sm text-gray-600">Ambiente acolhedor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section id="commitment" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nosso Compromisso
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-black mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Qualidade de Ensino
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Comprometemo-nos a oferecer um ensino de alta qualidade, com
                metodologias atualizadas e acompanhamento personalizado para
                cada aluno.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ambiente Acolhedor
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Criamos um ambiente seguro, respeitoso e inspirador onde cada
                aluno se sente valorizado e motivado a expressar sua
                criatividade.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Desenvolvimento Contínuo
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Investimos constantemente no aperfeiçoamento de nossos métodos e
                na capacitação de nossa equipe para oferecer sempre o melhor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nossos Objetivos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-black mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                  <Target className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Desenvolvimento Técnico
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Proporcionar formação técnica sólida em diversos
                    instrumentos musicais, teoria musical e performance,
                    respeitando o ritmo individual de aprendizagem.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                  <Heart className="h-6 w-6 text-red-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Expressão Artística
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Estimular a criatividade e expressão pessoal através da
                    música, desenvolvendo a sensibilidade artística e a
                    capacidade interpretativa.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                  <Users className="h-6 w-6 text-red-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Formação Humana
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Contribuir para o desenvolvimento pessoal, social e cultural
                    dos alunos, promovendo valores como disciplina, perseverança
                    e trabalho em equipe.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">
                  Resultados Esperados
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span>Domínio técnico do instrumento escolhido</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span>Capacidade de interpretação musical</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span>Desenvolvimento da criatividade</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span>Formação de valores e disciplina</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span>Preparação para apresentações públicas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nossos Professores
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossa equipe de educadores musicais dedicados e altamente
              qualificados
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative mb-12">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Professor anterior"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Próximo professor"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Carousel Content */}
            <div className="overflow-hidden mx-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(facultyData.length / 3) }).map(
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                        {facultyData
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((faculty) => (
                            <div
                              key={faculty.id}
                              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                              <div className="text-center mb-6">
                                <div className="w-20 h-20 mx-auto mb-4">
                                  <img 
                                    src={faculty.src} 
                                    alt={`Professor de ${faculty.title}`}
                                    className="w-full h-full rounded-full object-cover border-4 border-gray-200 shadow-lg"
                                  />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {faculty.title}
                                </h3>
                              </div>
                              <ul className="space-y-2 text-gray-600">
                                {faculty.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(facultyData.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-red-800 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nossa Localização
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-black mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Endereço Principal
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    R. Brg. Pessoa Ramos, 59 - Cohabinal
                    <br />
                    Parnamirim, RN - CEP: 59140-765
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">
                  Informações de Contato
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    <span className="font-semibold">Telefone:</span> (84)
                    99905-2232
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">WhatsApp:</span> (84)
                    99905-2232
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span>{" "}
                    contato@sonareacademia.com.br
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold mb-4">Horário de Funcionamento</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Segunda a Sexta: 8h às 22h</p>
                  <p>Sábado: 8h às 18h</p>
                  <p>Domingo: 9h às 17h</p>
                </div>
              </div>

              <button
                onClick={openGoogleMaps}
                className="w-full bg-red-800 hover:bg-red-900 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Abrir no Google Maps</span>
              </button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.2929292929292!2d-35.2676464!3d-5.8976764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff2e2e2e2e2e3%3A0x2e2e2e2e2e2e2e2e!2sR.%20Brg.%20Pessoa%20Ramos%2C%2059%20-%20Cohabinal%2C%20Parnamirim%20-%20RN%2C%2059140-765%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1640000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Sonare Academia de Música"
                  className="w-full h-96"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-8 w-8 text-red-400" />
                <span className="text-xl font-bold">Sonare Academia de Música</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transformando vidas através da música. Sua jornada musical
                começa aqui.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>(84) 99905-2232</p>
                <p>contato@sonareacademia.com.br</p>
                <p>
                  R. Brg. Pessoa Ramos, 59 - Cohabinal, Parnamirim - RN,
                  59140-765
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Instrumentos</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-400 text-sm">
                <p>Piano</p>
                <p>Violão</p>
                <p>Guitarra</p>
                <p>Baixo</p>
                <p>Bateria</p>
                <p>Violino</p>
                <p>Canto</p>
                <p>Flauta</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Sonare Academia de Música. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          showWhatsApp
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }`}
      >
        <button
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group relative"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Fale conosco no WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;