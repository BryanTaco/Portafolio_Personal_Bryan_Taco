import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpiar datos existentes
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cV.deleteMany();

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('Admin123!Secure', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@bryantaco.com',
      password: hashedPassword,
      name: 'Bryan Taco',
      role: 'admin',
    },
  });

  console.log('✅ Usuario admin creado');

  // Crear CV
  await prisma.cV.create({
    data: {
      nombre: 'Bryan Taco',
      titulo: 'Desarrollador Full Stack',
      email: 'bryan.taco@puce.edu.ec',
      telefono: '+593 99 123 4567',
      ubicacion: 'Quito, Ecuador',
      resumen: 'Desarrollador Full Stack especializado en React, Next.js y Node.js. Estudiante de Ingeniería en Sistemas en la PUCE con enfoque en desarrollo web moderno y arquitecturas escalables.',
      habilidades: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Tailwind CSS',
        'Git',
        'Docker'
      ],
      educacion: [
        {
          titulo: 'Ingeniería en Sistemas',
          institucion: 'Pontificia Universidad Católica del Ecuador',
          periodo: '2020 - 2025',
          descripcion: 'Especialización en Desarrollo Web y Aplicaciones Empresariales'
        }
      ],
      experienciaLaboral: [
        {
          puesto: 'Desarrollador Full Stack',
          empresa: 'Tech Solutions Ecuador',
          periodo: '2024 - Presente',
          logros: [
            'Desarrollo de aplicaciones web con Next.js y TypeScript',
            'Implementación de APIs RESTful con validación y seguridad',
            'Gestión de bases de datos PostgreSQL con Prisma ORM',
            'Despliegue de aplicaciones en Vercel y Render'
          ]
        },
        {
          puesto: 'Desarrollador Frontend Junior',
          empresa: 'StartupLab Quito',
          periodo: '2023 - 2024',
          logros: [
            'Creación de interfaces responsivas con React y Tailwind',
            'Integración con APIs externas usando Axios',
            'Trabajo en equipo usando metodologías ágiles (Scrum)'
          ]
        }
      ]
    }
  });

  console.log('✅ CV creado');

  // Crear posts iniciales
  const posts = [
    {
      title: 'Cómo construir una lista de tareas con React y JSON Server',
      slug: 'react-json-server-todo-app',
      excerpt: 'Tutorial completo para crear una aplicación CRUD usando React, Axios y JSON Server. Aprende a implementar operaciones de creación, lectura, actualización y eliminación de manera profesional.',
      content: `# Introducción\n\nEn este tutorial completo, aprenderás a construir una aplicación de lista de tareas desde cero utilizando **React**, **JSON Server** y **Axios**. Implementaremos todas las operaciones CRUD de manera profesional y escalable.\n\n## Configuración del Proyecto\n\nPrimero, creemos el proyecto con Vite:\n\n\`\`\`bash\nnpm create vite@latest todo-app -- --template react\ncd todo-app\nnpm install axios json-server\n\`\`\`\n\n[Contenido completo del tutorial...]`,
      published: true,
      authorId: admin.id
    },
    {
      title: "Análisis de la propuesta 'Temporal' en TC39",
      slug: 'temporal-tc39-analisis',
      excerpt: 'Explorando la revolucionaria API Temporal para manejo de fechas en JavaScript. Descubre por qué esta propuesta cambiará la forma en que trabajamos con fechas y horas.',
      content: `# La Propuesta Temporal: El Futuro del Manejo de Fechas\n\nLa propuesta **Temporal** (actualmente en Stage 3) es una de las más esperadas en TC39. Busca reemplazar el problemático objeto \`Date\` con una API moderna, precisa y fácil de usar.\n\n## El Problema Actual\n\nEl objeto \`Date\` tiene múltiples problemas fundamentales...\n\n[Contenido completo del análisis...]`,
      published: true,
      authorId: admin.id
    }
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log('✅ Posts iniciales creados');
  console.log('\n🎉 Seed completado exitosamente!');
  console.log('\n📝 Credenciales de acceso:');
  console.log('Email: admin@bryantaco.com');
  console.log('Password: Admin123!Secure');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });