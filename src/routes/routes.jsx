import About from "../pages/About";
import Blogs from "../pages/Blogs";
import Home from "../pages/Home";

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
    }
];