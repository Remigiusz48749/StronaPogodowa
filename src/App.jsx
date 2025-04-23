import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Comments from './pages/Comments';
import Navbar from './components/Navbar';

const App = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/';

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/Comments" element={<Comments />} />
            </Routes>
        </>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
