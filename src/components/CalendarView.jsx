// FILE: src/components/CalendarView.jsx

import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-700"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-700"><ChevronRight className="w-5 h-5" /></button>
        </div>
    </div>
);

const CalendarDays = () => {
    const days = [];
    let startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start week on Monday
    for (let i = 0; i < 7; i++) {
        days.push(<div className="text-center font-semibold text-sm text-gray-400" key={i}>{format(addDays(startDate, i), 'E')}</div>);
    }
    return <div className="grid grid-cols-7 gap-2">{days}</div>;
};

const CalendarCells = ({ currentMonth, tasks, onTaskClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const cloneDay = day;
            const tasksForDay = tasks.filter(task => task.dueDate && isSameDay(parseISO(task.dueDate), cloneDay));
            
            days.push(
                <div key={day} className={`p-2 h-28 rounded-lg transition-colors ${!isSameMonth(day, monthStart) ? "bg-gray-800/50 text-gray-600" : "bg-gray-800"} border border-transparent hover:border-blue-500 flex flex-col`}>
                    <span className={`font-semibold ${isSameDay(day, new Date()) ? "text-blue-400" : ""}`}>{format(day, "d")}</span>
                    <div className="mt-1 space-y-1 overflow-y-auto flex-grow">
                        {tasksForDay.map(task => (
                             <div key={task.id} onClick={() => onTaskClick(task)} className="text-xs bg-blue-600/50 p-1 rounded truncate cursor-pointer hover:bg-blue-600">
                                {task.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(<div className="grid grid-cols-7 gap-2" key={day.toString()}>{days}</div>);
        days = [];
    }
    return <div className="space-y-2">{rows}</div>;
};

export default function CalendarView({ tasks, onTaskClick }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <div className="bg-[#1e293b] p-6 rounded-lg">
            <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <CalendarDays />
            <div className="mt-2">
                <CalendarCells currentMonth={currentMonth} tasks={tasks} onTaskClick={onTaskClick} />
            </div>
        </div>
    );
}
