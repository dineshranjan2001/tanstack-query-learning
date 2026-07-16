import About from "../pages/About";
import Blogs from "../pages/Blogs";
import Home from "../pages/Home";
import PostDetails from "../pages/PostDetails";
import Posts from "../pages/Posts";

export const routes=[
    {
        name:'Home',
        path:'/',
        element:<Home/>,
        isShowInHeader:true
    },
    {
        name:'About',
        path:'/about',
        element:<About/>,
        isShowInHeader:true
    },
    {
        name:'Blog',
        path:'/blog',
        element:<Blogs/>,
        isShowInHeader:true
    },
    {
        name:'Posts',
        path:'/posts',
        element:<Posts/>,
        isShowInHeader:true
    },
    {
        name:'Post Details',
        path:'/posts/:id',
        element:<PostDetails/>,
        isShowInHeader:false
    }
];