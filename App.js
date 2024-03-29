import React, { useState } from 'react';

const TaskTrackerApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: '',
        status: 'Pending',
        assignee: '',
        priority: 'P0'
    });

    const [filterCriteria, setFilterCriteria] = useState({
        assignee: '',
        priority: '',
        startDate: '',
        endDate: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria({ ...filterCriteria, [name]: value });
    };

    const handleAddTask = () => {
        setTasks([...tasks, newTask]);
        setNewTask({
            title: '',
            description: '',
            startDate: new Date().toISOString().slice(0, 10),
            endDate: '',
            status: 'Pending',
            assignee: '',
            priority: 'P0'
        });
    };

    const filteredTasks = tasks.filter(task => {
        let condition = true;
        if (filterCriteria.assignee !== '') {
            condition = condition && task.assignee === filterCriteria.assignee;
        }
        if (filterCriteria.priority !== '') {
            condition = condition && task.priority === filterCriteria.priority;
        }
        if (filterCriteria.startDate !== '') {
            condition = condition && task.startDate >= filterCriteria.startDate;
        }
        if (filterCriteria.endDate !== '') {
            condition = condition && task.endDate <= filterCriteria.endDate;
        }
        return condition;
    });

    return (
        <div>
            <h1>Task Tracker</h1>
            <h2>Add New Task</h2>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="startDate"
                    value={newTask.startDate}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    value={newTask.endDate}
                    onChange={handleInputChange}
                />
                <select
                    name="status"
                    value={newTask.status}
                    onChange={handleInputChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deferred">Deferred</option>
                </select>
                <input
                    type="text"
                    placeholder="Assignee"
                    name="assignee"
                    value={newTask.assignee}
                    onChange={handleInputChange}
                />
                <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                >
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                </select>
                <button onClick={handleAddTask}>Add New Task</button>
            </div>
            <div>
                <h2>Filter By</h2>
                <input
                    type="text"
                    placeholder="Assignee"
                    name="assignee"
                    value={filterCriteria.assignee}
                    onChange={handleFilterChange}
                />
                <select
                    name="priority"
                    value={filterCriteria.priority}
                    onChange={handleFilterChange}
                >
                    <option value="">Priority</option>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                </select>
                <input
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    value={filterCriteria.startDate}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    value={filterCriteria.endDate}
                    onChange={handleFilterChange}
                />
            </div>
            <div>
                <h2>Tasks Status</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Assignee</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.title}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.startDate}</td>
                                <td>{task.endDate}</td>
                                <td>{task.status}</td>
                                <td>{task.assignee}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTrackerApp;
