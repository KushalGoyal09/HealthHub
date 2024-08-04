import { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </>
    );
};

export default Layout;
