 'use client';

import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Server, Shield, Users, Award, Heart, Coffee, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const skills = [
    { name: 'Frontend Development', icon: Globe, level: 90, description: 'React, Next.js, TypeScript, Tailwind CSS' },
    { name: 'Backend Development', icon: Server, level: 85, description: 'Node.js, Express, REST APIs, GraphQL' },
    { name: 'Database Design', icon: Database, level: 80, description: 'MongoDB, PostgreSQL, Prisma, Mongoose' },
    { name: 'Mobile Development', icon: Smartphone, level: 75, description: 'React Native, Flutter, PWA' },
    { name: 'DevOps & Security', icon: Shield, level: 70, description: 'Docker, AWS, Security Best Practices' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Enfoque en Resultados',
      description: 'Me concentro en entregar soluciones que generen impacto real y valor para los usuarios finales.'
    },
    {
      icon: Lightbulb,
      title: 'Innovación Constante',
      description: 'Siempre busco nuevas tecnologías y enfoques creativos para resolver problemas complejos.'
    },
    {
      icon: Users,
      title: 'Trabajo en Equipo',
      description: 'Creo en la colaboración y el aprendizaje continuo con colegas y comunidades de desarrollo.'
    },
    {
      icon: Heart,
      title: 'Pasión por el Código',
      description: 'Disfruto cada línea de código que escribo y cada desafío que resuelvo.'
    },
  ];

  const journey = [
    {
      year: '2024',
      title: 'Desarrollo Full Stack',
      description: 'Especialización en desarrollo web moderno con Next.js, bases de datos y despliegue en la nube.',
      status: 'current'
    },
    {
      year: '2023',
      title: 'Primeros Pasos en Desarrollo',
      description: 'Inicio del viaje en el mundo del desarrollo web, aprendiendo HTML, CSS y JavaScript.',
      status: 'completed'
    },
    {
      year: '2022',
      title: 'Fundamentos Técnicos',
      description: 'Adquisición de conocimientos básicos en computación y lógica de programación.',
      status: 'completed'
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sobre Mí
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Desarrollador apasionado por crear experiencias digitales excepcionales
            que combinan tecnología de vanguardia con diseño intuitivo.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-6">Mi Historia</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Mi viaje en el desarrollo de software comenzó con la curiosidad por entender
                cómo funcionan las aplicaciones que usamos diariamente. Esta curiosidad se
                transformó en pasión cuando escribí mi primera línea de código.
              </p>
              <p>
                Actualmente, estoy cursando la carrera de Desarrollo de Software en la
                Universidad Católica del Ecuador, donde he adquirido conocimientos sólidos
                en tecnologías modernas y mejores prácticas de desarrollo.
              </p>
              <p>
                Creo firmemente que la tecnología debe ser accesible y útil para todos.
                Mi objetivo es crear soluciones que no solo funcionen bien técnicamente,
                sino que también proporcionen valor real a las personas.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-slate-400">Proyectos</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                <div className="text-2xl font-bold text-purple-400">2+</div>
                <div className="text-sm text-slate-400">Años Exp.</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center">
                <div className="text-2xl font-bold text-pink-400">10+</div>
                <div className="text-sm text-slate-400">Tecnologías</div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-6">Habilidades Técnicas</h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-slate-700 rounded-lg">
                      <skill.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-sm text-slate-400">{skill.description}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Mis Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Mi Trayectoria</h2>
          <div className="space-y-8">
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 max-w-md ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === 'current'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {item.year}
                      </span>
                      {item.status === 'current' && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          Actual
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Datos Curiosos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
              <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Café Adicto</h3>
              <p className="text-slate-400 text-sm">Más de 500 tazas de café consumidas mientras programo</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
              <Code className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Código Limpio</h3>
              <p className="text-slate-400 text-sm">Creo que el código debe ser tan legible como un buen libro</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Aprendiz Vitalicio</h3>
              <p className="text-slate-400 text-sm">Siempre aprendiendo algo nuevo, nunca me detengo</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
