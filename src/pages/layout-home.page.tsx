import { Outlet } from "react-router-dom";
import Header from "../components/header.component";


function LayoutHomePage(){
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </div>
    )
}
export default LayoutHomePage;