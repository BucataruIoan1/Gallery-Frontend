import React, { useState, useEffect } from 'react';

const WorkForm = ({ work, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [clientLink, setClientLink] = useState('');
    const [status, setStatus] = useState(false);
    const [linkError, setLinkError] = useState('');
    const [imageRequiredError, setImageRequiredError] = useState('');

    useEffect(() => {
        if (work) {
            setTitle(work.title);
            setDescription(work.description);
            setImage(work.image);
            setClientLink(work.clientLink);
            setStatus(work.status);
        }
    }, [work]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setImageRequiredError('');

        if (work && clientLink !== work.clientLink && !clientLink.startsWith('https://')) {
            setLinkError('The link must start with "https://".');
            return;
        } else {
            setLinkError('');
        }

        if (!work && !image) {
            setImageRequiredError('An image is required to create a new work.');
            return;
        }

        const updatedWork = {
            title,
            description,
            image: image || (work ? work.image : null),
            clientLink,
            status,
        };

        onSubmit(updatedWork);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <div className="form-section">

          
            <h2>{work ? 'Edit Work' : 'Add New Work'}</h2>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                required 
            />
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
            />
            {imageRequiredError && <p style={{ color: 'red' }}>{imageRequiredError}</p>}
            <input 
                type="text" 
                value={clientLink} 
                onChange={(e) => setClientLink(e.target.value)} 
                placeholder="Link Client (ex: https://example.com)" 
                required 
            />
            {linkError && <p style={{ color: 'red' }}>{linkError}</p>}
            <label>
                Publicat:
                <input 
                    type="checkbox" 
                    checked={status} 
                    onChange={(e) => setStatus(e.target.checked)} 
                />
            </label>
            <button type="submit" className='button'>{work ? 'Update' : 'Add'}</button>
            <button type="button" className='button' onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default WorkForm;
