// FILE: src/components/Header.jsx

import React from 'react';
import { Search, Filter, Menu } from 'lucide-react';

export default function Header({ setSearchTerm, toggleSidebar }) {
    return (
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
                    <Menu size={24} />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-white">My Tasks</h2>
                    <p className="text-gray-400">Manage your daily productivity</p>
                </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search tasks..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                </button>
            </div>
        </header>
    );
}
