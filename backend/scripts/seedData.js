import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import BlogPost from '../models/BlogPost.js';
import Profile from '../models/Profile.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await BlogPost.deleteMany();
    await Profile.deleteMany();

    console.log('🧹 Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@portfolio.com',
      password: 'Admin123!',
      role: 'admin'
    });

    console.log('👤 Created admin user');

    // Create admin profile
    const adminProfile = await Profile.create({
      user: adminUser._id,
      personalInfo: {
        firstName: 'Bryan',
        lastName: 'Steven Taco',
        title: 'Full Stack Developer',
        email: adminUser.email,
        bio: 'Desarrollador Full Stack apasionado por crear experiencias web excepcionales. Especializado en tecnologías modernas como React, Next.js, Node.js y bases de datos.',
        phone: '+593 99 999 9999',
        location: 'Quito, Ecuador',
        linkedin: 'https://linkedin.com/in/bryan-taco',
        github: 'https://github.com/bryan-taco'
      },
      skills: {
        technical: [
          { name: 'JavaScript', level: 'expert', category: 'frontend' },
          { name: 'TypeScript', level: 'advanced', category: 'frontend' },
          { name: 'React', level: 'expert', category: 'frontend' },
          { name: 'Next.js', level: 'advanced', category: 'frontend' },
          { name: 'Node.js', level: 'advanced', category: 'backend' },
          { name: 'Express.js', level: 'advanced', category: 'backend' },
          { name: 'MongoDB', level: 'advanced', category: 'database' },
          { name: 'PostgreSQL', level: 'intermediate', category: 'database' }
        ],
        soft: [
          { name: 'Problem Solving', level: 'expert' },
          { name: 'Team Collaboration', level: 'advanced' },
          { name: 'Communication', level: 'advanced' }
        ],
        languages: [
          { name: 'Spanish', proficiency: 'native' },
          { name: 'English', proficiency: 'fluent' }
        ]
      },
      experience: [
        {
          company: 'Tech Startup Inc.',
          position: 'Full Stack Developer',
          location: 'Quito, Ecuador',
          startDate: new Date('2023-01-15'),
          description: 'Desarrollo de aplicaciones web modernas utilizando React, Next.js y Node.js. Implementación de APIs RESTful y bases de datos NoSQL.',
          technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript'],
          isCurrent: true
        },
        {
          company: 'Freelance',
          position: 'Web Developer',
          location: 'Remote',
          startDate: new Date('2022-06-01'),
          endDate: new Date('2022-12-31'),
          description: 'Desarrollo de proyectos web personalizados para clientes. Creación de landing pages, e-commerce y aplicaciones web.',
          technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'PHP'],
          isCurrent: false
        }
      ],
      education: [
        {
          institution: 'Pontificia Universidad Católica del Ecuador',
          degree: 'Ingeniería en Sistemas',
          field: 'Computer Science',
          startDate: new Date('2020-09-01'),
          endDate: new Date('2024-06-30'),
          gpa: 3.8,
          description: 'Especialización en desarrollo de software, bases de datos y arquitectura de sistemas.',
          isCurrent: false
        }
      ],
      projects: [
        {
          title: 'Portfolio Personal',
          description: 'Portafolio profesional full-stack con blog integrado, sistema de administración y API RESTful.',
          technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express'],
          githubUrl: 'https://github.com/bryan-taco/portfolio',
          liveUrl: 'https://bryan-taco.vercel.app',
          featured: true
        }
      ],
      settings: {
        isPublic: true,
        showEmail: true,
        showPhone: false,
        allowContact: true
      }
    });

    console.log('📋 Created admin profile');

    // Create blog posts
    const blogPosts = [
      {
        title: 'REST vs GraphQL: ¿Cuál elegir para tu API moderna?',
        slug: 'rest-vs-graphql-api-moderna',
        content: `# REST vs GraphQL: ¿Cuál elegir para tu API moderna?

En el mundo del desarrollo backend, la elección entre REST y GraphQL puede marcar la diferencia entre una API eficiente y una que cause dolores de cabeza. Vamos a analizar ambas aproximaciones de manera técnica y práctica.

## ¿Qué es REST?

REST (Representational State Transfer) es un estilo arquitectónico que ha dominado el desarrollo de APIs durante años. Se basa en los principios HTTP y utiliza diferentes métodos (GET, POST, PUT, DELETE) para interactuar con recursos.

### Ventajas de REST:
- **Simplicidad**: Fácil de entender e implementar
- **Cacheable**: Los navegadores pueden cachear respuestas automáticamente
- **Escalable**: Arquitectura stateless que facilita el escalado horizontal
- **Estándares**: Basado en protocolos HTTP establecidos

### Desventajas de REST:
- **Over-fetching**: A menudo se obtiene más datos de los necesarios
- **Under-fetching**: Múltiples requests para obtener datos relacionados
- **Versionado**: Dificulta la evolución de la API sin breaking changes

## ¿Qué es GraphQL?

GraphQL es un lenguaje de consulta para APIs desarrollado por Facebook. Permite a los clientes solicitar exactamente los datos que necesitan, nada más, nada menos.

### Ventajas de GraphQL:
- **Precisión**: Obtén exactamente los datos que necesitas
- **Una sola request**: Resuelve el problema de múltiples llamadas
- **Evolución**: Fácil de agregar campos sin afectar clientes existentes
- **Introspección**: Los clientes pueden consultar el esquema de la API

### Desventajas de GraphQL:
- **Complejidad**: Mayor curva de aprendizaje
- **Cache**: Más complejo de cachear que REST
- **Seguridad**: Riesgo de consultas complejas (N+1 problem)

## Caso de Uso: Aplicación de E-commerce

Imaginemos una aplicación de e-commerce donde necesitamos mostrar una lista de productos con información básica, pero también permitir drill-down para ver detalles completos.

### Con REST:
\`\`\`javascript
// Primera llamada: obtener lista de productos
GET /api/products

// Segunda llamada: obtener detalles de un producto específico
GET /api/products/123

// Tercera llamada: obtener reseñas del producto
GET /api/products/123/reviews

// Cuarta llamada: obtener inventario
GET /api/products/123/inventory
\`\`\`

### Con GraphQL:
\`\`\`graphql
query GetProductDetails($productId: ID!) {
  product(id: $productId) {
    id
    name
    price
    description
    reviews {
      rating
      comment
      author {
        name
      }
    }
    inventory {
      available
      location
    }
  }
}
\`\`\`

## ¿Cuál elegir?

**Elige REST si:**
- Tu aplicación es simple y predecible
- Tienes experiencia limitada con GraphQL
- Necesitas cache HTTP nativo
- Tu equipo prefiere convenciones sobre configuración

**Elige GraphQL si:**
- Tienes diferentes clientes con necesidades variadas
- Buscas optimizar el rendimiento de red
- Quieres evolucionar tu API sin breaking changes
- Estás dispuesto a invertir en la curva de aprendizaje

## Conclusión

Ambas tecnologías tienen su lugar en el ecosistema moderno. REST sigue siendo una excelente opción para APIs simples y tradicionales, mientras que GraphQL brilla en aplicaciones complejas con múltiples clientes.

En mi experiencia desarrollando este portafolio, elegí REST por su simplicidad y porque las necesidades de datos eran relativamente predecibles. Sin embargo, para aplicaciones más complejas como redes sociales o plataformas de e-commerce, GraphQL sería mi primera opción.

¿Has trabajado con ambas tecnologías? ¿Cuál ha sido tu experiencia?`,
        excerpt: 'Análisis técnico comparativo entre REST y GraphQL para elegir la arquitectura de API adecuada para tu proyecto.',
        category: 'backend',
        tags: ['API', 'REST', 'GraphQL', 'Backend', 'Arquitectura'],
        author: adminUser._id,
        published: true,
        featured: true
      },
      {
        title: 'Seguridad en APIs: Mejores prácticas para evitar ataques comunes',
        slug: 'seguridad-apis-mejores-practicas',
        content: `# Seguridad en APIs: Mejores prácticas para evitar ataques comunes

La seguridad en APIs no es un lujo, es una necesidad. En este artículo, exploraremos las vulnerabilidades más comunes y cómo implementar defensas efectivas.

## 1. Autenticación y Autorización

### JWT (JSON Web Tokens)
Los JWT son tokens firmados que contienen información del usuario. Implementemos un sistema seguro:

\`\`\`javascript
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
\`\`\`

### Rate Limiting
Previene ataques de fuerza bruta y abuso de recursos:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.'
});
\`\`\`

## 2. Validación de Input

Nunca confíes en los datos del cliente. Valida todo:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

const userValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('age').optional().isInt({ min: 13, max: 120 })
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
\`\`\`

## 3. Protección contra Inyección

### SQL Injection
Usa ORMs o consultas parametrizadas:

\`\`\`javascript
// ❌ Vulnerable
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;

// ✅ Seguro con Mongoose
const user = await User.findOne({ email: email });
\`\`\`

### NoSQL Injection
Las bases de datos NoSQL también son vulnerables:

\`\`\`javascript
// ❌ Vulnerable
const query = { username: req.body.username };

// ✅ Seguro
const query = { username: { $eq: req.body.username } };
\`\`\`

## 4. Cifrado de Datos Sensibles

### Hash de Passwords
Nunca almacenes passwords en texto plano:

\`\`\`javascript
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
\`\`\`

## 5. CORS y Headers de Seguridad

Configura CORS apropiadamente:

\`\`\`javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
\`\`\`

Implementa Helmet para headers de seguridad:

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

## 6. Logging y Monitoreo

Registra actividades importantes:

\`\`\`javascript
const morgan = require('morgan');

app.use(morgan('combined'));

// Log de seguridad personalizado
const securityLogger = (message, data) => {
  console.log(\`[SECURITY] \${new Date().toISOString()}: \${message}\`, data);
};
\`\`\`

## 7. Manejo de Errores Seguro

No expongas información sensible en errores:

\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  // Log del error completo para debugging
  console.error(err);

  // Respuesta segura al cliente
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  });
};
\`\`\`

## Checklist de Seguridad

- [ ] Autenticación JWT implementada
- [ ] Rate limiting configurado
- [ ] Validación de input en todas las rutas
- [ ] Passwords hasheados con bcrypt
- [ ] CORS configurado correctamente
- [ ] Headers de seguridad con Helmet
- [ ] Logging implementado
- [ ] Manejo de errores seguro
- [ ] Variables de entorno para secrets
- [ ] HTTPS en producción

## Conclusión

La seguridad en APIs es un proceso continuo, no un evento único. Implementa estas prácticas desde el inicio de tu proyecto y mantén tus dependencias actualizadas.

Recuerda: "La seguridad no es un producto, sino un proceso" - Bruce Schneier

¿Has implementado alguna de estas medidas en tus proyectos? ¿Qué otros consejos de seguridad agregarías?`,
        excerpt: 'Guía completa de mejores prácticas para proteger tus APIs contra ataques comunes como inyección, XSS y fuerza bruta.',
        category: 'backend',
        tags: ['Seguridad', 'API', 'JWT', 'Validación', 'CORS'],
        author: adminUser._id,
        published: true,
        featured: true
      }
    ];

    await BlogPost.insertMany(blogPosts);
    console.log('📝 Created blog posts');

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin email: admin@portfolio.com');
    console.log('🔑 Admin password: Admin123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
