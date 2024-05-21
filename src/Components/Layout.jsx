import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import AllCards from "./CardHome/All_Cards";

const Layout = () => {

    return (
        <>
       
            <body>
                <Header />
                <main className="main_principal">
                    <Outlet />
                </main>
                <Footer />
            </body>
        </>
    );

}

export default Layout;