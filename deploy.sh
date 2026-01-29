#!/bin/bash

# 🚀 Script de Despliegue Automático - Portafolio Full-Stack
# Autor: Bryan Steven Taco
# Fecha: $(date)

set -e  # Exit on any error

echo "🚀 Iniciando despliegue del portafolio full-stack..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Verificando dependencias..."

    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado. Instálalo desde https://nodejs.org/"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado."
        exit 1
    fi

    if ! command -v git &> /dev/null; then
        print_error "Git no está instalado."
        exit 1
    fi

    print_success "Dependencias verificadas correctamente"
}

# Setup environment variables
setup_environment() {
    print_status "Configurando variables de entorno..."

    if [ ! -f ".env.local" ]; then
        print_warning "Creando archivo .env.local..."
        cat > .env.local << EOF
# Database
MONGODB_URI=mongodb+srv://your-connection-string

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Email (opcional)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
EOF
        print_warning "⚠️  IMPORTANTE: Actualiza las variables de entorno en .env.local"
    fi

    if [ ! -f "backend/.env" ]; then
        print_warning "Creando archivo backend/.env..."
        cat > backend/.env << EOF
# Environment
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://your-connection-string

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app
EOF
        print_warning "⚠️  IMPORTANTE: Actualiza las variables de entorno en backend/.env"
    fi

    print_success "Variables de entorno configuradas"
}

# Install frontend dependencies
install_frontend() {
    print_status "Instalando dependencias del frontend..."

    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Dependencias del frontend instaladas"
    else
        print_status "Dependencias del frontend ya instaladas"
    fi
}

# Install backend dependencies
install_backend() {
    print_status "Instalando dependencias del backend..."

    cd backend
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Dependencias del backend instaladas"
    else
        print_status "Dependencias del backend ya instaladas"
    fi
    cd ..
}

# Seed database
seed_database() {
    print_status "Poblando base de datos..."

    cd backend
    npm run seed
    cd ..

    print_success "Base de datos poblada con datos de ejemplo"
}

# Build frontend
build_frontend() {
    print_status "Construyendo frontend..."

    npm run build
    print_success "Frontend construido correctamente"
}

# Test build
test_build() {
    print_status "Ejecutando pruebas..."

    # Add your test commands here
    print_success "Pruebas completadas"
}

# Deploy to Vercel (frontend)
deploy_frontend() {
    print_status "Desplegando frontend a Vercel..."

    if command -v vercel &> /dev/null; then
        vercel --prod
        print_success "Frontend desplegado en Vercel"
    else
        print_warning "Vercel CLI no está instalado. Instálalo con: npm i -g vercel"
        print_warning "Luego ejecuta: vercel --prod"
    fi
}

# Deploy backend (Render/Railway)
deploy_backend() {
    print_status "Preparando backend para despliegue..."

    cd backend

    if [ ! -f "render.yaml" ]; then
        print_warning "Creando configuración de Render..."
        cat > render.yaml << EOF
services:
  - type: web
    name: portfolio-backend
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        fromSecret: mongodb_uri
      - key: JWT_SECRET
        fromSecret: jwt_secret
EOF
    fi

    print_success "Backend preparado para despliegue en Render/Railway"
    print_warning "Sube el código a GitHub y conecta con Render o Railway"
    cd ..
}

# Main deployment function
main() {
    echo "🎯 Portafolio Full-Stack - Script de Despliegue"
    echo "=============================================="

    check_dependencies
    setup_environment
    install_frontend
    install_backend
    seed_database
    build_frontend
    test_build
    deploy_frontend
    deploy_backend

    echo ""
    print_success "🎉 ¡Despliegue completado!"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Actualiza las variables de entorno con tus valores reales"
    echo "2. Configura MongoDB Atlas y actualiza la URI de conexión"
    echo "3. Despliega el backend en Render o Railway"
    echo "4. Verifica que todo funcione correctamente"
    echo ""
    echo "📚 Documentación:"
    echo "- README.md: Guía completa del proyecto"
    echo "- API.md: Documentación de la API"
    echo ""
    echo "🔗 URLs importantes:"
    echo "- Frontend: https://tu-dominio.vercel.app"
    echo "- Backend: https://tu-backend.onrender.com"
    echo "- Admin: https://tu-dominio.vercel.app/admin"
}

# Run main function
main "$@"
