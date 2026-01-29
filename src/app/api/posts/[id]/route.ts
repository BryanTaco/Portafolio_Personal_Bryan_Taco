// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET - Obtener un post por ID o slug
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Intentar buscar por ID o por slug
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
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

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    // Incrementar vistas
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error al obtener post:', error);
    return NextResponse.json(
      { error: 'Error al obtener post' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar post (requiere autenticación)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;
    const data = await req.json();

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        published: data.published
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

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error al actualizar post:', error);
    return NextResponse.json(
      { error: 'Error al actualizar post' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar post (requiere autenticación)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;

    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Post eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    return NextResponse.json(
      { error: 'Error al eliminar post' },
      { status: 500 }
    );
  }
}