# TODO: Desarrollo de Portafolio Full-Stack Profesional

## Información Recopilada
- Proyecto actual: CV estático en Next.js con React, TypeScript, Tailwind CSS.
- Necesidad: Expandir a portafolio completo full-stack, seguro y desplegado.
- Competencias a demostrar: Frontend moderno, backend robusto, persistencia de datos, seguridad, Git, despliegue en nube.
- Requisitos adicionales: Animaciones 3D, paleta profesional oscura, dinamismo, MongoDB y PostgreSQL.

## Plan de Desarrollo
### 1. Actualizar Dependencias y Configuración
- Instalar paquetes para backend: next-auth, mongoose, pg, prisma
- Instalar paquetes para 3D y animaciones: three, @react-three/fiber, framer-motion
- Instalar paquetes de seguridad: bcryptjs, jsonwebtoken, rate-limiter-flexible
- Configurar variables de entorno para bases de datos

### 2. Crear Estructura de Páginas Múltiples
- / (Home): Landing page con introducción y navegación
- /about: Información personal detallada
- /projects: Showcase de proyectos con filtros y búsqueda
- /blog: Lista de posts con paginación
- /contact: Formulario de contacto con validación

### 3. Implementar Backend con API Routes
- /api/auth: Autenticación JWT para admin
- /api/contact: Manejo de mensajes de contacto (MongoDB)
- /api/projects: CRUD de proyectos (PostgreSQL)
- /api/blog: CRUD de posts de blog (MongoDB)
- /api/admin: Panel de administración protegido

### 4. Integrar Bases de Datos
- MongoDB: Para blog posts y mensajes de contacto
- PostgreSQL: Para proyectos y datos estructurados
- Configurar esquemas con Prisma para PostgreSQL
- Configurar modelos Mongoose para MongoDB

### 5. Implementar Seguridad
- Autenticación JWT para admin
- Validación de inputs con Zod
- Rate limiting en APIs
- CORS configurado
- Sanitización de datos

### 6. Añadir Animaciones 3D y Diseño Profesional
- Paleta de colores oscura profesional (slate/grays)
- Animaciones 3D con Three.js en landing
- Transiciones fluidas con Framer Motion
- Efectos de hover y micro-interacciones
- Diseño responsive y accesible

### 7. Actualizar Layout y Metadata
- Navegación global con menú responsive
- Footer con información de contacto
- SEO optimizado con metadata dinámica
- Favicon y manifest para PWA

### 8. Despliegue y Testing
- Configurar Vercel para despliegue
- Conectar MongoDB Atlas y PostgreSQL en nube
- Testing de funcionalidades
- Optimización de performance

## Archivos Dependientes a Crear/Editar
- package.json: Actualizar dependencias
- src/app/layout.tsx: Actualizar con navegación y footer
- src/app/page.tsx: Convertir a landing page
- src/app/about/page.tsx: Nueva página
- src/app/projects/page.tsx: Nueva página
- src/app/blog/page.tsx: Nueva página
- src/app/contact/page.tsx: Nueva página
- src/app/api/*: Nuevas rutas API
- src/lib/*: Utilidades para DB, auth, etc.
- src/components/*: Componentes reutilizables
- .env.local: Variables de entorno
- prisma/schema.prisma: Esquema PostgreSQL

## Pasos de Seguimiento
- Instalar dependencias y configurar entorno
- Desarrollar páginas y componentes frontend
- Implementar APIs y lógica backend
- Integrar bases de datos
- Añadir seguridad y autenticación
- Implementar animaciones 3D
- Testing local exhaustivo
- Despliegue en Vercel
- Configuración de dominio y SSL
