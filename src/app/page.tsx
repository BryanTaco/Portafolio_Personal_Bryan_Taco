'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Languages, Users, Code, Database, Globe, Award, ChevronRight, Download, Calendar, Building2 } from 'lucide-react';

export default function CurriculumVitae() {
  const [activeSection, setActiveSection] = useState('experience');
  const [particles, setParticles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  // INSTRUCCIONES: Para poner tu foto, reemplaza la URL a continuación con la URL de tu imagen
  const imageUrl = 'PERFIL.JPG';

  // Configuración de ubicación
  const location = {
    city: 'Quito',
    address: 'Urb. 6 de junio etapa 2 Mz 3 Cs 11',
    country: 'Ecuador',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Quito,Urb+6+de+junio+etapa+2'
  };

  // Función para descargar CV como PDF
  const handleDownloadCV = () => {
    // Mostrar notificación
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

    // Usar window.print() para generar PDF
    // El usuario puede elegir "Guardar como PDF" en el diálogo de impresión
    window.print();
  };

  // Generar partículas flotantes
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const skills = [
    { name: 'Desarrollo Web', icon: Globe, level: 90 },
    { name: 'Base de Datos', icon: Database, level: 85 },
    { name: 'Creación de API', icon: Code, level: 80 },
    { name: 'Diseño UI/UX', icon: Award, level: 75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Profesional con fondo animado */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8 border border-slate-200">
          <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 p-8 md:p-12 overflow-hidden">
            {/* Partículas flotantes */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-white opacity-20 animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}

            {/* Líneas de conexión animadas */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              {/* Foto flotante con efecto 3D */}
              <div className="relative group">
                {/* Sombra flotante */}
                <div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-xl transform translate-y-4 group-hover:translate-y-6 transition-transform duration-500"></div>
                
                {/* Contenedor de la foto con efecto flotante */}
                <div className="relative transform group-hover:-translate-y-2 transition-all duration-500">
                  {/* Borde brillante animado */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-white to-blue-400 rounded-lg opacity-75 blur animate-pulse-slow"></div>
                  
                  {/* Foto */}
                  <div className="relative">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt="Bryan Steven Taco" 
                        className="w-40 h-40 rounded-lg object-cover border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-lg border-4 border-white bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-6xl font-bold text-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                        BT
                      </div>
                    )}
                    
                    {/* Reflejo brillante */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                </div>

                {/* Partículas orbitales */}
                <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-8"></div>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 translate-y-8"></div>
                </div>
              </div>
              
              {/* Info principal */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white tracking-tight">
                    Bryan Steven Taco
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 font-light">
                    Desarrollador de Software
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                  <span className="px-4 py-2 bg-slate-700 text-white rounded-md text-sm font-semibold border border-slate-600 hover:bg-slate-600 transition-colors">
                    Full Stack Developer
                  </span>
                  <span className="px-4 py-2 bg-slate-700 text-white rounded-md text-sm font-semibold border border-slate-600 hover:bg-slate-600 transition-colors">
                    Web Designer
                  </span>
                  <span className="px-4 py-2 bg-slate-700 text-white rounded-md text-sm font-semibold border border-slate-600 hover:bg-slate-600 transition-colors">
                    API Developer
                  </span>
                </div>

                {/* Estadísticas profesionales */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 hover:bg-slate-700/70 transition-colors">
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-xs text-slate-300">Años Exp.</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 hover:bg-slate-700/70 transition-colors">
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-xs text-slate-300">Proyectos</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 hover:bg-slate-700/70 transition-colors">
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-xs text-slate-300">Empresas</div>
                  </div>
                </div>
              </div>

              {/* Contacto formal */}
              <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-lg border border-slate-600">
                <h3 className="text-white font-bold mb-4 text-base">Información de Contacto</h3>
                <div className="space-y-3">
                  <a href="tel:+593996762603" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm group">
                    <div className="p-2 bg-slate-600 rounded-lg group-hover:bg-slate-500 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>+593 996 762 603</span>
                  </a>
                  <a href="mailto:bryantaco10@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm group">
                    <div className="p-2 bg-slate-600 rounded-lg group-hover:bg-slate-500 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>bryantaco10@gmail.com</span>
                  </a>
                  <a 
                    href={location.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors text-sm group cursor-pointer"
                  >
                    <div className="p-2 bg-slate-600 rounded-lg group-hover:bg-slate-500 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">{location.city}, {location.country}</div>
                      <div className="text-xs text-slate-400 hover:text-slate-300">{location.address}</div>
                    </div>
                  </a>
                </div>

                <button 
                  onClick={handleDownloadCV}
                  className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-md font-semibold transition-all flex items-center justify-center gap-2 text-sm border border-slate-600 hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Descargar CV
                </button>
              </div>
            </div>
          </div>

          {/* Notificación de descarga */}
          {showNotification && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-slideIn z-50 print:hidden">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Generando PDF...</div>
                <div className="text-xs opacity-90">Usa "Guardar como PDF" en el diálogo</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Habilidades */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b-2 border-slate-800">
                <Code className="w-5 h-5" />
                Habilidades Técnicas
              </h2>
              <div className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <skill.icon className="w-4 h-4 text-slate-700" />
                        <span className="text-slate-700 font-semibold text-sm">{skill.name}</span>
                      </div>
                      <span className="text-slate-600 text-xs font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-slate-800 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competencias */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b-2 border-slate-800">
                Competencias Adicionales
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Soporte Web', 'Config. PC', 'Office Suite', 'Páginas Web', 'Canva', 'Illustrator', 'Photoshop', 'Git'].map((comp) => (
                  <span 
                    key={comp} 
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-200 transition-colors border border-slate-300"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-slate-800">
                <Languages className="w-5 h-5" />
                Idiomas
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇪🇨</span>
                    <span className="text-slate-700 font-semibold text-sm">Español</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-800 text-white rounded-md text-xs font-semibold">
                    Nativo
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇺🇸</span>
                    <span className="text-slate-700 font-semibold text-sm">Inglés</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-700 text-white rounded-md text-xs font-semibold">
                    Intermedio
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Navegación formal */}
            <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-lg">
              <div className="flex gap-2">
                {[
                  { id: 'experience', label: 'Experiencia', icon: Briefcase },
                  { id: 'education', label: 'Educación', icon: GraduationCap },
                  { id: 'references', label: 'Referencias', icon: Users }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition-all ${
                      activeSection === tab.id
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido */}
            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow min-h-[600px]">
              {activeSection === 'experience' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <Briefcase className="w-7 h-7" />
                      Experiencia Profesional
                    </h2>
                  </div>
                  
                  {/* Timeline profesional */}
                  <div className="space-y-8">
                    {/* Experiencia actual */}
                    <div className="relative pl-8 pb-8 border-l-2 border-slate-800">
                      <div className="absolute -left-2.5 top-0 w-5 h-5 bg-slate-800 rounded-full border-4 border-white shadow-md"></div>
                      
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                              Destellos de Amor
                            </h3>
                            <p className="text-slate-600 font-semibold flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4" />
                              2024 - ACTUAL
                            </p>
                          </div>
                          <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-md text-xs font-bold border border-green-300">
                            Posición Actual
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-slate-700 flex items-start gap-2 text-sm">
                            <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                            Elaboración de publicidad mediante páginas web
                          </p>
                          <p className="text-slate-600 flex items-start gap-2 text-sm">
                            <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                            Soporte a maquinarias y mantenimiento
                          </p>
                          <div className="flex items-center gap-2 text-slate-500 text-xs mt-3 pt-3 border-t border-slate-200">
                            <Users className="w-4 h-4" />
                            <span>Responsable: Katherine Taco - 0986451104</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECURITY S A */}
                    <div className="relative pl-8 pb-8 border-l-2 border-slate-300">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white"></div>
                      
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">SECURITY S A</h3>
                        <p className="text-slate-600 font-semibold mb-3 flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          2023
                        </p>
                        <p className="text-slate-700 flex items-start gap-2 mb-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                          Funciones de seguridad de páginas web
                        </p>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mt-3 pt-3 border-t border-slate-200">
                          <Users className="w-4 h-4" />
                          <span>Responsable: Andrea Pinto</span>
                        </div>
                      </div>
                    </div>

                    {/* Automortors 13 */}
                    <div className="relative pl-8 pb-8 border-l-2 border-slate-300">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white"></div>
                      
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Automortors 13</h3>
                        <p className="text-slate-700 flex items-start gap-2 mb-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                          Digitador Responsable
                        </p>
                        <p className="text-slate-600 text-sm mb-2">María José Escobar Jordadna</p>
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Phone className="w-4 h-4" />
                          <span>0998602722</span>
                        </div>
                      </div>
                    </div>

                    {/* Cyber Liz */}
                    <div className="relative pl-8 border-l-2 border-slate-300">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white"></div>
                      
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Cyber Liz</h3>
                        <p className="text-slate-600 font-semibold mb-3 flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          2019
                        </p>
                        <p className="text-slate-700 flex items-start gap-2 mb-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                          Atención al Cliente
                        </p>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mt-3 pt-3 border-t border-slate-200">
                          <Users className="w-4 h-4" />
                          <span>Responsable: Rodrigo Taco - 0985614706</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'education' && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                    <GraduationCap className="w-7 h-7" />
                    Formación Académica
                  </h2>

                  <div className="grid gap-6">
                    {/* Universidad en proceso */}
                    <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-800 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Universidad Católica del Ecuador</h3>
                          <p className="text-slate-700 font-semibold text-base">Desarrollo de Software</p>
                        </div>
                        <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-xs font-bold border border-blue-300">
                          En Proceso
                        </span>
                      </div>
                    </div>

                    {/* Politécnica */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">Escuela Politécnica Nacional</h3>
                      <p className="text-slate-700 mb-3 text-sm">Ingeniería en Sistemas</p>
                      <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-md text-xs font-semibold">
                        No Culminado
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Secundaria */}
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Unidad Educativa "La Salle"</h3>
                        <p className="text-slate-700 font-semibold mb-1 text-sm">Secundaria</p>
                        <p className="text-slate-500 text-xs">2018</p>
                      </div>

                      {/* Primaria */}
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">U.E. Hermano Miguel "La Salle"</h3>
                        <p className="text-slate-700 font-semibold mb-1 text-sm">Primaria</p>
                        <p className="text-slate-500 text-xs">2010</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'references' && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                    <Users className="w-7 h-7" />
                    Referencias Profesionales
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Referencia 1 */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                        MT
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-2">MBA. Marco F. Taco Iturralde</h3>
                      <p className="text-slate-700 text-sm font-semibold mb-1">Jefe Gestión Financiera</p>
                      <p className="text-slate-600 text-sm mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        EP PETROECUADOR
                      </p>
                      <div className="space-y-2 text-slate-600 text-xs pt-4 border-t border-slate-200">
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          +5930960541343
                        </p>
                        <p className="flex items-center gap-2 break-all">
                          <Mail className="w-3 h-3" />
                          Marco.taco@eppetroecuador.ec
                        </p>
                      </div>
                    </div>

                    {/* Referencia 2 */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                        IT
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-2">Sra. Ilda Totoy</h3>
                      <p className="text-slate-700 text-sm font-semibold mb-1">Jefa de Cocina</p>
                      <p className="text-slate-600 text-sm mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        CAFETERÍA ABOMA DULCE
                      </p>
                      <div className="space-y-2 text-slate-600 text-xs pt-4 border-t border-slate-200">
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          0986458482
                        </p>
                      </div>
                    </div>

                    {/* Referencia 3 */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all md:col-span-2">
                      <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                        SC
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-2">Téc. Stalin Campaña Ing.</h3>
                      <p className="text-slate-700 text-sm font-semibold mb-1">Técnico de Maquinaria Pesada</p>
                      <p className="text-slate-600 text-sm mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        CATERPILLAR
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-slate-600 text-xs pt-4 border-t border-slate-200">
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          0987166663
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          Stalin18_sj@hotmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        /* Estilos para impresión/PDF */
        @media print {
          body {
            background: white;
          }
          
          /* Ocultar elementos no necesarios en PDF */
          button {
            display: none !important;
          }
          
          /* Asegurar que el fondo se imprima */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Ocultar partículas en impresión */
          .animate-float {
            display: none !important;
          }

          /* Ajustar tamaños para PDF */
          .max-w-7xl {
            max-width: 100%;
          }

          /* Mejorar contraste para PDF */
          .bg-slate-800, .bg-slate-900 {
            background-color: #1e293b !important;
          }

          .text-white {
            color: white !important;
          }
        }
      `}</style>
    </div>
  );
}