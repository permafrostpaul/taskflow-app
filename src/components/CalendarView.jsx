// FILE: src/components/CalendarView.jsx
// Updated to trigger the new DayTasksModal on click.

import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-700 transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
    </div>
);

const CalendarDays = () => {
    const days = [];
    const dateFormat = "E";
    let startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
        days.push(<div className="text-center font-semibold text-sm text-gray-400" key={i}>{format(addDays(startDate, i), dateFormat)}</div>);
    }
    return <div className="grid grid-cols-7 gap-2">{days}</div>;
};

const CalendarCells = ({ currentMonth, tasks, onDayClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const priorityColors = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500'
    };

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const cloneDay = day;
            const tasksForDay = tasks
                .filter(task => task.dueDate && isSameDay(parseISO(task.dueDate), cloneDay))
                .sort((a, b) => parseISO(a.dueDate) - parseISO(b.dueDate));
            
            days.push(
                <div 
                    key={day} 
                    className={`p-2 h-24 sm:h-32 rounded-lg transition-colors group ${!isSameMonth(day, monthStart) ? "bg-gray-800/50 text-gray-600" : "bg-gray-800 hover:bg-gray-700/50"} border border-transparent hover:border-blue-500 flex flex-col cursor-pointer`}
                    onClick={() => onDayClick(cloneDay)}
                >
                    <span className={`font-semibold ${isSameDay(day, new Date()) ? "text-blue-400" : ""}`}>{format(day, "d")}</span>
                    
                    {/* Desktop View: Full Task Info */}
                    <div className="mt-1 space-y-1 overflow-y-auto flex-grow hidden sm:block">
                        {tasksForDay.slice(0, 2).map(task => (
                             <div key={task.id} className={`text-xs text-white p-1 rounded truncate flex items-center gap-1.5 ${priorityColors[task.priority]}`}>
                                <span className={task.completed ? 'line-through text-gray-300' : ''}>
                                    {format(parseISO(task.dueDate), 'p')} - {task.title}
                                </span>
                            </div>
                        ))}
                        {tasksForDay.length > 2 && (
                            <div className="text-xs text-gray-400 mt-1 pl-1">+ {tasksForDay.length - 2} more</div>
                        )}
                    </div>

                    {/* Mobile View: Dot Indicators */}
                    <div className="mt-2 flex justify-center items-center gap-1 flex-wrap sm:hidden">
                        {tasksForDay.slice(0, 3).map(task => (
                            <div key={task.id} className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></div>
                        ))}
                        {tasksForDay.length > 3 && (
                             <span className="text-xs text-gray-400">+</span>
                        )}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(<div className="grid grid-cols-7 gap-1 sm:gap-2" key={day.toString()}>{days}</div>);
        days = [];
    }
    return <div className="space-y-1 sm:space-y-2">{rows}</div>;
};

const CalendarLegend = () => (
    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-4 gap-y-2 mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span>High Priority</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span>Medium Priority</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span>Low Priority</div>
    </div>
);

export default function CalendarView({ tasks, onDayClick }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <div className="bg-[#1e293b] p-4 sm:p-6 rounded-lg">
            <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <CalendarDays />
            <div className="mt-2">
                <CalendarCells currentMonth={currentMonth} tasks={tasks} onDayClick={onDayClick} />
            </div>
            <CalendarLegend />
        </div>
    );
}
