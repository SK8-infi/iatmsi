import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { navigationTree } from '../../data/navigationData';
import { siteConfig } from '../../data/siteConfig';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const navigate = useNavigate();

    const toggleDropdown = (id) => {
        setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
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

                {/* Main navbar */}
                <nav className="border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-12">
                            {/* Conference Acronym */}
                            <div className="flex-shrink-0 flex items-center gap-2 mr-4 lg:mr-8">
                                <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                    <div className="bg-white rounded-full p-[3px] w-9 h-9 flex items-center justify-center shadow-lg">
                                        <img
                                            src={siteConfig.branding.conferenceLogo}
                                            alt="Conference Logo"
                                            className="w-full h-full object-contain rounded-full"
                                        />
                                    </div>
                                    <span className="font-bold text-primary-900 text-base md:text-base tracking-tight whitespace-nowrap pt-1 lg:pt-0">
                                        {siteConfig.seo.title.split(' |')[0]}
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-4">
                                {navigationTree.map((item) => (
                                    item.type === 'link' ? (
                                        <NavLink
                                            key={item.id}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase transition-colors
                                                ${isActive ? 'text-primary-700 font-bold' : 'text-slate-700 hover:text-primary-700'}`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    ) : (
                                        <div key={item.id} className="relative group">
                                            <button className="flex items-center px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase text-slate-700 hover:text-primary-700 transition-colors">
                                                {item.label}
                                                <svg className="w-3 h-3 ml-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                                            <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 border border-slate-100 ring-1 ring-black ring-opacity-5">
                                                <div className="py-1">
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.id}
                                                            to={subItem.path}
                                                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700"
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}

                                {/* Submit Button */}
                                <a
                                    href={siteConfig.externalLinks.submissionPortal.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white bg-primary-900 hover:bg-primary-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 transition-all transform hover:scale-105"
                                >
                                    Submit Paper
                                </a>
                            </div>

                            {/* Mobile menu button */}
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
                    </div>
                </nav>
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
                                        {item.label}
                                    </NavLink>
                                ) : (
                                    <div key={item.id} className="w-full flex flex-col items-center">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            style={{ color: 'white' }}
                                            className="flex items-center justify-center gap-2 py-3 text-base font-medium !text-white transition-colors w-full"
                                        >
                                            {item.label}
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
