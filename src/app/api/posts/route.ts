// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET - Obtener todos los posts (públicos si no está autenticado)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');

    // Si no está autenticado, solo mostrar posts publicados
    const where = !session?.user 
      ? { published: true }
      : published === 'false' 
        ? { published: false }
        : published === 'true'
          ? { published: true }
          : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    return NextResponse.json(
      { error: 'Error al obtener posts' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo post (requiere autenticación)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const data = await req.json();

    // Generar slug del título
    const slug = data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Verificar que el slug no exista
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Ya existe un post con ese título' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        published: data.published ?? false,
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error al crear post:', error);
    return NextResponse.json(
      { error: 'Error al crear post' },
      { status: 500 }
    );
  }
}