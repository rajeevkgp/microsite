import * as React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import { GlobalRouter } from "./Route";
import { useCookies } from 'react-cookie'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from "./utility/query-utils";
import { AUTHORISATION_PATH, AUTHORISATION_TOKEN_PARAM } from "./constants/global-constants";

const ProtectedRoutes = () => {
    const [cookies] = useCookies([AUTHORISATION_TOKEN_PARAM])
    if (cookies[AUTHORISATION_TOKEN_PARAM] == null) {
        window.location.href = AUTHORISATION_PATH;
        return (<></>);
    }
    return (
        <>
            <GlobalRouter></GlobalRouter>
        </>
    )
}

const LoginComponent = () => {
    const [cookies, setCookie] = useCookies([AUTHORISATION_TOKEN_PARAM])
    const query = useQuery();
    const token = query.get(AUTHORISATION_TOKEN_PARAM);
    setCookie(AUTHORISATION_TOKEN_PARAM, token);
    return (<Navigate to="/" />)
}

const App = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path='/authorize' element={<LoginComponent />} />
                <Route path="*" element={<ProtectedRoutes />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default App;