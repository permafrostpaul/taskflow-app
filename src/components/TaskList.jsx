// FILE: src/components/TaskList.jsx

import React from 'react';
import { ListTodo, Check, Edit, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const priorityClasses = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-green-500',
};

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    // Defensive check for dueDate
    if (!task.dueDate) {
        return null; // or render a fallback UI
    }
    
    return (
        <div className={`bg-[#1e293b] p-4 rounded-lg flex items-center justify-between border-l-4 ${priorityClasses[task.priority]}`}>
            <div className="flex items-center gap-4 min-w-0">
                <button 
                    onClick={() => onToggle(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-green-500'}`}
                >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <div className="min-w-0">
                    <p className={`font-semibold truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</p>
                    <p className="text-sm text-gray-400 truncate">{task.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                <span className="text-sm text-gray-400 hidden md:block">{format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-blue-400 p-1"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};


export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-20 bg-[#1e293b] rounded-lg">
                <ListTodo className="mx-auto w-16 h-16 text-gray-600" />
                <h3 className="mt-4 text-xl font-semibold">No tasks found</h3>
                <p className="text-gray-400 mt-1">Create your first task to get started!</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Tasks</h3>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}
