import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import { SideBar } from './SideBar';
import SideNav from './sidebar/SideNav';
import NavBar from './sidebar/NavBar';
import DashboardContent from './DashboardContent';
import AuthUser from '../context/authUser';
import DashboardContent2 from './DashboardContent2';
import Footer from './sidebar/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCAtegories } from '../store/actions/concern_actions';

export default function Dashboard() {
    const { token } = AuthUser();
    const [userRole, setUserRole] = useState(null);
    const [reload, setReload] = useState(0);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.concerns);

    const storage = sessionStorage.getItem('ppis-token');
    const { data } = JSON.parse(storage) || "";

    useEffect(() => {
        const fetchData = async () => {
            // Use the token from useAuthUser
            if (token && data) {
                const { userType } = data;
                setUserRole(userType);
            }
        };

        fetchData();
    }, [token, data]);

    setTimeout(() => {
        if (reload < 5) {
            setReload(reload => reload + 1);
        }
    }, 1000);

    useEffect(() => {
        if (categories && categories.all_categories.length < 1 && reload < 4) {
            dispatch(getAllCAtegories());
        }
    });

    // If token is null, navigate user to "/" page
    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div>
                <div className="flex w-full">
                    <SideNav />
                    <div className="w-full bg-slate-200">
                        <NavBar />
                        <div className="pl-4">
                            {userRole === "CITIZEN" ? (
                                <DashboardContent2 />
                            ) : (
                                <DashboardContent />
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
