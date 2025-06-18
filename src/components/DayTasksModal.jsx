// FILE: src/components/DayTasksModal.jsx

import React from 'react';
import Modal from 'react-modal';
import { X, Check } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '0.75rem',
        width: '90%',
        maxWidth: '400px',
        padding: '1.5rem',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
};

const priorityClasses = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-green-500',
};

const TaskItem = ({ task }) => (
    <div className={`p-3 rounded-lg flex items-center justify-between border-l-4 ${priorityClasses[task.priority]}`}>
        <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                {task.completed && <Check className="w-3 h-3 text-white" />}
            </div>
            <div>
                <p className={`font-semibold text-sm truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</p>
                <p className="text-xs text-gray-400">{format(parseISO(task.dueDate), 'p')}</p>
            </div>
        </div>
    </div>
);


export default function DayTasksModal({ isOpen, onRequestClose, tasks, selectedDate }) {
    if (!selectedDate) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Day's Tasks Modal"
        >
            <div className="text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{format(selectedDate, 'MMMM d, yyyy')}</h2>
                    <button onClick={onRequestClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {tasks.length > 0 ? (
                        tasks.map(task => <TaskItem key={task.id} task={task} />)
                    ) : (
                        <p className="text-gray-400 text-center py-8">No tasks for this day.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
}
