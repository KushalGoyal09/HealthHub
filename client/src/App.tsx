import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import RegisterDoctor from "./page/RegisterDoctor";
import RegisterPatient from "./page/RegisterPatient";
import Search from "./page/Search";
import Doctor, { doctorDetailLoader } from "./page/Doctor";
import NotFound from "./page/NotFound";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home";
import Chat from "./page/Chat";
import DoctorAppointment, {
    doctorAppointmentsLoader,
} from "@/components/DoctorAppointments";
import DoctorMeet, { doctorMeetLoader } from "@/components/DoctorMeet";
import DoctorProfile, { doctorProfileLoader } from "@/components/DoctorProfile";
import DoctorWallet, { doctorWalletLoader } from "@/components/DoctorWallet";
import { RecoilRoot } from "recoil";
import { Toaster } from "./components/ui/toaster";
import Faq from "./page/Faqs";
import AboutDeveloper from "./page/kushalgoyal";
import Meet from "./page/Meet";
import Layout from "./components/Layout";
import PatientAppointments, {
    patientAppointmentsLoader,
} from "./components/PatientAppointments";
import PatietProfile, {
    patientProfileLoader,
} from "./components/PatientProfile";
import PatietMeets, { patientMeetsLoader } from "./components/PatientMeets";
import About from "./page/About";
import Contact from "./page/Contact";
import Report from "./page/Report";
import Suggest from "./page/Suggest";
import Protected from "./components/Protected";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/home",
                    element: <Home />,
                },
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
                    path: "/search",
                    element: <Search />,
                },
                {
                    path: "/doctor/:doctorId",
                    element: <Doctor />,
                    loader: doctorDetailLoader,
                },
                {
                    path: "/chat",
                    element: (
                        <Protected allowedRole={["PATIENT"]}>
                            <Chat />
                        </Protected>
                    ),
                },
                {
                    path: "/meet/:meetId",
                    element: (
                        <Protected allowedRole={["PATIENT", "DOCTOR"]}>
                            <Meet />
                        </Protected>
                    ),
                },
                {
                    path: "/dash",
                    element: (
                        <Protected allowedRole={["DOCTOR"]}>
                            <Dashboard />
                        </Protected>
                    ),
                    children: [
                        {
                            path: "wallet",
                            element: <DoctorWallet />,
                            loader: doctorWalletLoader,
                        },
                        {
                            path: "profile",
                            element: <DoctorProfile />,
                            loader: doctorProfileLoader,
                        },
                        {
                            path: "appointments",
                            element: <DoctorAppointment />,
                            loader: doctorAppointmentsLoader,
                        },
                        {
                            path: "meets",
                            element: <DoctorMeet />,
                            loader: doctorMeetLoader,
                        },
                    ],
                },
                {
                    path: "/dashboard",
                    element: (
                        <Protected allowedRole={["PATIENT"]}>
                            <Dashboard />
                        </Protected>
                    ),
                    children: [
                        {
                            path: "profile",
                            element: <PatietProfile />,
                            loader: patientProfileLoader,
                        },
                        {
                            path: "appointments",
                            element: <PatientAppointments />,
                            loader: patientAppointmentsLoader,
                        },
                        {
                            path: "meets",
                            element: <PatietMeets />,
                            loader: patientMeetsLoader,
                        },
                    ],
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/contact",
                    element: <Contact />,
                },
                {
                    path: "/report",
                    element: <Report />,
                },
                {
                    path: "/suggest",
                    element: <Suggest />,
                },
                {
                    path: "/faqs",
                    element: <Faq />,
                },
                {
                    path: "/kushalgoyal",
                    element: <AboutDeveloper />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ]);

    return (
        <RecoilRoot>
            <Toaster />
            <RouterProvider router={router} />
        </RecoilRoot>
    );
};

export default App;
