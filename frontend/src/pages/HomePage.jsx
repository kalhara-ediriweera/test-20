import { Outlet } from "react-router-dom";
import Home from "../components/HomePage/Home";
import NavBar from "../components/HomePage/NavBar";






function HomePage() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default HomePage;