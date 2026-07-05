import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScaleWrapper from './ScaleWrapper';


export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-white pt-0">
            <Navbar />
            <div className="pt-[48px] lg:pt-[48px]"> {/* Offset for fixed Navbar */}
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
