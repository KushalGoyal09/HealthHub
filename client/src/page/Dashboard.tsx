import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
