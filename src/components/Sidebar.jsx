// FILE: src/components/Sidebar.jsx

import React from 'react';
import { LayoutDashboard, ListTodo, Calendar, Plus, Circle, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { isBefore, parseISO, isToday } from 'date-fns';

const FilterButton = ({ icon: Icon, label, count, isActive, onClick, color }) => (
    <button onClick={onClick} className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700/50'}`}>
        <div className="flex items-center gap-3">
            <Icon className={`w-4 h-4 ${color || ''}`} />
            <span>{label}</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-blue-600' : 'bg-gray-700 text-gray-300'}`}>{count}</span>
    </button>
);

const PriorityFilter = ({ label, color, isActive, onClick }) => (
     <button onClick={onClick} className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}>
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
        <span>{label}</span>
    </button>
);


export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, activeView, setActiveView, tasks, filter, setFilter, priorityFilter, setPriorityFilter, openModal }) {
    const taskCounts = React.useMemo(() => {
        const validTasks = tasks.filter(t => t.dueDate);
        return {
            all: tasks.length,
            active: tasks.filter(t => !t.completed).length,
            completed: tasks.filter(t => t.completed).length,
            overdue: validTasks.filter(t => !t.completed && isBefore(parseISO(t.dueDate), new Date()) && !isToday(parseISO(t.dueDate))).length,
        }
    }, [tasks]);

    return (
        <>
            {/* Mobile overlay */}
            {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-10 lg:hidden"></div>}
            
            {/* Sidebar */}
            <aside className={`bg-[#1e293b] text-white w-64 p-6 flex flex-col space-y-8 fixed h-full border-r border-gray-700/50 z-20 transform transition-transform lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="w-8 h-8 text-blue-400" />
                        <h1 className="text-2xl font-bold">TaskFlow</h1>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-grow flex flex-col">
                    <div className="flex flex-col gap-2 mb-8">
                        <button onClick={() => setActiveView('tasks')} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeView === 'tasks' ? 'bg-blue-600' : 'hover:bg-gray-700/50'}`}>
                            <ListTodo className="w-5 h-5" /> Tasks
                        </button>
                        <button onClick={() => setActiveView('calendar')} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeView === 'calendar' ? 'bg-blue-600' : 'hover:bg-gray-700/50'}`}>
                            <Calendar className="w-5 h-5" /> Calendar
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Filters</h3>
                            <div className="space-y-1">
                                <FilterButton icon={ListTodo} label="All Tasks" count={taskCounts.all} isActive={filter === 'all'} onClick={() => setFilter('all')} />
                                <FilterButton icon={Circle} label="Active" count={taskCounts.active} isActive={filter === 'active'} onClick={() => setFilter('active')} />
                                <FilterButton icon={CheckCircle} label="Completed" count={taskCounts.completed} isActive={filter === 'completed'} onClick={() => setFilter('completed')} />
                                <FilterButton icon={AlertTriangle} label="Overdue" count={taskCounts.overdue} isActive={filter === 'overdue'} onClick={() => setFilter('overdue')} color="text-red-500" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Priority</h3>
                            <div className="space-y-1">
                               <PriorityFilter label="All" color="bg-gray-400" isActive={priorityFilter === 'all'} onClick={() => setPriorityFilter('all')} />
                               <PriorityFilter label="High Priority" color="bg-red-500" isActive={priorityFilter === 'high'} onClick={() => setPriorityFilter('high')} />
                               <PriorityFilter label="Medium Priority" color="bg-yellow-500" isActive={priorityFilter === 'medium'} onClick={() => setPriorityFilter('medium')} />
                               <PriorityFilter label="Low Priority" color="bg-green-500" isActive={priorityFilter === 'low'} onClick={() => setPriorityFilter('low')} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button onClick={openModal} className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                            <Plus className="w-5 h-5" />
                            Add New Task
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
}
