import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navigationTree } from '../../data/navigationData';

export default function NavigationMenu() {
    const location = useLocation();

    const isDropdownActive = (item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    };

    return (
        <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-40 sticky top-[60px] sm:top-[64px]">
            <nav className="hidden lg:flex flex-1 flex-wrap justify-center items-center gap-x-4 xl:gap-x-6 gap-y-2.5 px-4 xl:px-8 py-3">
                {navigationTree.map((item) => (
                    item.type === 'link' ? (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-[11px] xl:text-xs font-bold tracking-wider uppercase transition-colors
                                ${isActive ? 'text-primary-900 border-b-2 border-primary-900' : 'text-slate-700 hover:text-primary-700 border-b-2 border-transparent hover:border-primary-700/30'}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ) : (
                        <div key={item.id} className="relative group flex">
                            <button className={`flex items-center text-[11px] xl:text-xs font-bold tracking-wider uppercase transition-colors border-b-2 ${isDropdownActive(item) ? 'text-primary-900 border-primary-900' : 'text-slate-700 border-transparent hover:text-primary-700 hover:border-primary-700/30'}`}>
                                {item.label}
                                <svg className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-0 w-full h-3 bg-transparent"></div>
                            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top z-50 border border-slate-100 ring-1 ring-black ring-opacity-5">
                                {/* Up arrow for dropdown */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-slate-100"></div>
                                <div className="py-2 relative bg-white rounded-md z-10">
                                    {item.items.map((subItem) => (
                                        <Link
                                            key={subItem.id}
                                            to={subItem.path}
                                            className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </nav>
        </div>
    );
}
