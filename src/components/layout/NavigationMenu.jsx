import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navigationTree } from '../../data/navigationData';

export default function NavigationMenu() {
    const location = useLocation();

    const isDropdownActive = (item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    };

    return (
        <div className="bg-gray-100/95 backdrop-blur-md shadow-sm border-b border-gray-200 z-40 relative">
            <nav className="hidden lg:flex flex-1 flex-wrap justify-center items-center gap-x-6 gap-y-4 px-4 xl:px-8 py-4">
                {navigationTree.map((item) => (
                    item.type === 'link' ? (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-[13px] xl:text-sm font-bold tracking-wider uppercase transition-colors
                                ${isActive ? 'text-primary-900 border-b-2 border-primary-900' : 'text-slate-700 hover:text-primary-700 border-b-2 border-transparent hover:border-primary-700/30'}`
                            }
                        >
                            {item.label.toUpperCase()}
                        </NavLink>
                    ) : (
                        <div key={item.id} className="relative group flex">
                            <button className={`flex items-center text-[13px] xl:text-sm font-bold tracking-wider uppercase transition-colors border-b-2 ${isDropdownActive(item) ? 'text-primary-900 border-primary-900' : 'text-slate-700 border-transparent hover:text-primary-700 hover:border-primary-700/30'}`}>
                                {item.label.toUpperCase()}
                                <svg className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {/* Transparent bridge to prevent hover loss */}
                            <div className="absolute top-full left-0 w-full h-3 bg-transparent"></div>
                            
                            {/* Dropdown Container */}
                            <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-300 rounded-lg overflow-hidden">
                                <div className="py-2 flex flex-col">
                                    {item.items.map((subItem) => (
                                        <Link
                                            key={subItem.id}
                                            to={subItem.path}
                                            className="block px-4 py-2.5 text-[15px] font-normal text-primary-900 hover:bg-gray-50 transition-colors"
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
