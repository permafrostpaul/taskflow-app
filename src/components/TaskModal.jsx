// FILE: src/components/TaskModal.jsx

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
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
        maxWidth: '500px',
        padding: '2rem',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
};

export default function TaskModal({ isOpen, onRequestClose, onSave, taskToEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || ''); // Handle case where description is null/undefined
            // Ensure dueDate is valid before formatting
            setDueDate(taskToEdit.dueDate ? format(parseISO(taskToEdit.dueDate), 'yyyy-MM-dd') : '');
            setPriority(taskToEdit.priority);
        } else {
            // Reset form for new task
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('medium');
        }
    }, [taskToEdit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            id: taskToEdit ? taskToEdit.id : null,
            title, 
            description, 
            dueDate, 
            priority,
            completed: taskToEdit ? taskToEdit.completed : false
        });
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Task Modal"
        >
            <div className="text-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={onRequestClose}><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                        <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onRequestClose} className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold">Save Task</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
