
import { Outlet, RouterProvider, createBrowserRouter, useRouteError, Link } from 'react-router-dom'
import Navbar from './componnents/Navbar'
import Footer from './componnents/Footer'
import Main from './componnents/Main'
import SignIn from './componnents/SignIn'
import Account from './componnents/Account'

const Layout = () => {  
  return <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
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
        element: <Main />
      },
      {
        path:'/signin',
        element: <SignIn />
      },
      {
        path:'/user',
        element: <Account />
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
