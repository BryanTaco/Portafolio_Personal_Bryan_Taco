import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Calendar, Briefcase, Award, ArrowLeft,
  Github, Linkedin, Mail, Phone, MapPin, Download
} from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Datos estáticos (foto, contacto, educación, referencias)
const datosEstaticos = {
  nombre: "Bryan Steven Taco",
  titulo: "Estudiante en Desarrollo de Software",
  email: "bryantaco10@gmail.com",
  telefono: "+593 996 762 603",
  direccion: "Quito, Urb. 6 de junio etapa 2 Mnz 3 Csa 11",
  linkedin: "https://www.linkedin.com/in/bryan-taco-8922a5204/",
  github: "https://github.com/BryanTaco",
  cvPdf: "/Bryan Steven Taco CV.pdf",
  foto: "/PERFIL.JPG",
  educacion: [
    { titulo: "PRIMARIA", institucion: "Unidad Educativa Hermano Miguel 'La Salle'", periodo: "2010" },
    { titulo: "SECUNDARIA", institucion: "Unidad Educativa 'La Salle'", periodo: "2018" },
    { titulo: "NO CULMINADO", institucion: "Escuela Politécnica Nacional Ing. en Sistemas", periodo: "" },
    { titulo: "EN PROCESO", institucion: "Universidad Católica del Ecuador Desarrollo de Software", periodo: "" }
  ],
  referencias: [
    { nombre: "MBA. Marco F. Taco Iturralde", cargo: "Jefe Gestión Financiera EP PETROECUADOR", contacto: "2563060 Ext.42043 | marco.taco@eppetroecuador.ec" },
    { nombre: "Téc. Stalin Campaña", cargo: "Ing. Técnico de Maquinaria Pesada CATERPILLAR", contacto: "0987136663 | stalin15_sj@hotmail.com" },
    { nombre: "Sra. Ilda Totoy", cargo: "Propietaria CAFETERÍA AROMA DULCE", contacto: "0989584282" }
  ],
  habilidadesDetalles: {
    "Base de Datos": "MongoDB, PostgreSQL, MySQL, SQL Server",
    "Creación de Api": "RESTful APIs con Node.js, Express, FastAPI",
    "Desarrollo Web": "React, Next.js, HTML5, CSS3, JavaScript, Tailwind CSS",
    "Soporte de Web": "Debugging, mantenimiento de servidores, hosting",
    "Illustrador": "Vector graphics, logos, ilustraciones",
    "Configuración de Computadoras y Celulares": "Ensamblaje de hardware, instalación de SO, solución de problemas",
    "Manejo de Word, Excel, PowerPoint": "Fórmulas avanzadas, formato profesional",
    "Creación de Páginas Web": "React, HTML5, CSS3, JavaScript, Tailwind",
    "Canva Arreglo y Detalles en Web": "Diseño gráfico, banners, redes sociales"
  }
};

// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

function useTheme() { return useContext(ThemeContext); }

// Router
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

// Header
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
        <motion.div whileHover={{ scale: 1.05 }} className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
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

        <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
          {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </div>
    </motion.header>
  );
}

