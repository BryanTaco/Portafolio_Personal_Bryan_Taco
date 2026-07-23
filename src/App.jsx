import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { db } from './data/db';

/* ─── COMPONENTES BASE ─── */

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "50px", amount: 0 }}
    transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Magnet = ({ children, padding = 150, strength = 3 }) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    if (Math.abs(distanceX) < width / 2 + padding && Math.abs(distanceY) < height / 2 + padding) {
      setIsActive(true);
      setPosition({ x: distanceX / strength, y: distanceY / strength });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

const TypeWriter = ({ texts, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    let timeout;
    if (!isDeleting && displayText === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((i) => (i + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
};

const StatCounter = ({ numero, etiqueta }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const hasPlus = numero.includes('+');
  const numVal = parseInt(numero);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const steps = 60;
    const increment = numVal / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numVal) { setCount(numVal); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, numVal]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="hero-heading font-black text-[clamp(2.5rem,7vw,5rem)] leading-none">
        {count}{hasPlus ? '+' : ''}
      </div>
      <p className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs sm:text-sm mt-3">{etiqueta}</p>
    </div>
  );
};

const SkillBar = ({ nombre, nivel, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-[#D7E2EA] font-medium text-sm sm:text-base">{nombre}</span>
        <span className="text-[#D7E2EA]/50 text-xs sm:text-sm font-mono">{nivel}%</span>
      </div>
      <div className="h-1.5 bg-[#D7E2EA]/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7621B0, #B600A8, #BE4C00)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${nivel}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

/* Animación por palabras (no por caracter) para mayor legibilidad */
const AnimatedText = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.3'] });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className="text-[#D7E2EA] font-medium text-center leading-loose max-w-[640px] text-[clamp(1rem,2vw,1.3rem)]"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 2 / words.length);
        return (
          <span key={i}>
            <motion.span
              style={{ opacity: useTransform(scrollYProgress, [start, end], [0.1, 1]) }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
};

const ContactBtn = ({ href, children = "Contáctame", external = true }) => {
  const finalHref = href ?? db.social.whatsapp;
  return (
    <a href={finalHref} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base overflow-hidden group"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.22)',
          boxShadow: '0 4px 24px rgba(182,0,168,0.22), 0 1px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.12) inset',
        }}
      >
        <motion.span
          className="absolute top-0 left-0 h-full w-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)', skewX: '-15deg' }}
          animate={{ x: ['-150%', '350%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
        />
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(182,0,168,0.45) 0%, transparent 65%)' }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    </a>
  );
};

/* ─── NAVBAR ─── */

const NavBar = () => {
  const [hovered, setHovered] = useState(null);
  const links = [
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="relative flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full z-30">
      <FadeIn delay={0} y={-20} className="w-full flex justify-between">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-all duration-300 cursor-pointer"
            style={{
              color: '#D7E2EA',
              opacity: hovered !== null && hovered !== i ? 0.2 : 1,
              filter: hovered !== null && hovered !== i ? 'blur(3px)' : 'none',
              transform: hovered === i ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            {link.label}
          </a>
        ))}
      </FadeIn>
    </nav>
  );
};

/* ─── SECCIONES ─── */

const HeroSection = () => (
  <section id="inicio" className="h-screen flex flex-col relative overflow-x-clip bg-[#0C0C0C]">
    <NavBar />

    <div className="flex-1 flex flex-col justify-center items-center relative z-20 overflow-hidden mt-4 md:-mt-4">
      <FadeIn delay={0.15} y={40} className="text-center leading-none flex flex-col items-center w-full">
        <span
          className="hero-heading font-black uppercase tracking-[0.18em] block opacity-50"
          style={{ fontSize: 'clamp(1.4rem, 6vw, 5.5rem)' }}
        >
          Hola, Soy
        </span>
        <span
          className="hero-heading font-black uppercase tracking-tight leading-none block w-full text-center"
          style={{ fontSize: 'clamp(5rem, 30vw, 28rem)' }}
        >
          Bryan
        </span>
      </FadeIn>
    </div>

    <div className="relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full">
      <FadeIn delay={0.35} y={20}>
        <div className="flex flex-col gap-1.5">
          <span className="text-[#D7E2EA]/30 text-[0.55rem] uppercase tracking-[0.3em]">Especialidad</span>
          <TypeWriter
            texts={["Desarrollador Full Stack", "Diseñador UI/UX", "Ingeniero en Sistemas", "Creador de Experiencias"]}
            className="text-[#D7E2EA] font-medium uppercase tracking-wide text-[clamp(0.7rem,1.4vw,1.2rem)]"
          />
          <p className="text-[#D7E2EA]/35 font-light uppercase tracking-wide leading-snug text-[clamp(0.6rem,0.9vw,0.8rem)] max-w-[200px] sm:max-w-[260px]">
            Construyendo el futuro digital desde Quito, Ecuador
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.5} y={20}>
        <ContactBtn />
      </FadeIn>
    </div>

    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-10 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[500px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
      <FadeIn delay={0.6} y={30}>
        <Magnet>
          <img src="/PERFIL.JPG" alt="Bryan Taco" className="w-full h-auto object-cover rounded-full" />
        </Magnet>
      </FadeIn>
    </div>
  </section>
);

const MarqueeSection = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('marquee-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const sectionTop = rect.top + window.scrollY;
          setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imgs = db.marquee;
  const row1 = [...imgs.slice(0, 11), ...imgs.slice(0, 11), ...imgs.slice(0, 11)];
  const row2 = [...imgs.slice(11), ...imgs.slice(11), ...imgs.slice(11)];

  return (
    <section id="marquee-section" className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 whitespace-nowrap" style={{ transform: `translate3d(${offset - 200}px, 0, 0)`, willChange: 'transform' }}>
          {row1.map((src, i) => <img key={i} src={src} loading="lazy" alt="" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" />)}
        </div>
        <div className="flex gap-3 whitespace-nowrap" style={{ transform: `translate3d(${-(offset - 200)}px, 0, 0)`, willChange: 'transform' }}>
          {row2.map((src, i) => <img key={i} src={src} loading="lazy" alt="" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" />)}
        </div>
      </div>
    </section>
  );
};

const BADGES = [
  "Full Stack Dev",
  "Diseñador UI/UX",
  "Moda Urbana & Formal",
  "PUCE · Sistemas",
  "React + Node",
  "Bilingüe",
];

const AboutSection = () => (
  <section id="sobre-mi" className="min-h-screen flex flex-col items-center justify-center relative px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]">
    <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" />
    </FadeIn>
    <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" />
    </FadeIn>
    <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" />
    </FadeIn>
    <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" />
    </FadeIn>

    <div className="flex flex-col items-center z-10 max-w-3xl">
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)] mb-10 sm:mb-12">
          Sobre Mí
        </h2>
      </FadeIn>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
        {BADGES.map((label, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08, y: -3 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/80 text-xs sm:text-sm font-medium tracking-wide"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      <AnimatedText text="Soy Bryan Taco, estudiante de Ingeniería en Sistemas en la PUCE. Desarrollador full stack y diseñador UI/UX. Me apasiona la moda — visto urbano y formal — porque creo que el estilo, como el código, dice quién eres antes de que hables. Si buscas alguien técnico con carácter, hablemos." />

      <div className="mt-14 sm:mt-16 md:mt-20">
        <ContactBtn />
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="bg-[#0C0C0C] py-16 sm:py-20 px-5 sm:px-8 md:px-10 border-t border-b border-[#D7E2EA]/5">
    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {db.stats.map((stat, i) => (
        <FadeIn key={i} delay={i * 0.1} y={20}>
          <StatCounter numero={stat.numero} etiqueta={stat.etiqueta} />
        </FadeIn>
      ))}
    </div>
  </section>
);

const SkillsSection = () => (
  <section id="habilidades" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}>
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20">
        Habilidades
      </h2>
    </FadeIn>

    <FadeIn y={20} delay={0.1} className="mb-12 sm:mb-16">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        {db.tecnologias.map((tech, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.06 }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#D7E2EA]/15 rounded-full text-[#D7E2EA]/60 text-xs sm:text-sm font-mono hover:border-[#B600A8]/60 hover:text-[#D7E2EA] transition-all duration-300 cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </FadeIn>

    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      {db.habilidades.map((skill, i) => (
        <SkillBar key={i} {...skill} delay={i * 0.06} />
      ))}
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="servicios" className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
    <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
      Servicios
    </h2>
    <div className="max-w-5xl mx-auto flex flex-col">
      {db.servicios.map((service, i) => (
        <FadeIn key={service.id} delay={i * 0.1} y={30} className="border-b border-[rgba(12,12,12,0.12)] last:border-0 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            <span className="font-black text-[#0C0C0C] text-[clamp(2.5rem,8vw,110px)] leading-none shrink-0">
              {service.id}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                {service.titulo}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-55">
                {service.descripcion}
              </p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

const ExperienceSection = () => (
  <section id="experiencia" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}>
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Experiencia
      </h2>
    </FadeIn>

    <div className="max-w-2xl mx-auto relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#B600A8] via-[#7621B0]/40 to-transparent" />

      {db.experiencia.map((exp, i) => (
        <FadeIn key={exp.id} delay={i * 0.12} y={30} className="relative pl-10 mb-8 last:mb-0">
          <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#B600A8] bg-[#0C0C0C] flex items-center justify-center">
            {exp.actual && <div className="w-1.5 h-1.5 rounded-full bg-[#B600A8] animate-pulse" />}
          </div>

          <motion.div
            whileHover={{ borderColor: 'rgba(215,226,234,0.25)' }}
            className="p-5 sm:p-6 rounded-2xl border border-[#D7E2EA]/10 transition-colors duration-300"
            style={{ background: 'rgba(215,226,234,0.02)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-[#D7E2EA]/40 text-xs uppercase tracking-widest font-mono">{exp.periodo}</span>
              {exp.actual && (
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full border border-[#B600A8]/50 text-[#B600A8] font-semibold uppercase tracking-wider">
                  Actual
                </span>
              )}
            </div>
            <h3 className="text-[#D7E2EA] font-semibold text-base sm:text-lg mb-0.5">{exp.empresa}</h3>
            <p className="text-[#D7E2EA]/50 text-xs sm:text-sm uppercase tracking-wide mb-3">{exp.puesto}</p>
            <p className="text-[#D7E2EA]/40 text-sm leading-relaxed mb-3">{exp.descripcion}</p>
            {exp.referencia && (
              <div className="flex items-center gap-2 pt-3 border-t border-[#D7E2EA]/8">
                <span className="text-[#D7E2EA]/25 text-[0.65rem] uppercase tracking-widest">Ref.</span>
                <span className="text-[#D7E2EA]/50 text-xs font-medium">{exp.referencia.nombre}</span>
                {exp.referencia.contacto && (
                  <a
                    href={`tel:${exp.referencia.contacto}`}
                    className="text-[#D7E2EA]/30 hover:text-[#D7E2EA]/60 text-xs font-mono transition-colors ml-auto"
                  >
                    {exp.referencia.contacto}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </FadeIn>
      ))}
    </div>
  </section>
);

const EducationSection = () => (
  <section id="educacion" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}>
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Educación
      </h2>
    </FadeIn>

    <div className="max-w-2xl mx-auto relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#D7E2EA]/70 via-[#D7E2EA]/20 to-transparent" />

      {db.educacion.map((edu, i) => (
        <FadeIn key={edu.id} delay={i * 0.12} y={30} className="relative pl-10 mb-8 last:mb-0">
          <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#D7E2EA]/60 bg-[#0C0C0C] flex items-center justify-center">
            {edu.actual && <div className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA] animate-pulse" />}
          </div>

          <motion.div
            whileHover={{ borderColor: 'rgba(215,226,234,0.25)' }}
            className="p-5 sm:p-6 rounded-2xl border border-[#D7E2EA]/10 transition-colors duration-300"
            style={{ background: 'rgba(215,226,234,0.02)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-[#D7E2EA]/40 text-xs uppercase tracking-widest font-mono">{edu.periodo}</span>
              {edu.actual && (
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]/60 font-semibold uppercase tracking-wider">
                  En Curso
                </span>
              )}
            </div>
            <h3 className="text-[#D7E2EA] font-semibold text-base sm:text-lg mb-0.5">{edu.institucion}</h3>
            <p className="text-[#D7E2EA]/50 text-xs sm:text-sm uppercase tracking-wide mb-3">{edu.titulo}</p>
            <p className="text-[#D7E2EA]/40 text-sm leading-relaxed">{edu.descripcion}</p>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  </section>
);

const VerProyectoButton = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors">
    Ver Proyecto
  </button>
);

const ProjectCard = ({ project, index, totalCards }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      className={`sticky bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 origin-top flex flex-col gap-8 shadow-2xl ${index < totalCards - 1 ? 'mb-[50vh]' : 'mb-10'}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start gap-4 md:gap-8">
          <span className="font-black text-[#D7E2EA] text-[clamp(3rem,8vw,100px)] leading-none shrink-0">0{project.id}</span>
          <div>
            <p className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm mb-1">{project.categoria}</p>
            <h3 className="text-[#D7E2EA] font-medium text-xl md:text-4xl">{project.nombre}</h3>
            <p className="text-[#D7E2EA]/40 text-sm mt-1.5 max-w-sm leading-relaxed">{project.descripcion}</p>
            <div className="flex gap-2 flex-wrap mt-2.5">
              {project.tecnologias.map((t) => (
                <span key={t} className="text-[0.65rem] px-2 py-0.5 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/50 font-mono">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <VerProyectoButton />
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
        <div className="w-full md:w-[40%] flex flex-col gap-4">
          <img src={project.imagenes[0]} alt="" className="w-full h-[clamp(130px,16vw,230px)] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" />
          <img src={project.imagenes[1]} alt="" className="w-full h-[clamp(160px,22vw,340px)] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex-1" />
        </div>
        <div className="w-full md:w-[60%] h-full">
          <img src={project.imagenes[2]} alt="" className="w-full h-full min-h-[300px] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <section id="proyectos" className="bg-[#0C0C0C] relative z-20 px-5 sm:px-8 md:px-10 py-20 pb-[20vh]">
    <FadeIn y={40}>
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Proyectos
      </h2>
    </FadeIn>
    <div className="max-w-6xl mx-auto relative">
      {db.proyectos.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} totalCards={db.proyectos.length} />
      ))}
    </div>
  </section>
);

const ReferencesSection = () => (
  <section id="referencias" className="relative z-30 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 border-t border-[#D7E2EA]/10">
    <FadeIn y={40}>
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20">
        Referencias
      </h2>
    </FadeIn>

    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
      {db.referencias.map((persona, i) => (
        <div
          key={i}
          className="p-6 sm:p-7 rounded-2xl border border-[#D7E2EA]/20 h-full flex flex-col gap-1"
          style={{ background: 'rgba(215,226,234,0.05)' }}
        >
          <p className="text-[#D7E2EA] font-semibold text-sm sm:text-base leading-snug">{persona.nombre}</p>
          <p className="text-[#D7E2EA]/65 text-xs uppercase tracking-wide mt-0.5">{persona.cargo}</p>
          <p className="text-[#B600A8]/80 text-[0.7rem] uppercase tracking-widest font-medium mb-3">{persona.empresa}</p>
          <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-[#D7E2EA]/10">
            {persona.telefono && (
              <a href={`tel:${persona.telefono.replace(/\s/g, '')}`} className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-xs font-mono transition-colors flex items-center gap-1.5">
                <Phone size={11} className="shrink-0" />
                {persona.telefono}
              </a>
            )}
            {persona.email && (
              <a href={`mailto:${persona.email}`} className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-xs font-mono transition-colors break-all flex items-center gap-1.5">
                <Mail size={11} className="shrink-0" />
                {persona.email}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const SOCIAL_LINKS = [
  { icon: <MessageCircle size={22} />, label: "WhatsApp", value: "+593 996 762 603", href: db.social.whatsapp },
  { icon: <Mail size={22} />, label: "Email", value: "bryantaco10@gmail.com", href: `mailto:${db.social.email}` },
  { icon: <Instagram size={22} />, label: "Instagram", value: "@bryantaco", href: db.social.instagram },
  { icon: <Linkedin size={22} />, label: "LinkedIn", value: "Bryan Taco", href: db.social.linkedin },
  { icon: <Phone size={22} />, label: "Teléfono", value: "0996762603", href: `tel:${db.social.telefono}` },
  { icon: <MapPin size={22} />, label: "Ubicación", value: "Quito, Ecuador", href: db.social.maps },
];

const ContactSection = () => (
  <section id="contacto" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}>
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-6 sm:mb-8">
        Contacto
      </h2>
    </FadeIn>
    <FadeIn y={20} delay={0.1}>
      <p className="text-[#D7E2EA]/50 text-center text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-14">
        Disponible para proyectos freelance, colaboraciones y nuevas oportunidades. Escríbeme directamente por WhatsApp.
      </p>
    </FadeIn>

    <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14">
      {SOCIAL_LINKS.map((item, i) => {
        const Tag = item.href ? 'a' : 'div';
        const props = item.href
          ? { href: item.href, target: '_blank', rel: 'noreferrer' }
          : {};
        return (
          <FadeIn key={i} delay={0.1 + i * 0.08} y={20}>
            <Tag
              {...props}
              className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border border-[#D7E2EA]/10 hover:border-[#B600A8]/40 group transition-all duration-300 text-center"
              style={{ background: 'rgba(215,226,234,0.02)' }}
            >
              <div className="text-[#D7E2EA]/30 group-hover:text-[#B600A8] transition-colors duration-300">
                {item.icon}
              </div>
              <span className="text-[#D7E2EA]/30 text-[0.65rem] uppercase tracking-widest">{item.label}</span>
              <span className="text-[#D7E2EA] text-xs sm:text-sm font-medium break-all">{item.value}</span>
            </Tag>
          </FadeIn>
        );
      })}
    </div>

    <FadeIn delay={0.6} y={20} className="flex justify-center">
      <ContactBtn href={db.social.whatsapp}>Escribir por WhatsApp</ContactBtn>
    </FadeIn>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/5 px-5 sm:px-8 md:px-10 py-8 sm:py-10">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
      <p className="text-[#D7E2EA]/20 text-sm">© 2025 Bryan Taco · Quito, Ecuador</p>

      <div className="flex gap-5">
        <a href={db.social.whatsapp} target="_blank" rel="noreferrer" className="text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 transition-colors duration-200">
          <MessageCircle size={18} />
        </a>
        <a href={db.social.instagram} target="_blank" rel="noreferrer" className="text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 transition-colors duration-200">
          <Instagram size={18} />
        </a>
        <a href={db.social.linkedin} target="_blank" rel="noreferrer" className="text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 transition-colors duration-200">
          <Linkedin size={18} />
        </a>
        <a href={`mailto:${db.social.email}`} className="text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 transition-colors duration-200">
          <Mail size={18} />
        </a>
      </div>

      <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
        {[
          { label: "Inicio", href: "#inicio" },
          { label: "Sobre Mí", href: "#sobre-mi" },
          { label: "Educación", href: "#educacion" },
          { label: "Proyectos", href: "#proyectos" },
          { label: "Contacto", href: "#contacto" },
        ].map(({ label, href }) => (
          <a key={label} href={href} className="text-[#D7E2EA]/20 hover:text-[#D7E2EA]/60 text-sm transition-colors duration-200">
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

/* ─── APP ─── */

function App() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] overflow-x-clip selection:bg-[#B600A8] selection:text-white">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <StatsSection />
      <SkillsSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ReferencesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
