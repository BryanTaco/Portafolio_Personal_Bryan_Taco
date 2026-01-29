# Por qué Express.js para Desarrollo de APIs

## Introducción

Aunque mi portafolio actual utiliza Next.js API Routes para simplicidad, Express.js ha sido fundamental en mi formación como desarrollador backend. Esta documentación explica por qué Express.js sigue siendo una excelente opción para el desarrollo de APIs robustas y escalables.

## ¿Qué es Express.js?

Express.js es un framework web minimalista y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y APIs. Desarrollado por TJ Holowaychuk y mantenido por la Node.js Foundation, Express es el framework web más popular para Node.js.

## Razones Principales para Elegir Express.js

### 1. **Minimalismo y Flexibilidad**

```javascript
const express = require('express');
const app = express();

// Configuración básica - ¡solo 3 líneas!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
```

**Ventajas:**
- **Sin Opiniones Fuertes**: Tú controlas la arquitectura
- **Aprendizaje Gradual**: Empieza simple, agrega complejidad cuando la necesites
- **Ecosistema Enorme**: Miles de middlewares disponibles

### 2. **Middleware Pattern Poderoso**

```javascript
// Middleware de logging personalizado
const requestLogger = (req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${res.statusCode} - ${duration}ms`);
  });

  next();
};

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

// Middleware de validación
const validateUserData = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Nombre requerido (mínimo 2 caracteres)' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email válido requerido' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Contraseña requerida (mínimo 6 caracteres)' });
  }

  next();
};

// Aplicar middlewares
app.use(requestLogger);
app.post('/api/users', validateUserData, createUser);
app.use('/api/admin', authenticateToken, adminRoutes);
```

**Beneficios:**
- **Composición**: Encadenar múltiples middlewares
- **Reutilización**: Mismo middleware en múltiples rutas
- **Separación de Concerns**: Cada middleware una responsabilidad

### 3. **Routing Intuitivo**

```javascript
// Rutas básicas
app.get('/api/users', getUsers);
app.post('/api/users', createUser);
app.get('/api/users/:id', getUserById);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

// Rutas anidadas con Router
const userRoutes = express.Router();

// Middleware específico para rutas de usuario
userRoutes.use(authenticateToken);

// Rutas de usuario
userRoutes.get('/', getUsers);
userRoutes.post('/', validateUserData, createUser);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', validateUserUpdate, updateUser);
userRoutes.delete('/:id', authenticateAdmin, deleteUser);

// Rutas de posts anidados
userRoutes.get('/:userId/posts', getUserPosts);

// Montar rutas
app.use('/api/users', userRoutes);

// Rutas de API versioning
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
```

### 4. **Integración con Bases de Datos**

```javascript
// Conexión a MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

// Modelo de Usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// Controladores
const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      // Verificar si usuario existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Usuario ya existe' });
      }

      // Hash de contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: hashedPassword
      });

      await user.save();

      // Remover password de respuesta
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json(userResponse);
    } catch (error) {
      res.status(500).json({ error: 'Error creando usuario' });
    }
  }
};

// Rutas
app.get('/api/users', userController.getUsers);
app.post('/api/users', userController.createUser);
```

### 5. **Manejo de Errores Robusto**

```javascript
// Middleware de manejo de errores
const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);

  // Errores de validación
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: Object.values(error.errors).map(err => err.message)
    });
  }

  // Errores de MongoDB
  if (error.name === 'MongoError' && error.code === 11000) {
    return res.status(400).json({
      error: 'Dato duplicado',
      field: Object.keys(error.keyPattern)[0]
    });
  }

  // Errores de JWT
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // Error genérico
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : error.message
  });
};

// Middleware para rutas no encontradas
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
};

// Aplicar middlewares de error (siempre al final)
app.use(notFoundHandler);
app.use(errorHandler);
```

## Casos de Uso en Diferentes Industrias

### 1. **API de Salud (Healthcare)**

```javascript
// API para sistema de gestión de pacientes
const patientRoutes = express.Router();

// Middleware de autorización médica
const requireMedicalAccess = (req, res, next) => {
  if (!['doctor', 'nurse', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Acceso médico requerido' });
  }
  next();
};

// Rutas protegidas para datos sensibles
patientRoutes.use(requireMedicalAccess);

patientRoutes.get('/patients', async (req, res) => {
  // Solo mostrar pacientes del doctor actual
  const patients = await Patient.find({
    assignedDoctor: req.user.id
  }).select('name medicalRecordId lastVisit');

  res.json(patients);
});

patientRoutes.get('/patients/:id/medical-history', async (req, res) => {
  const patient = await Patient.findById(req.params.id)
    .populate('medicalHistory');

  // Logging de acceso a datos sensibles
  await AuditLog.create({
    user: req.user.id,
    action: 'access_medical_history',
    patient: req.params.id,
    timestamp: new Date()
  });

  res.json(patient.medicalHistory);
});
```

### 2. **API de E-commerce**

```javascript
// API para plataforma de comercio electrónico
const productRoutes = express.Router();

// Middleware de rate limiting para catálogo
const catalogLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Demasiadas solicitudes al catálogo'
});

