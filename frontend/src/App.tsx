import './App.css'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import { Outlet } from 'react-router-dom'

import {  QueryClientProvider } from '@tanstack/react-query'
import {queryClient} from './utils/queryClient'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header/>
        <div className='mainPage'>
        <Outlet />
        </div>
        <Footer/>
      </QueryClientProvider>
    </>
  )
}

export default App
