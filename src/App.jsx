// FILE: src/App.jsx
// This is the main container component. It manages all the state and logic.

import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCards from './components/StatCards';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import TaskModal from './components/TaskModal';
import { isBefore, parseISO, isToday } from 'date-fns';

// --- Main App Component ---
export default function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [activeView, setActiveView] = useState('tasks');
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    };
    
    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompleted = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };
    
    const openModal = (task = null) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            // Defensive check for tasks without proper data
            if (!task.title || !task.dueDate || !task.priority) return false;

            const matchesFilter = 
                (filter === 'all') ||
                (filter === 'active' && !task.completed) ||
                (filter === 'completed' && task.completed) ||
                (filter === 'overdue' && !task.completed && isBefore(parseISO(task.dueDate), new Date()) && !isToday(parseISO(task.dueDate)));

            const matchesPriority =
                (priorityFilter === 'all') ||
                (priorityFilter === task.priority.toLowerCase());

            const matchesSearch = 
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return matchesFilter && matchesPriority && matchesSearch;
        });
    }, [tasks, filter, priorityFilter, searchTerm]);

    return (
        <div className="bg-[#0f172a] text-gray-300 font-sans flex min-h-screen">
            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                activeView={activeView}
                setActiveView={setActiveView}
                tasks={tasks}
                filter={filter}
                setFilter={setFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                openModal={() => openModal()}
            />
            <main className="flex-1 lg:pl-64">
                <div className="p-4 sm:p-6 md:p-8">
                    <Header 
                        setSearchTerm={setSearchTerm}
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                    <StatCards tasks={tasks} />

                    <div className="mt-8">
                        {activeView === 'tasks' ? (
                            <TaskList 
                                tasks={filteredTasks}
                                onToggle={toggleTaskCompleted}
                                onDelete={handleDeleteTask}
                                onEdit={openModal}
                            />
                        ) : (
                            <CalendarView tasks={tasks} onTaskClick={openModal} />
                        )}
                    </div>
                </div>
            </main>
            <TaskModal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSave={(task) => {
                    if (task.id) {
                        handleUpdateTask(task);
                    } else {
                        handleAddTask(task);
                    }
                    closeModal();
                }}
                taskToEdit={currentTask}
            />
        </div>
    );
}
