# 📚 Documentación de la API - Portafolio Full-Stack

## Base URL
```
Producción: https://portfolio-backend.onrender.com
Desarrollo: http://localhost:5000
```

## Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Incluye el token en el header `Authorization`:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 🔐 Autenticación

#### POST /api/auth/register
Registra un nuevo usuario.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user" // opcional, default: "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
Inicia sesión de usuario.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET /api/auth/me
Obtiene información del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "user@example.com",
    "role": "user",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

### 📝 Blog

#### GET /api/blog
Obtiene todos los posts del blog publicados.

**Query Parameters:**
- `page` (number): Página actual (default: 1)
- `limit` (number): Posts por página (default: 10)
- `category` (string): Filtrar por categoría
- `tag` (string): Filtrar por tag
- `search` (string): Buscar en título y contenido

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalPosts": 25,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    {
      "id": "...",
      "title": "REST vs GraphQL",
      "slug": "rest-vs-graphql",
      "content": "...",
      "excerpt": "...",
      "category": "backend",
      "tags": ["API", "REST", "GraphQL"],
      "author": {
        "id": "...",
        "email": "admin@portfolio.com"
      },
      "published": true,
      "views": 150,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### GET /api/blog/:slug
Obtiene un post específico por su slug.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "REST vs GraphQL",
    "slug": "rest-vs-graphql",
    "content": "# Contenido completo del post...",
    "excerpt": "Resumen del post",
    "category": "backend",
    "tags": ["API", "REST", "GraphQL"],
    "author": {
      "id": "...",
      "email": "admin@portfolio.com"
    },
    "published": true,
    "views": 151,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### POST /api/blog
Crea un nuevo post del blog. **Requiere autenticación de admin.**

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Nuevo Post",
  "content": "Contenido del post en Markdown",
  "excerpt": "Resumen breve del post",
  "category": "backend",
  "tags": ["javascript", "nodejs"],
  "published": true,
  "featured": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Nuevo Post",
    "slug": "nuevo-post",
    "content": "Contenido del post en Markdown",
    "excerpt": "Resumen breve del post",
    "category": "backend",
    "tags": ["javascript", "nodejs"],
    "author": "...",
    "published": true,
    "featured": false,
    "views": 0,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### PUT /api/blog/:id
Actualiza un post del blog. **Requiere autenticación de admin.**

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Título Actualizado",
  "content": "Contenido actualizado",
  "published": true
}
```

#### DELETE /api/blog/:id
Elimina un post del blog. **Requiere autenticación de admin.**

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

### 👤 Perfil

#### GET /api/profile
Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "personalInfo": {
      "firstName": "Bryan",
      "lastName": "Taco",
      "title": "Full Stack Developer",
      "email": "bryan@example.com",
      "bio": "Desarrollador apasionado...",
      "phone": "+593999999999",
      "location": "Quito, Ecuador",
      "linkedin": "https://linkedin.com/in/bryan-taco",
      "github": "https://github.com/bryan-taco"
    },
    "experience": [
      {
        "company": "Tech Company",
        "position": "Full Stack Developer",
        "location": "Quito, Ecuador",
        "startDate": "2023-01-15T00:00:00.000Z",
        "description": "Desarrollo de aplicaciones web...",
        "technologies": ["React", "Node.js", "MongoDB"],
        "isCurrent": true
      }
    ],
    "education": [
      {
        "institution": "Universidad",
        "degree": "Ingeniería",
        "field": "Computer Science",
        "startDate": "2020-09-01T00:00:00.000Z",
        "endDate": "2024-06-30T00:00:00.000Z",
        "gpa": 3.8,
        "description": "Especialización en desarrollo..."
      }
    ],
    "skills": {
      "technical": [
        {
          "name": "JavaScript",
          "level": "expert",
          "category": "frontend"
        }
      ],
      "soft": [
        {
          "name": "Problem Solving",
          "level": "expert"
        }
      ],
      "languages": [
        {
          "name": "Spanish",
          "proficiency": "native"
        }
      ]
    },
    "projects": [
      {
        "title": "Portfolio Personal",
        "description": "Portafolio full-stack...",
        "technologies": ["Next.js", "React", "Node.js"],
        "githubUrl": "https://github.com/bryan-taco/portfolio",
        "liveUrl": "https://bryan-taco.vercel.app",
        "featured": true
      }
    ]
  }
}
```

#### PUT /api/profile
Actualiza el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "personalInfo": {
    "firstName": "Bryan",
    "lastName": "Taco",
    "title": "Senior Full Stack Developer",
    "bio": "Bio actualizada..."
  }
}
```

## Códigos de Error

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

## Rate Limiting

La API implementa rate limiting para prevenir abuso:

- **Autenticación:** 5 requests por 15 minutos
- **General:** 100 requests por 15 minutos
- **Blog público:** 200 requests por 15 minutos

## Validación

Todos los endpoints validan la entrada usando express-validator. Los errores de validación se devuelven con código 400 y detalles específicos del campo.

## Seguridad

- **JWT Tokens:** Expiran en 7 días
- **Passwords:** Hasheados con bcrypt (12 rounds)
- **Headers:** Configurados con Helmet
- **CORS:** Solo permite el dominio del frontend
- **Input Sanitization:** Todos los inputs son validados y sanitizados

## Versionado

La API utiliza versionado en la URL (v1). Futuras versiones mantendrán compatibilidad hacia atrás.

```
Versión actual: v1
Endpoint ejemplo: /api/v1/auth/login
