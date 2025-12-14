import axios from 'axios';

// Configuración del cliente Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Endpoints para experiencia
export const getExperiencia = () => apiClient.get('/experiencia');
export const getExperienciaById = (id) => apiClient.get(`/experiencia/${id}`);

// Endpoints para posts
export const getPosts = () => apiClient.get('/posts');
export const getPostById = (id) => apiClient.get(`/posts/${id}`);
export const createPost = (post) => apiClient.post('/posts', post);
export const updatePost = (id, post) => apiClient.put(`/posts/${id}`, post);
export const deletePost = (id) => apiClient.delete(`/posts/${id}`);

export default apiClient;