import { useRouter } from 'vue-router'
import axios from 'axios'

export function useAuth() {
  const router = useRouter()

  const logout = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await axios.post(
          'http://localhost:8000/api/logout',
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        )
      } catch (error) {
        // Aqui você pode exibir um toast/snackbar se quiser
        console.error('Erro ao fazer logout:', error)
      }
    }
    localStorage.removeItem('token')
    router.push('/')
  }

  return { logout }
}