import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import PostForm from './components/post-form/PostForm.jsx'
import Layout from './components/Layout/Layout.jsx'
import AllBlogs from './pages/AllBlogs.jsx'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import RegisterForm from './components/RegisterForm/RegisterForm.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import BlogDetails from './components/BlogDetails/BlogDetails.jsx'
import EditBlog from './components/EditBlog/EditBlog.jsx'
import Home from './components/Home/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/addBlog" element={<PostForm />} />
        <Route path="/allBlogs" element={<AllBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/blogs/edit/:id" element={<EditBlog />} />
      </Route>

    </Route>
  )
);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
