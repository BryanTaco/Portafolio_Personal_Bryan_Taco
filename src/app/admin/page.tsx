'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  FileText,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag
} from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
  views: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    if (activeTab === 'blog') {
      fetchBlogPosts();
    }
  }, [activeTab]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      } else {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/blog', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const deleteBlogPost = async (postId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setBlogPosts(blogPosts.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Bienvenido, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-slate-800 min-h-screen border-r border-slate-700">
          <div className="p-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Mi Perfil</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'blog'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Blog</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Dashboard</h2>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Posts del Blog</p>
                      <p className="text-2xl font-bold text-white">{blogPosts.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Visitas Totales</p>
                      <p className="text-2xl font-bold text-white">
                        {blogPosts.reduce((total, post) => total + post.views, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Tag className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Posts Publicados</p>
                      <p className="text-2xl font-bold text-white">
                        {blogPosts.filter(post => post.published).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Posts Recientes</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post._id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{post.title}</h4>
                        <p className="text-slate-400 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()} • {post.views} vistas
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.published
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {post.published ? 'Publicado' : 'Borrador'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Editar Perfil</h2>
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <p className="text-slate-400">Funcionalidad de edición de perfil próximamente...</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Gestión del Blog</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Post</span>
                </button>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                          Título
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                          Vistas
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {blogPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-slate-700/50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-white">{post.title}</div>
                              <div className="text-sm text-slate-400">{post.category}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              post.published
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {post.published ? 'Publicado' : 'Borrador'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">
                            {post.views}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteBlogPost(post._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
