
import { Outlet, RouterProvider, createBrowserRouter, useRouteError, Link } from 'react-router-dom'


const Layout = () => {  
  return <>
    <h1>Argent Bank</h1>
    <Outlet />
  </>
}

const Error = () =>{
  const error = useRouteError()
  return <> 
      <div className="content__error">
        <h2 className='content__error__status'>404</h2>
        <p className='content__error__text'>This page can't be reach. Please return to the <Link to={'/'} className='content__error__link'>homepage</Link></p>
      </div> 
  </>
}

const router = createBrowserRouter([
  {
    path:'',
    element:<Layout />,
    errorElement:<Error />,
    children: [
      {
        path:'/',
        element: ""
      },
      {
        path:'/signin',
        element: ""
      },
      {
        path:'/user',
        element: ""
      },
      {
        path:'/*',
        element: <Error />
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}

export default App
