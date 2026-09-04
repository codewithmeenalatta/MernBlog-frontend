import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx"
import DashBoard from "./components/DashBoard.jsx";
import PostDetails from "./components/PostDetails.jsx"
import CreatePost from "./components/CreatePost.jsx";
import EditPost from "./components/EditPost.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Profile from "./components/Profile.jsx";
import Setting from "./components/Setting.jsx"
import { Settings } from "lucide-react";

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {path : "" , element : <Home/>},
        {path : "/about" , element : <About/>},
        {path : '/Contact' , element : <Contact/>},
        {path : '/Login' , element : <Login/>} ,
        {path : '/register' , element : <Register/>},
        {path : '/dashboard' , element : <DashBoard/>},
        {path : '/post/:id' , element : <PostDetails/>},
        {path : '/create-post' , element : <CreatePost/> },
        {path : '/dashboard/edit/:id' , element : <EditPost/>},
        {path : '/profile' , element : <Profile/>},
        {path : '/forgot-password' , element : <ForgotPassword/>},
        {path : '/reset-password/:token' , element : <ResetPassword/> },
        {path : '/setting' , element : <Setting/>}

      ]
    }
  ])

  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
}
export default  App;