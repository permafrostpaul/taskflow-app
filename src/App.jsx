// FILE: src/App.jsx
// Main component - updated to manage state for the new DayTasksModal.

import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCards from './components/StatCards';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import TaskModal from './components/TaskModal';
import DayTasksModal from './components/DayTasksModal'; // Import the new modal
import { isBefore, parseISO, isToday, parse, isSameDay } from 'date-fns';

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
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleSaveTask = (taskData) => {
        const fullDueDate = taskData.dueDate && taskData.dueTime 
            ? parse(`${taskData.dueDate} ${taskData.dueTime}`, 'yyyy-MM-dd HH:mm', new Date()).toISOString()
            : parse(taskData.dueDate, 'yyyy-MM-dd', new Date()).toISOString();

        const taskToSave = { ...taskData, dueDate: fullDueDate };
        
        if (taskToSave.id) {
            setTasks(tasks.map(t => t.id === taskToSave.id ? taskToSave : t));
        } else {
            setTasks([...tasks, { ...taskToSave, id: Date.now(), completed: false }]);
        }
        closeTaskModal();
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompleted = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };
    
    const openTaskModal = (task = null) => {
        setCurrentTask(task);
        setIsTaskModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setCurrentTask(null);
    };

    const openDayModal = (day) => {
        setSelectedDate(day);
        setIsDayModalOpen(true);
    };

    const closeDayModal = () => {
        setIsDayModalOpen(false);
        setSelectedDate(null);
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
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

    const tasksForSelectedDate = useMemo(() => {
        if (!selectedDate) return [];
        return tasks.filter(task => isSameDay(parseISO(task.dueDate), selectedDate));
    }, [tasks, selectedDate]);


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
                openModal={() => openTaskModal()}
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
                                onEdit={openTaskModal}
                            />
                        ) : (
                            <CalendarView tasks={tasks} onDayClick={openDayModal} />
                        )}
                    </div>
                </div>
            </main>
            <TaskModal 
                isOpen={isTaskModalOpen}
                onRequestClose={closeTaskModal}
                onSave={handleSaveTask}
                taskToEdit={currentTask}
            />
            <DayTasksModal 
                isOpen={isDayModalOpen}
                onRequestClose={closeDayModal}
                tasks={tasksForSelectedDate}
                selectedDate={selectedDate}
            />
        </div>
    );
}
