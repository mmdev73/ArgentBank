
import { Outlet, RouterProvider, createBrowserRouter, useRouteError, Link } from 'react-router-dom'
import Navbar from './componnents/Navbar'
import Footer from './componnents/Footer'
import Main from './pages/Main'
import SignIn from './pages/SignIn'
import Account from './pages/Account'
import AccountView from './pages/AccountView'

/**
 * A description of the entire function.
 *
 * @return {JSX.Element} description of return value
 */
const Layout = () => {  
  return <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
}

/**
 * Renders an error message based on the route error status.
 *
 * @return {JSX.Element} The error message component
 */
const Error = () =>{
  const error = useRouteError()
  console.log(error)
  return <> 
      <div className="content__error">
        {
          error && <>
            <h2 className='content__error__status'>
              {error.status ? error.status : '404'}
            </h2>
            <p className='content__error__text'>
              {error.message ? error.message : error.statusText ? error.statusText : 'This page can\'t be reach.'} 
              Please return to the <Link to={'/'} className='content__error__link'>homepage</Link>
            </p>
          </>
        }
        {
          !error && <>
            <h2 className='content__error__status'>
              404
            </h2>
            <p className='content__error__text'>
              This page can't be reach.
              Please return to the <Link to={'/'} className='content__error__link'>homepage</Link>
            </p>
          </>
        }
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
        element: <Main />,
        errorElement: <Error />
      },
      {
        path:'/login',
        element: <SignIn />,
        errorElement: <Error />
      },
      {
        path:'/profile',
        element: <Account />,
        errorElement: <Error />
      },
      {
        path:'/profile/:accountId',
        element: <AccountView />,
        errorElement: <Error />
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
