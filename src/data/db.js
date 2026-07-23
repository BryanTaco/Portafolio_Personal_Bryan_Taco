export const db = {
  social: {
    whatsapp: "https://wa.me/593996762603",
    instagram: "https://instagram.com/bryantaco",
    linkedin: "https://linkedin.com/in/bryantaco",
    github: "https://github.com/bryantaco",
    email: "bryantaco10@gmail.com",
    telefono: "0996762603",
    maps: "https://maps.app.goo.gl/gcobGwoetWC4Xf3m8"
  },
  stats: [
    { numero: "5+", etiqueta: "Años Programando" },
    { numero: "15+", etiqueta: "Proyectos Completados" },
    { numero: "4", etiqueta: "Empresas Atendidas" },
    { numero: "2", etiqueta: "Idiomas Dominados" }
  ],
  habilidades: [
    { nombre: "React / Next.js", nivel: 90, categoria: "Frontend" },
    { nombre: "Node.js / Express", nivel: 85, categoria: "Backend" },
    { nombre: "PostgreSQL / MySQL", nivel: 82, categoria: "Bases de Datos" },
    { nombre: "Spring Boot", nivel: 70, categoria: "Backend" },
    { nombre: "Tailwind CSS", nivel: 93, categoria: "Frontend" },
    { nombre: "Photoshop / Illustrator", nivel: 85, categoria: "Diseño" },
    { nombre: "Canva", nivel: 95, categoria: "Diseño" },
    { nombre: "MongoDB", nivel: 75, categoria: "Bases de Datos" },
    { nombre: "Git / GitHub", nivel: 88, categoria: "DevOps" },
    { nombre: "React Native / Flutter", nivel: 72, categoria: "Móvil" }
  ],
  tecnologias: [
    "React", "Next.js", "Node.js", "Express", "Spring Boot",
    "PostgreSQL", "MySQL", "MongoDB", "Tailwind CSS", "Framer Motion",
    "Git", "Photoshop", "Illustrator", "Canva", "Figma",
    "React Native", "TypeScript", "Docker"
  ],
  educacion: [
    {
      id: 1,
      institucion: "Pontificia Universidad Católica del Ecuador — PUCE",
      titulo: "Ingeniería en Sistemas",
      periodo: "2022 - En Curso",
      actual: true,
      descripcion: "Formación en desarrollo de software, arquitectura de sistemas, bases de datos, redes y gestión de proyectos tecnológicos."
    },
    {
      id: 2,
      institucion: "Escuela Politécnica Nacional — EPN",
      titulo: "Ingeniería en Sistemas",
      periodo: "2021",
      actual: false,
      descripcion: "Primer año de formación en Ingeniería en Sistemas. Base sólida en matemáticas, programación estructurada y algoritmos."
    },
    {
      id: 3,
      institucion: "Unidad Educativa La Salle",
      titulo: "Bachiller en Ciencias",
      periodo: "2012 - 2018",
      actual: false,
      descripcion: "Bachillerato con enfoque en ciencias exactas. Primeros acercamientos a la informática y la tecnología."
    },
    {
      id: 4,
      institucion: "Unidad Educativa Hermano Miguel La Salle",
      titulo: "Educación Primaria",
      periodo: "2006 - 2012",
      actual: false,
      descripcion: "Formación base con valores, disciplina y excelencia académica en una institución de tradición salesiana."
    }
  ],
  experiencia: [
    {
      id: 1,
      empresa: "Destellos de Amor",
      puesto: "Desarrollador Web & Soporte Técnico",
      periodo: "2024 - Actual",
      actual: true,
      descripcion: "Elaboración de publicidad y páginas web. Soporte técnico a maquinarias y mantenimiento de sistemas digitales.",
      referencia: { nombre: "Katherine Taco", contacto: "098451104" }
    },
    {
      id: 2,
      empresa: "SECURITY S.A",
      puesto: "Especialista en Seguridad Web",
      periodo: "2023",
      actual: false,
      descripcion: "Auditoría de seguridad en páginas web, identificación de vulnerabilidades y fortalecimiento de sistemas.",
      referencia: { nombre: "Andrea Pinto", contacto: null }
    },
    {
      id: 3,
      empresa: "Automotors S.A",
      puesto: "Digitador & Administrador de BD",
      periodo: "2023",
      actual: false,
      descripcion: "Digitación y manejo de bases de datos PostgreSQL y MySQL para gestión de inventario automotriz.",
      referencia: { nombre: "María José Escanta", contacto: "0998602722" }
    },
    {
      id: 4,
      empresa: "Cyber Liz",
      puesto: "Atención al Cliente & Soporte Técnico",
      periodo: "2019",
      actual: false,
      descripcion: "Atención al cliente y configuración de computadoras y celulares. Primera experiencia laboral formal.",
      referencia: { nombre: "Rodrigo Taco", contacto: "0985834706" }
    }
  ],
  referencias: [
    {
      nombre: "MBA. Marco F. Taco Iturralde",
      cargo: "Jefe de Gestión Financiera",
      empresa: "EP PETROECUADOR",
      telefono: "2563060 Ext. 42043",
      email: "Marco.taco@eppetroecuador.ec"
    },
    {
      nombre: "Téc. Stalin Campaña",
      cargo: "Técnico de Maquinaria Pesada",
      empresa: "CATERPILLAR",
      telefono: "0987136663",
      email: "Stalin15_sj@hotmail.com"
    },
    {
      nombre: "Sra. Ilda Totoy",
      cargo: "Propietaria",
      empresa: "Cafetería Aroma Dulce",
      telefono: "0989584282",
      email: null
    }
  ],
  servicios: [
    {
      id: "01",
      titulo: "Desarrollo Backend",
      descripcion: "Arquitectura robusta y escalable con Node.js, Express y Spring Boot. APIs RESTful de alto rendimiento y seguridad."
    },
    {
      id: "02",
      titulo: "Bases de Datos",
      descripcion: "Diseño y administración de bases de datos relacionales y no relacionales: PostgreSQL, MySQL y MongoDB."
    },
    {
      id: "03",
      titulo: "Frontend con React",
      descripcion: "Interfaces modernas, interactivas y ultra rápidas con React, Tailwind CSS y Framer Motion."
    },
    {
      id: "04",
      titulo: "Diseño UI/UX",
      descripcion: "Diseño visual con Figma, Photoshop e Illustrator. Experiencias que impactan desde el primer clic."
    },
    {
      id: "05",
      titulo: "Desarrollo Móvil",
      descripcion: "Aplicaciones móviles multiplataforma con React Native o Flutter adaptadas a cualquier necesidad."
    },
    {
      id: "06",
      titulo: "Soporte Técnico",
      descripcion: "Mantenimiento, despliegue y configuración de servidores, hosting, hardware y software."
    }
  ],
  proyectos: [
    {
      id: 1,
      nombre: "Gestor Inmobiliario Avanzado",
      categoria: "Full Stack",
      descripcion: "Sistema completo de gestión de propiedades con autenticación, dashboard y reportes en tiempo real.",
      imagenes: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&h=230&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=340&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=600&q=80"
      ],
      tecnologias: ["React", "Node.js", "PostgreSQL"]
    },
    {
      id: 2,
      nombre: "App Móvil de Delivery",
      categoria: "Desarrollo Móvil",
      descripcion: "Aplicación de entrega con geolocalización en tiempo real, pagos integrados y tracking de pedidos.",
      imagenes: [
        "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&h=230&q=80",
        "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=600&h=340&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&h=600&q=80"
      ],
      tecnologias: ["React Native", "Express", "MongoDB"]
    },
    {
      id: 3,
      nombre: "Panel Admin PostgreSQL",
      categoria: "Backend & BD",
      descripcion: "Dashboard administrativo con visualización avanzada de datos, reportes y gestión completa de BD.",
      imagenes: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=230&q=80",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=340&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&h=600&q=80"
      ],
      tecnologias: ["React", "PostgreSQL", "Spring Boot"]
    }
  ],
  marquee: [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1602576666092-bf6447a729fc?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=420&h=270&q=75",
    "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=420&h=270&q=75"
  ]
};
