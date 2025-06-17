// FILE: src/components/StatCards.jsx

import React, { useMemo } from 'react';
import { ListTodo, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { isBefore, parseISO, isToday } from 'date-fns';

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`bg-[#1e293b] p-5 rounded-lg flex items-center justify-between border-l-4 ${color}`}>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
    </div>
);

export default function StatCards({ tasks }) {
    const stats = useMemo(() => {
        const validTasks = tasks.filter(t => t.dueDate);
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const inProgress = total - completed;
        const overdue = validTasks.filter(t => !t.completed && isBefore(parseISO(t.dueDate), new Date()) && !isToday(parseISO(t.dueDate))).length;
        return { total, completed, inProgress, overdue };
    }, [tasks]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={ListTodo} title="Total Tasks" value={stats.total} color="border-blue-500" />
            <StatCard icon={CheckCircle} title="Completed" value={stats.completed} color="border-green-500" />
            <StatCard icon={Clock} title="In Progress" value={stats.inProgress} color="border-yellow-500" />
            <StatCard icon={AlertTriangle} title="Overdue" value={stats.overdue} color="border-red-500" />
        </div>
    );
}
