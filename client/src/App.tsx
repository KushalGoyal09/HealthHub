import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./page/Login";
import Signup from "./page/Signup";
import RegisterDoctor from "./page/RegisterDoctor";
import RegisterPatient from "./page/RegisterPatient";
import Search from "./page/Search";
import Doctor, { doctorDetailLoader } from "./page/Doctor";
import NotFound from "./page/NotFound";
import Dashboard from "./page/Dashboard";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/register-doctor",
            element: <RegisterDoctor />,
        },
        {
            path: "/register-patient",
            element: <RegisterPatient />,
        },
        {
            path:'/search',
            element:<Search/>
        },
        {
            path: '/doctor/:doctorId',
            element: <Doctor/>,
            loader: doctorDetailLoader
        },
        {
            path:'dash',
            element: <Dashboard/>
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ]);

    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
};

export default App;
