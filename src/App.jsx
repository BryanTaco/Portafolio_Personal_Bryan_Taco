import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Calendar, Briefcase, Code, BookOpen, Award, ArrowLeft,
  Github, Linkedin, Mail, Phone, MapPin, Clock, Download, Globe
} from 'lucide-react';

const datosCV = {
  nombre: "Bryan Steven Taco Jaramillo",
  titulo: "Estudiante en Desarrollo de Software",
  subtitulo: "Desarrollador Web | Soporte Técnico | Diseño Digital",
  email: "bryantaco10@gmail.com",
  telefono: "+593 996 762 603",
  direccion: "Quito, Urb. 6 de junio etapa 2 Mnz 3 Csa 11",
  linkedin: "https://www.linkedin.com/in/bryan-taco-8922a5204/",
  github: "https://github.com/BryanTaco",
  cvPdf: "/Bryan Steven Taco CV.pdf",
  foto: "/PERFIL.JPG",
  resumen: "Estudiante apasionado por el desarrollo de software con experiencia práctica en creación de páginas web, soporte técnico, bases de datos y diseño digital. Busco oportunidades para aplicar y crecer en entornos profesionales.",
  habilidades: [
    { nombre: "Base de Datos", nivel: 85 },
    { nombre: "Creación de API", nivel: 80 },
    { nombre: "Desarrollo Web", nivel: 90 },
    { nombre: "Soporte Técnico Web", nivel: 88 },
    { nombre: "Diseño con Canva", nivel: 90 },
    { nombre: "Illustrator", nivel: 75 },
    { nombre: "Configuración PC/Celulares", nivel: 92 },
    { nombre: "Office (Word, Excel, PowerPoint)", nivel: 95 }
  ],
  habilidadesDetalles: {
    "Base de Datos": "MongoDB, PostgreSQL, MySQL, SQL Server",
    "Creación de API": "RESTful APIs con Node.js, Express, FastAPI",
    "Desarrollo Web": "React, Next.js, HTML5, CSS3, JavaScript, Tailwind CSS",
    "Soporte Técnico Web": "Debugging, mantenimiento de servidores, hosting (Vercel, Netlify, Heroku)",
    "Diseño con Canva": "Diseño gráfico, banners, posters, redes sociales",
    "Illustrator": "Vector graphics, logos, ilustraciones",
    "Configuración PC/Celulares": "Ensamblaje de hardware, instalación de SO (Windows, Linux), solución de problemas",
    "Office (Word, Excel, PowerPoint)": "Fórmulas avanzadas en Excel, formato de documentos, presentaciones profesionales"
  },
  idiomas: [
    { nombre: "Español", nivel: "Nativo" },
    { nombre: "Inglés", nivel: "Intermedio" }
  ],
  experienciaLaboral: [
    {
      empresa: "Destellos de Amor",
      puesto: "Desarrollador Web y Soporte Técnico",
      periodo: "2024 - Actual",
      actual: true,
      descripcion: "Elaboración de publicidad mediante páginas web. Soporte a maquinarias y mantenimiento.",
      responsable: "Katherine Taco - 098451104"
    },
    {
      empresa: "SECURITY S.A",
      puesto: "Seguridad Web",
      periodo: "2023",
      descripcion: "Funciones de seguridad de páginas web.",
      responsable: "Andrea Pinto"
    },
    {
      empresa: "Automotors S.A",
      puesto: "Digitador Responsable",
      periodo: "2023",
      descripcion: "Digitación y manejo de base de datos.",
      responsable: "María José Escanta - 0998602722"
    },
    {
      empresa: "Cyber Liz",
      puesto: "Atención al Cliente",
      periodo: "2019",
      descripcion: "Atención al cliente en cibercafé.",
      responsable: "Rodrigo Taco - 0985834706"
    }
  ],
  educacion: [
    {
      titulo: "Desarrollo de Software",
      institucion: "Pontificia Universidad Católica del Ecuador",
      periodo: "En proceso",
      descripcion: "Actualmente cursando la carrera con enfoque en desarrollo de software."
    },
    {
      titulo: "Ingeniería en Sistemas",
      institucion: "Escuela Politécnica Nacional",
      periodo: "No culminado",
      descripcion: ""
    },
    {
      titulo: "Secundaria",
      institucion: "Unidad Educativa 'La Salle'",
      periodo: "2018",
      descripcion: ""
    },
    {
      titulo: "Primaria",
      institucion: "Unidad Educativa Hermano Miguel 'La Salle'",
      periodo: "2010",
      descripcion: ""
    }
  ],
  referencias: [
    {
      nombre: "MBA. Marco F. Taco Iturralde",
      cargo: "Jefe Gestión Financiera EP PETROECUADOR",
      contacto: "2563060 Ext. 42043 | marco.taco@eppetroecuador.ec"
    },
    {
      nombre: "Téc. Stalin Campaña",
      cargo: "Ing. Técnico de Maquinaria Pesada CATERPILLAR",
      contacto: "0987136663 | stalin15_sj@hotmail.com"
    },
    {
      nombre: "Sra. Ilda Totoy",
      cargo: "Propietaria CAFETERÍA AROMA DULCE",
      contacto: "0989584282"
    }
  ]
};