// Home - Carga experiencia desde API
function Home() {
  const [experiencia, setExperiencia] = useState([]);

  useEffect(() => {
    api.get('/experiencia')
      .then(res => setExperiencia(res.data))
      .catch(() => setExperiencia([]));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/70 to-slate-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <img src={datosEstaticos.foto} alt="Bryan Steven Taco" className="w-80 h-80 rounded-full ring-8 ring-white/20 shadow-2xl object-cover mx-auto" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <h1 className="text-6xl font-bold">{datosEstaticos.nombre}</h1>
            <div className="bg-blue-950/80 rounded-lg p-6 inline-block">
              <p className="text-2xl font-semibold">Sobre Mí</p>
              <p className="text-xl mt-2">{datosEstaticos.titulo}</p>
            </div>

            <div className="space-y-6 text-lg">
              <a href={`tel:${datosEstaticos.telefono.replace(/\s/g, '')}`} className="flex items-center gap-4 hover:text-indigo-400 transition">
                <Phone className="w-6 h-6 text-blue-400" /> {datosEstaticos.telefono}
              </a>
              <a href={`mailto:${datosEstaticos.email}`} className="flex items-center gap-4 hover:text-indigo-400 transition">
                <Mail className="w-6 h-6 text-blue-400" /> {datosEstaticos.email}
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(datosEstaticos.direccion)}`} target="_blank" className="flex items-center gap-4 hover:text-indigo-400 transition">
                <MapPin className="w-6 h-6 text-blue-400" /> {datosEstaticos.direccion}
              </a>
            </div>

            <div className="flex gap-6">
              <motion.a whileHover={{ scale: 1.05 }} href={datosEstaticos.cvPdf} download className="bg-blue-600 px-8 py-4 rounded-lg font-bold flex items-center gap-3 shadow-xl">
                <Download className="w-6 h-6" /> Descargar CV
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href={datosEstaticos.github} target="_blank" className="p-4 bg-blue-950/80 rounded-xl"><Github className="w-8 h-8" /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href={datosEstaticos.linkedin} target="_blank" className="p-4 bg-blue-950/80 rounded-xl"><Linkedin className="w-8 h-8" /></motion.a>
            </div>
          </motion.div>
        </section>

        {/* Experiencia Laboral */}
        <section className="py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-blue-950/80 inline-block px-6 py-3 rounded">EXPERIENCIA</h2>
            <div className="space-y-8">
              {experiencia.map((exp, i) => (
                <motion.div key={exp.id || i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-blue-950/50 rounded-lg p-6" whileHover={{ scale: 1.05 }}>
                  <p className="font-bold text-xl">{exp.empresa} {exp.periodo && <span className="text-blue-400">({exp.periodo})</span>}</p>
                  <p className="mt-2">{exp.puesto}</p>
                  {exp.descripcion && <p className="mt-2 text-slate-300">{exp.descripcion}</p>}
                  <p className="mt-4 text-sm italic">Responsable: {exp.responsable}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Educación */}
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-blue-950/80 inline-block px-6 py-3 rounded">EDUCACIÓN</h2>
            <div className="space-y-6">
              {datosEstaticos.educacion.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-blue-950/50 rounded-lg p-6" whileHover={{ scale: 1.05 }}>
                  <p className="font-bold text-xl">{edu.titulo}</p>
                  <p className="mt-2">{edu.institucion}</p>
                  {edu.periodo && <p className="text-blue-400">{edu.periodo}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Referencias */}
        <section className="py-16 pb-32">
          <h2 className="text-3xl font-bold mb-8 bg-blue-950/80 inline-block px-6 py-3 rounded">REFERENCIAS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {datosEstaticos.referencias.map((ref, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="bg-blue-950/50 rounded-lg p-6 text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-bold text-xl">• {ref.nombre}</p>
                <p className="mt-2 text-slate-300">{ref.cargo}</p>
                <p className="mt-4 text-sm">{ref.contacto}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// HabilidadesPage - carga desde API
function HabilidadesPage({ navigate }) {
  const [habilidades, setHabilidades] = useState([]);

  useEffect(() => {
    api.get('/habilidades')
      .then(res => setHabilidades(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto py-20">
        <motion.button initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/')} className="flex items-center gap-3 text-indigo-400 mb-12 hover:text-indigo-300 text-lg">
          <ArrowLeft className="w-6 h-6" />
          Volver al inicio
        </motion.button>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-center mb-16">
          Habilidades Detalladas
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {habilidades.map((skill, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-600/60 shadow-2xl"
              whileHover={{ scale: 1.05, y: -20, boxShadow: '0 30px 60px -12px rgba(79, 70, 229, 0.5)' }}
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
                {datosEstaticos.habilidadesDetalles[skill.nombre] || "Experiencia práctica en esta área."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// BlogList y BlogPost (carga desde API)
function BlogList({ navigate }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white pt-24 px-6">
      <div className="max-w-5xl mx-auto py-20">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-center mb-8">Blog Técnico</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-slate-400 text-center mb-16">Tutoriales y análisis sobre desarrollo web</motion.p>

        <div className="grid gap-12">
          {posts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} onClick={() => navigate(`/posts/${post.id}`)} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-10 border border-slate-700 cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/30">
              <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
              <time className="text-slate-400 flex items-center gap-3 mb-6"><Calendar className="w-5 h-5" /> {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <p className="text-slate-300 text-lg leading-relaxed">{post.excerpt}</p>
              <button className="mt-8 text-indigo-400 font-medium hover:text-indigo-300">Leer más →</button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPost({ path, navigate }) {
  const postId = parseInt(path.split('/').pop());
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(() => setPost(null));
  }, [postId]);

  if (!post) return <div className="min-h-screen flex items-center justify-center text-white"><p>Cargando...</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-20">
        <motion.button initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/posts')} className="flex items-center gap-3 text-indigo-400 mb-12 hover:text-indigo-300 text-lg">
          <ArrowLeft className="w-6 h-6" />
          Volver al blog
        </motion.button>

        <motion.article initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-12 border border-slate-700 shadow-2xl">
          <h1 className="text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
          <time className="text-slate-400 flex items-center gap-4 text-lg mb-12"><Calendar className="w-6 h-6" /> {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
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
              {path === '/habilidades' && <motion.div key="habilidades"><HabilidadesPage navigate={navigate} /></motion.div>}
              {path === '/posts' && <motion.div key="bloglist"><BlogList navigate={navigate} /></motion.div>}
              {path.startsWith('/posts/') && <motion.div key="post"><BlogPost path={path} navigate={navigate} /></motion.div>}
            </AnimatePresence>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;