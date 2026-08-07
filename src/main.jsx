import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import HomeFeed from './pages/HomeFeed.jsx'
import Login from './pages/Login.jsx'
import Connections from './pages/Connections.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([{
  path:'/',
  element: <App />,
  children:[
    { index: true, element: <HomeFeed /> },
    {path:'login',element:<Login/>},
    {path:'connections',element:<Connections/>},
    {path:'profile',element:<Profile/>}
  ]
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
