import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
// import Nav from './Components/Nav'

function App() {
  

  return (
    <>
      <Header/>
      <Outlet />
      <Footer />
    </>
  )
}


export default App