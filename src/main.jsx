import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Profile from './Components/Profile.jsx'
import Projects from "./Components/Projects.jsx"
import Skills from './Components/Skills.jsx'
import ErrorComponent from "./assets/Error.jsx"
// import Nav from './Components/Nav.jsx'


const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Profile />
      },{
        path : "projects",
        element: <Projects />,
      },{
        path: "skills",
        element: <Skills />
      },
      
    ]},
    {
        path: "in-progress",
        element : <ErrorComponent />
    }
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
