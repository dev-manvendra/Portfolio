import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Profile from './Components/Profile.jsx'
import Projects from "./Components/Projects.jsx"


const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Profile />
      },{
        path : "/about",
        element: <Projects />
      },{
        path: "*",
        element: <h1>404 - Page Not Found</h1>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
