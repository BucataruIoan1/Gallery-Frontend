import React from 'react';
import '../button.css';

const CardActions = ({ workId, onEdit, onDelete }) => {
    return (
        <div style={actionsStyles}>
            <button className="button" onClick={() => onEdit(workId)}>Edit</button>
            <button className="button" onClick={() => onDelete(workId)}>Delete</button>
        </div>
    );
};

const actionsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
};

export default CardActions;
