import React, { useEffect, useState } from 'react';
import './App.css';
import PortfolioGrid from './components/PortfolioGrid';
import WorkForm from './components/WorkForm';
import axios from 'axios';
import './button.css';

function App() {
    const [allWorks, setAllWorks] = useState([]);
    const [filteredWorks, setFilteredWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [editingWork, setEditingWork] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/work');
            setAllWorks(response.data);
            setFilteredWorks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching works: ' + err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        let works = allWorks;
        if (filter === 'published') {
            works = allWorks.filter(work => work.status);
        } else if (filter === 'hidden') {
            works = allWorks.filter(work => !work.status);
        }
        setFilteredWorks(works);
    }, [filter, allWorks]);

    const handleAddWork = async (newWork) => {
        try {
            const response = await axios.post('http://localhost:3000/work', newWork);
            const updatedWorks = [...allWorks, response.data];
            setAllWorks(updatedWorks);
            setFilter('all');
            setFormVisible(false);
        } catch (error) {
            setError('Error adding the work: ' + error.message);
        }
    };

    const handleEditWork = async (updatedWork) => {
        try {
            if (editingWork) {
                const response = await axios.patch(`http://localhost:3000/work/${editingWork.id}`, updatedWork);
                const updatedWorks = allWorks.map(work => work.id === editingWork.id ? response.data : work);
                setAllWorks(updatedWorks);
                setFilter('all');
                setFormVisible(false);
                setEditingWork(null);
            }
        } catch (error) {
            setError('Error updating the work: ' + error.message);
        }
    };

    const handleDeleteWork = async (id) => {
        if (window.confirm('Are you sure you want to delete this work?')) {
            try {
                await axios.delete(`http://localhost:3000/work/${id}`);
                const updatedWorks = allWorks.filter(work => work.id !== id);
                setAllWorks(updatedWorks);
                setFilter('all');
            } catch (error) {
                setError('Error deleting the work:' + error.message);
            }
        }
    };

    const handleEditClick = (work) => {
        setEditingWork(work);
        setFormVisible(true);
    };

    const handleAddClick = () => {
        setEditingWork(null);
        setFormVisible(true);
    };

    const handleCancel = () => {
        setFormVisible(false);
        setEditingWork(null);
    };

    return (
        <div className="App">
            <h1>Portfolio</h1>
            <div>
                <button onClick={handleAddClick} className="button">Add Work</button>
                <div style={{ margin: '16px 0' }}>
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="published">Published</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>
            </div>

            {formVisible && (
                <WorkForm 
                    work={editingWork} 
                    onSubmit={editingWork ? handleEditWork : handleAddWork} 
                    onCancel={handleCancel} 
                />
            )}

            {loading && <p>Loading works...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <PortfolioGrid 
                    works={filteredWorks} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteWork} 
                />
            )}
        </div>
    );
}

export default App;
