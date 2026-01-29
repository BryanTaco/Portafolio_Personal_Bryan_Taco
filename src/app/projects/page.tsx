'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, Search, Calendar, Users, Star } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
  createdAt: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Plataforma completa de comercio electrónico con carrito de compras, pagos y administración.',
    longDescription: 'Una solución completa de e-commerce construida con Next.js, Stripe para pagos, y PostgreSQL. Incluye panel de administración, gestión de inventario, y sistema de reseñas.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    imageUrl: '/project1.jpg',
    featured: true,
    category: 'web',
    createdAt: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Task Management API',
    description: 'API RESTful para gestión de tareas con autenticación JWT y documentación completa.',
    longDescription: 'API robusta construida con Node.js y Express, utilizando MongoDB para persistencia. Incluye autenticación, autorización, validación de datos, y documentación con Swagger.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com',
    featured: false,
    category: 'api',
    createdAt: '2024-02-20',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Weather App',
    description: 'Aplicación del clima con geolocalización y pronósticos detallados.',
    longDescription: 'Aplicación web responsive que consume la API de OpenWeatherMap. Incluye geolocalización automática, pronósticos de 5 días, y diseño adaptativo.',
    technologies: ['React', 'JavaScript', 'CSS3', 'OpenWeather API'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://weather-app-demo.com',
    featured: true,
    category: 'web',
    createdAt: '2023-12-10',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Portfolio Personal',
    description: 'Sitio web portafolio personal con diseño moderno y animaciones 3D.',
    longDescription: 'Portafolio personal construido con Next.js 14, incluyendo animaciones 3D con Three.js, diseño responsive, y integración con CMS headless.',
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://bryan-taco.dev',
    featured: true,
    category: 'web',
    createdAt: '2024-03-01',
    status: 'in-progress'
  },
  {
    id: '5',
    title: 'Mobile Chat App',
    description: 'Aplicación de chat en tiempo real para dispositivos móviles.',
    longDescription: 'App de mensajería instantánea construida con React Native y Firebase. Incluye autenticación, chat en tiempo real, y notificaciones push.',
    technologies: ['React Native', 'Firebase', 'Expo'],
    githubUrl: 'https://github.com',
    featured: false,
    category: 'mobile',
    createdAt: '2023-11-15',
    status: 'completed'
  },
  {
    id: '6',
    title: 'Data Visualization Dashboard',
    description: 'Dashboard interactivo para visualización de datos empresariales.',
    longDescription: 'Dashboard administrativo con gráficos interactivos usando D3.js y Chart.js. Incluye filtros avanzados, exportación de datos, y responsive design.',
    technologies: ['React', 'D3.js', 'Chart.js', 'Python', 'Flask'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://dashboard-demo.com',
    featured: false,
    category: 'web',
    createdAt: '2023-10-20',
    status: 'completed'
  }
];

const categories = [
  { id: 'all', label: 'Todos', count: projectsData.length },
  { id: 'web', label: 'Web', count: projectsData.filter(p => p.category === 'web').length },
  { id: 'mobile', label: 'Mobile', count: projectsData.filter(p => p.category === 'mobile').length },
  { id: 'api', label: 'API', count: projectsData.filter(p => p.category === 'api').length },
  { id: 'other', label: 'Otros', count: projectsData.filter(p => p.category === 'other').length },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by featured
    if (showFeatured) {
      filtered = filtered.filter(project => project.featured);
    }

    setFilteredProjects(filtered);
  }, [activeCategory, searchTerm, showFeatured, projects]);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'planned':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      case 'planned':
        return 'Planificado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Mis Proyectos
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Una colección de proyectos que demuestran mis habilidades en desarrollo
            full-stack, desde aplicaciones web hasta APIs y soluciones móviles.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar proyectos por nombre, descripción o tecnología..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={showFeatured}
                onChange={(e) => setShowFeatured(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-slate-300 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Mostrar solo proyectos destacados
              </label>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all duration-300 group ${
                project.featured ? 'ring-2 ring-blue-500/50' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl opacity-20">🚀</div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Destacado
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-md text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Código
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Demo
                    </a>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No se encontraron proyectos</h3>
            <p className="text-slate-400">
              Intenta ajustar los filtros de búsqueda o categoría.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{projectsData.length}</div>
            <div className="text-slate-400">Proyectos Totales</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {projectsData.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-slate-400">Completados</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {projectsData.filter(p => p.featured).length}
            </div>
            <div className="text-slate-400">Destacados</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {new Set(projectsData.flatMap(p => p.technologies)).size}
            </div>
            <div className="text-slate-400">Tecnologías</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