productRoutes.use('/catalog', catalogLimiter);

productRoutes.get('/catalog', async (req, res) => {
  const { category, minPrice, maxPrice, search, page = 1 } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) {
    filter.$text = { $search: search };
  }

  const products = await Product.find(filter)
    .limit(20)
    .skip((page - 1) * 20)
    .select('name price images category rating');

  res.json(products);
});

// Endpoint de checkout con validación estricta
productRoutes.post('/checkout', [
  authenticateToken,
  validateCartData,
  validatePaymentMethod,
  checkInventory
], async (req, res) => {
  // Procesar orden compleja
  const order = await processOrder(req.body, req.user);
  res.json(order);
});
```

### 3. **API de Educación**

```javascript
// API para plataforma educativa
const courseRoutes = express.Router();

// Middleware para estudiantes
const requireStudentAccess = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Acceso de estudiante requerido' });
  }
  next();
};

// Middleware para instructores
const requireInstructorAccess = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ error: 'Acceso de instructor requerido' });
  }
  next();
};

courseRoutes.get('/courses', async (req, res) => {
  const courses = await Course.find({ published: true })
    .populate('instructor', 'name avatar')
    .select('title description price rating studentsCount');

  res.json(courses);
});

courseRoutes.get('/my-courses', requireStudentAccess, async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user.id })
    .populate('course')
    .select('course progress completedLessons lastAccessed');

  res.json(enrollments);
});

courseRoutes.post('/courses/:id/enroll', requireStudentAccess, async (req, res) => {
  // Verificar que el estudiante no esté ya inscrito
  const existingEnrollment = await Enrollment.findOne({
    student: req.user.id,
    course: req.params.id
  });

  if (existingEnrollment) {
    return res.status(400).json({ error: 'Ya estás inscrito en este curso' });
  }

  const enrollment = new Enrollment({
    student: req.user.id,
    course: req.params.id,
    enrolledAt: new Date()
  });

  await enrollment.save();
  res.status(201).json(enrollment);
});
```

## Comparación con Otras Alternativas

| Característica | Express.js | Fastify | Koa.js | Hapi.js |
|---|---|---|---|---|
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Ecosistema** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Curva de Aprendizaje** | Baja | Media | Media | Alta |
| **Flexibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Middleware** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Documentación** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Integración con Next.js

### API Routes Híbridas

```javascript
// pages/api/hybrid-example.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  // Para operaciones simples, usar Next.js API Routes
  if (req.method === 'GET') {
    return res.json({ message: 'Hello from Next.js!' });
  }

  // Para lógica compleja, proxy a servidor Express
  return createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
  })(req, res);
}
```

## Conclusiones Personales

Después de desarrollar múltiples APIs con Express.js, he llegado a estas conclusiones:

### Ventajas que Aprecio:
1. **Simplicidad Inicial**: Comenzar es extremadamente fácil
2. **Control Total**: Tú decides cómo estructurar tu aplicación
3. **Ecosistema Maduro**: Solución para casi cualquier problema
4. **Node.js Nativo**: Sin abstracciones innecesarias

### Desventajas que he Encontrado:
1. **Estructura Manual**: Requiere disciplina para mantener consistencia
2. **Callbacks Iniciales**: (aunque async/await lo mejora)
3. **Repetición**: Mucho boilerplate para APIs grandes

### Mi Recomendación:
- **Para APIs pequeñas/medias**: Express.js es perfecto
- **Para APIs enterprise**: Considerar frameworks más opinados como Fastify
- **Para full-stack**: Next.js API Routes para simplicidad

### Casos Específicos:

**Construcción**: API para gestión de proyectos de construcción - Express maneja perfectamente la complejidad de permisos, archivos adjuntos y comunicaciones en tiempo real.

**Jurisdicción**: Sistema legal para gestión de casos - La flexibilidad de Express permite adaptar workflows legales complejos sin restricciones del framework.

**Marketing**: API para campaña de marketing - Express escala perfectamente para analytics, A/B testing y integración con múltiples servicios externos.

Express.js me ha enseñado que la simplicidad y flexibilidad son poderosas cuando se combinan con buenas prácticas de desarrollo. Aunque ahora uso Next.js para mi portafolio, Express.js sigue siendo mi framework de referencia para APIs puras.
