import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../Pages/Admin'
import Home from '../Pages/Home'


export const SiteRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}


