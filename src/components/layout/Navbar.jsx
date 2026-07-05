import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { navigationTree } from '../../data/navigationData';
import { siteConfig } from '../../data/siteConfig';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const isDropdownActive = (item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    };

    const toggleDropdown = (id) => {
        setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <header className="relative z-50 w-full bg-gray-100/90 backdrop-blur-md border-b border-gray-200 flex flex-col">
                {/* Top Branding Bar - College Branding */}
                <a
                    href={siteConfig.branding.instituteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b-2 hover:bg-primary-950 transition-colors bg-primary-900 border-primary-950"
                >
                    <div className="flex items-center w-full min-h-[48px] py-1 px-2 sm:px-4">
                        {/* Left Column - Logo */}
                        <div className="w-10 sm:w-14 flex-shrink-0 flex justify-start">
                            <div className="bg-white rounded-full p-[3px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg">
                                <img
                                    src={siteConfig.branding.instituteLogo}
                                    alt="Institute Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Center Column - Text */}
                        <div className="flex-1 flex items-center justify-center px-2 overflow-hidden">
                            <h2
                                className="text-white font-bold uppercase text-center leading-tight tracking-tight"
                                style={{
                                    fontSize: 'clamp(0.6rem, 1.6vw, 1.4rem)',
                                    letterSpacing: '0.01em',
                                    color: '#ffffff',
                                    textWrap: 'balance'
                                }}
                            >
                                {siteConfig.branding.instituteName}
                            </h2>
                        </div>
                    </div>
                </a>

                {/* Main Branding Row (Logo + Submit) & Navigation */}
                <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Unified Row: Logo, Navigation, Submit */}
                        <div className="relative flex flex-col lg:flex-row items-center justify-between py-2 lg:py-4 gap-y-4">
                            {/* Conference Acronym (Left) */}
                            <div className="flex-shrink-0 flex items-center gap-2 w-full lg:w-auto justify-start">
                                <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                    <div className="bg-white rounded-full p-[3px] w-10 h-10 flex items-center justify-center shadow-lg border border-gray-100">
                                        <img
                                            src={siteConfig.branding.conferenceLogo}
                                            alt="Conference Logo"
                                            className="w-full h-full object-contain rounded-full"
                                        />
                                    </div>
                                    <span className="font-bold text-primary-900 text-lg md:text-xl tracking-tight whitespace-nowrap pt-1 lg:pt-0">
                                        {siteConfig.seo.title.split(' |')[0]}
                                    </span>
                                </Link>
                                
                                {/* Mobile menu button (Right-aligned on mobile) */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="lg:hidden p-2 text-gray-500 ml-auto focus:outline-none"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            {/* Submit Button (Right, Desktop Only) */}
                            <div className="hidden lg:block flex-shrink-0">
                                <a
                                    href={siteConfig.externalLinks.submissionPortal.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-md shadow-sm text-[13px] font-bold !text-white bg-primary-900 hover:bg-primary-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 transition-all transform hover:scale-105"
                                >
                                    Submit Paper
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="fixed top-0 right-0 z-[70] w-[280px] h-screen bg-primary-950 shadow-2xl flex flex-col lg:hidden">
                        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                            <span className="font-bold text-base tracking-wide text-white">{siteConfig.seo.title.split(' |')[0]}</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-1 text-white hover:text-gray-300 transition-colors focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 flex flex-col items-center">
                            {navigationTree.map((item) => (
                                item.type === 'link' ? (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{ color: 'white' }}
                                        className={({ isActive }) => `py-3 text-base font-medium transition-colors !text-white ${isActive ? 'font-bold' : ''}`}
                                    >
                                        {item.label.toUpperCase()}
                                    </NavLink>
                                ) : (
                                    <div key={item.id} className="w-full flex flex-col items-center">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            style={{ color: 'white' }}
                                            className="flex items-center justify-center gap-2 py-3 text-base font-medium !text-white transition-colors w-full"
                                        >
                                            {item.label.toUpperCase()}
                                            <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdowns[item.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openDropdowns[item.id] && (
                                            <div className="flex flex-col items-center gap-0 pb-1 w-full bg-white/5">
                                                {item.items.map((subItem) => (
                                                    <NavLink
                                                        key={subItem.id}
                                                        to={subItem.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                                        className={({ isActive }) => `py-2 text-sm transition-colors !text-white/80 ${isActive ? '!text-white font-bold' : 'hover:!text-white'}`}
                                                    >
                                                        {subItem.label}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="px-6 py-4 border-t border-white/10">
                            <a
                                href={siteConfig.externalLinks.submissionPortal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-bold text-[#002855] bg-white hover:bg-gray-100 transition-all"
                            >
                                Submit Paper
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
