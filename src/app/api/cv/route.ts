// src/app/api/cv/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET - Obtener el CV
export async function GET() {
  try {
    const cv = await prisma.cV.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!cv) {
      return NextResponse.json(
        { error: 'CV no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(cv);
  } catch (error) {
    console.error('Error al obtener CV:', error);
    return NextResponse.json(
      { error: 'Error al obtener CV' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar el CV (requiere autenticación)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const data = await req.json();

    // Obtener el CV existente
    const existingCV = await prisma.cV.findFirst();

    if (!existingCV) {
      return NextResponse.json(
        { error: 'CV no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar el CV
    const updatedCV = await prisma.cV.update({
      where: { id: existingCV.id },
      data: {
        nombre: data.nombre,
        titulo: data.titulo,
        email: data.email,
        telefono: data.telefono,
        ubicacion: data.ubicacion,
        resumen: data.resumen,
        habilidades: data.habilidades,
        educacion: data.educacion,
        experienciaLaboral: data.experienciaLaboral
      }
    });

    return NextResponse.json(updatedCV);
  } catch (error) {
    console.error('Error al actualizar CV:', error);
    return NextResponse.json(
      { error: 'Error al actualizar CV' },
      { status: 500 }
    );
  }
}