const datosPosts = [
  {
    id: 1,
    title: "Cómo construir una lista de tareas con React y JSON Server",
    date: "2025-04-10",
    excerpt: "Tutorial completo para crear una aplicación CRUD usando React, Axios y JSON Server",
    content: `# Introducción...\n\n## Conclusión...`
  },
  {
    id: 2,
    title: "Análisis de la propuesta Temporal en TC39",
    date: "2025-04-15",
    excerpt: "Explorando la revolucionaria API Temporal para manejo de fechas en JavaScript",
    content: `# La Propuesta Temporal...\n\n## Conclusión...`
  }
];

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function Router({ children }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return children({ path, navigate });
}

function Header({ navigate, currentPath }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-gradient-to-br from-slate-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl"
        >
          B
        </motion.div>

        <nav className="flex gap-12">
          <button onClick={() => navigate('/')} className={`text-lg font-medium transition ${currentPath === '/' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>
            Inicio
          </button>
          <button onClick={() => navigate('/habilidades')} className={`text-lg font-medium transition ${currentPath === '/habilidades' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>
            Habilidades
          </button>
          <button onClick={() => navigate('/posts')} className={`text-lg font-medium transition ${currentPath.startsWith('/posts') ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>
            Blog
          </button>
        </nav>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </div>
    </motion.header>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-24">
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="flex items-center gap-8">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={datosCV.foto}
                  alt="Bryan Steven Taco"
                  className="w-48 h-48 rounded-full ring-8 ring-slate-700 shadow-2xl object-cover"
                />
                <div>
                  <h1 className="text-5xl font-bold text-slate-100">{datosCV.nombre}</h1>
                  <p className="text-2xl text-indigo-400 mt-3">{datosCV.titulo}</p>
                  <p className="text-lg text-slate-400">{datosCV.subtitulo}</p>
                </div>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">{datosCV.resumen}</p>

              <div className="flex gap-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={datosCV.cvPdf}
                  download
                  className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition"
                >
                  <Download className="w-6 h-6" /> Descargar CV
                </motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href={datosCV.github} target="_blank" rel="noopener" className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition"><Github className="w-8 h-8" /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href={datosCV.linkedin} target="_blank" rel="noopener" className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition"><Linkedin className="w-8 h-8" /></motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-600/60 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4"><Mail className="w-8 h-8 text-indigo-400" /> Contacto</h3>
              <div className="space-y-6 text-lg text-slate-300">
                <a href={`tel:${datosCV.telefono.replace(/\s/g, '')}`} className="flex items-center gap-4 hover:text-indigo-400 transition">
                  <Phone className="w-6 h-6" /> {datosCV.telefono}
                </a>
                <a href={`mailto:${datosCV.email}`} className="flex items-center gap-4 hover:text-indigo-400 transition">
                  <Mail className="w-6 h-6" /> {datosCV.email}
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(datosCV.direccion)}`} target="_blank" className="flex items-center gap-4 hover:text-indigo-400 transition">
                  <MapPin className="w-6 h-6" /> {datosCV.direccion}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-16 text-center">
            <Briefcase className="w-10 h-10 text-indigo-500 inline mr-4" /> Experiencia Laboral
          </motion.h2>

          <div className="space-y-12">
            {datosCV.experienciaLaboral.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.2 }}
                className="bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-600/60 relative shadow-2xl"
                whileHover={{ 
                  scale: 1.05, 
                  y: -20, 
                  boxShadow: '0 30px 60px -12px rgba(79, 70, 229, 0.5)' 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {exp.actual && <span className="absolute -top-3 right-8 px-5 py-1 bg-green-900/70 text-green-400 rounded-full text-sm font-bold">Actual</span>}
                <h3 className="text-2xl font-bold text-indigo-300">{exp.puesto}</h3>
                <p className="text-xl text-slate-300 mt-2">{exp.empresa}</p>
                <p className="text-slate-400 mt-3 flex items-center gap-3"><Clock className="w-5 h-5" /> {exp.periodo}</p>
                <p className="text-slate-300 mt-6 leading-relaxed">{exp.descripcion}</p>
                <p className="text-slate-500 mt-4 italic">Referencia: {exp.responsable}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educación */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-16 text-center">
          <Award className="w-10 h-10 text-indigo-500 inline mr-4" /> Educación
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {datosCV.educacion.map((edu, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-600/60 shadow-2xl"
              whileHover={{ 
                scale: 1.05, 
                y: -20, 
                boxShadow: '0 30px 60px -12px rgba(79, 70, 229, 0.5)' 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-indigo-300">{edu.titulo}</h3>
              <p className="text-xl text-slate-300 mt-3">{edu.institucion}</p>
              <p className="text-slate-400 mt-3">{edu.periodo}</p>
              {edu.descripcion && <p className="text-slate-300 mt-5 italic">{edu.descripcion}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Referencias */}
      <section className="py-20 px-6 bg-slate-900/50 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-16 text-center">
            Referencias
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {datosCV.referencias.map((ref, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.2 }}
                className="bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-600/60 text-center shadow-2xl"
                whileHover={{ 
                  scale: 1.05, 
                  y: -20, 
                  boxShadow: '0 30px 60px -12px rgba(79, 70, 229, 0.5)' 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-xl font-bold text-indigo-300">{ref.nombre}</h4>
                <p className="text-slate-300 mt-3">{ref.cargo}</p>
                <p className="text-slate-400 mt-5">{ref.contacto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HabilidadesPage({ navigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto py-20">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-indigo-400 mb-12 hover:text-indigo-300 text-lg"
        >
          <ArrowLeft className="w-6 h-6" />
          Volver al inicio
        </motion.button>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Habilidades Detalladas
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {datosCV.habilidades.map((skill, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-600/60 shadow-2xl"
              whileHover={{ 
                scale: 1.05, 
                y: -20, 
                boxShadow: '0 30px 60px -12px rgba(79, 70, 229, 0.5)' 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between text-xl mb-4">
                <span className="font-bold">{skill.nombre}</span>
                <span className="text-indigo-400 font-bold">{skill.nivel}%</span>
              </div>
              <div className="h-8 bg-slate-800/80 rounded-full overflow-hidden shadow-inner mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.nivel}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeOut", delay: i * 0.15 }}
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-full shadow-2xl"
                />
              </div>
              <p className="text-slate-300 leading-relaxed">
                {datosCV.habilidadesDetalles[skill.nombre] || "Experiencia práctica en esta área."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogList({ navigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white pt-24 px-6">
      <div className="max-w-5xl mx-auto py-20">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-center mb-8">Blog Técnico</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-slate-400 text-center mb-16">Tutoriales y análisis sobre desarrollo web</motion.p>

        <div className="grid gap-12">
          {datosPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              onClick={() => navigate(`/posts/${post.id}`)}
              className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-10 border border-slate-700 cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/30"
            >
              <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
              <time className="text-slate-400 flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5" />
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <p className="text-slate-300 text-lg leading-relaxed">{post.excerpt}</p>
              <button className="mt-8 text-indigo-400 font-medium hover:text-indigo-300">
                Leer más →
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPost({ path, navigate }) {
  const postId = parseInt(path.split('/').pop());
  const post = datosPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Post no encontrado</h2>
          <button onClick={() => navigate('/posts')} className="text-indigo-400 hover:underline">
            ← Volver al blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-20">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/posts')}
          className="flex items-center gap-3 text-indigo-400 mb-12 hover:text-indigo-300 text-lg"
        >
          <ArrowLeft className="w-6 h-6" />
          Volver al blog
        </motion.button>

        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-12 border border-slate-700 shadow-2xl"
        >
          <h1 className="text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
          <time className="text-slate-400 flex items-center gap-4 text-lg mb-12">
            <Calendar className="w-6 h-6" />
            {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>

          <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold mt-12 mb-6">{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold mt-10 mb-4">{line.slice(3)}</h2>;
              if (line.startsWith('```')) return <pre key={i} className="bg-slate-800 p-8 rounded-2xl overflow-x-auto my-12"><code className="text-sm">{line.slice(3)}</code></pre>;
              if (line.trim() === '') return <div key={i} className="my-8" />;
              return <p key={i}>{line}</p>;
            })}
          </div>
        </motion.article>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        {({ path, navigate }) => (
          <>
            <Header navigate={navigate} currentPath={path} />
            <AnimatePresence mode="wait">
              {path === '/' && <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Home /></motion.div>}
              {path === '/posts' && <motion.div key="bloglist"><BlogList navigate={navigate} /></motion.div>}
              {path.startsWith('/posts/') && <motion.div key="post"><BlogPost path={path} navigate={navigate} /></motion.div>}
              {path === '/habilidades' && <motion.div key="habilidades"><HabilidadesPage navigate={navigate} /></motion.div>}
            </AnimatePresence>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;