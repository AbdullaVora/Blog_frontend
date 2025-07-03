import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"
import BlogForm from "./components/Form";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./helper/AuthProvider";
import ProtectedRoute from "./helper/ProtectedRoute";
import BlogDetails from "./pages/BlogDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Example Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blogs" element={<Blogs />} />

          {/* Protected Routes */}

          <Route path="/addBlog" element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          } />
          <Route path="/editBlog/:id" element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
