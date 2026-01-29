import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { projectSchema } from '@/lib/validations';

// Mock data - in production this would come from PostgreSQL via Prisma
const mockProjects = [
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
    createdAt: '2024-01-15T00:00:00.000Z',
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
    createdAt: '2024-02-20T00:00:00.000Z',
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
    createdAt: '2023-12-10T00:00:00.000Z',
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
    createdAt: '2024-03-01T00:00:00.000Z',
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
    createdAt: '2023-11-15T00:00:00.000Z',
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
    createdAt: '2023-10-20T00:00:00.000Z',
    status: 'completed'
  }
];

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = mockProjects.find(p => p.id === params.id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Project GET single error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = projectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const projectIndex = mockProjects.findIndex(p => p.id === params.id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project
    const updatedProject = {
      ...mockProjects[projectIndex],
      ...validationResult.data,
      updatedAt: new Date().toISOString()
    };

    mockProjects[projectIndex] = updatedProject;

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });

  } catch (error) {
    console.error('Project PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const projectIndex = mockProjects.findIndex(p => p.id === params.id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Remove project
    mockProjects.splice(projectIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Project DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
