import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
// import Edit from "./pages/Edit.jsx";
// import AddPost from './pages/AddPost.jsx';
import Index from "./pages/Index.jsx"
// import Details from "./pages/Details.jsx"
import RootLayout from './pages/RootLayout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import {Provider}  from 'react-redux';
import store from './state/index.js';
import WithGuard from './components/WithGuard.jsx';
import { lazy, Suspense } from 'react';

const AddPost=lazy(()=>import("./pages/AddPost.jsx"))
const Details=lazy(()=>import("./pages/Details.jsx"))
const Edit=lazy(()=>import("./pages/Edit.jsx"))

const postParamHandler=({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Not Found", {
      statusText: 'please Enter just number when use id',
      status: 404
    });
  } else {
    return 'good'
  }

}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'post', element: <Index /> },
      {
        path: 'post/add', element: <WithGuard>
          <Suspense fallback={<p>pleas wait</p>}>
          <AddPost /> 
          </Suspense>
      </WithGuard> },
      {
        path: 'post/:id/edit', element: <WithGuard>
          <Suspense fallback={<p>pleas wait</p>}>
          <Edit />

          </Suspense>
      </WithGuard>  },
      {
        path: "post/:id", element:
          <Suspense fallback={<p>pleas wait</p>}>
  <Details />
          </Suspense>
        ,
        loader: postParamHandler
      
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
