import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

//pages
import HomePage from "./page/home/HomePage";
import CharacterPage from "./page/character/CharacterPage";
import LoginPage from "./page/login/LoginPage";
import ComicsPage from "./page/comics/ComicsPage";
import CreatorPage from "./page/creator/CreatorPage";
import AccountPage from "./page/account/AccountPage";

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />}>
                    <Route path='character' element={<CharacterPage />} /> { }
                    <Route path='comics' element={<ComicsPage />} /> { }
                    <Route path='creator' element={<CreatorPage />} /> { }
                    <Route path='account' element={<AccountPage />} /> { }
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers