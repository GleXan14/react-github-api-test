import { Navigate } from "react-router-dom";

interface Props{
    children: JSX.Element
    isAuth: boolean,
    redirectTo?:string
}

function PrivateWrapper({ children, isAuth, redirectTo = '/auth/login' }: Props){
    return isAuth ? children : <Navigate to={redirectTo} replace />;
}

export default PrivateWrapper;

