import React from 'react';
import CardActions from './CardActions';
import '../button.css';

const PortfolioCard = ({ work, onEdit, onDelete }) => {
    return (
        <div style={cardContainerStyles}>
            <div style={contentStyles}>
                {work.image && <img src={work.image} alt={work.title} style={imageStyles} />}
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <a href={work.clientLink} target="_blank" rel="noopener noreferrer">Visit the client's website</a>
            </div>
            <CardActions workId={work.id} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};

const cardContainerStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    marginBottom: '20px',
};

const contentStyles = {
    flex: '1 1 auto',
};

const imageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
};

export default PortfolioCard;