import './App.css'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient'
import { UserProvider } from './context/userContext'
import { FilterProvider } from './context/filterContext'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <FilterProvider>
            <Header />
            <div className='mainPage'>
              <Outlet />
            </div>
            <Toaster />
            <Footer />
          </FilterProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
