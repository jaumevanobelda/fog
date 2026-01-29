import { Link } from 'react-router-dom'
import { StoreIcon, InfoIcon, MailIcon} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Fog
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu tienda de videojuegos favorita. Descubre los mejores títulos al mejor precio.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navegación</h4>
            <nav className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <StoreIcon className="h-4 w-4" />
                Tienda
              </Link>
              <Link 
                to="" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <InfoIcon className="h-4 w-4" />
                Sobre nosotros
              </Link>
              <Link 
                to="" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <MailIcon className="h-4 w-4" />
                Contacto
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>soporte@fog.com</p>
              <p>+34 123 456 789</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-gray-500 text-sm">© 2026 Fog. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacidad</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
