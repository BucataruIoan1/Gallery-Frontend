import React from 'react';
import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({ works, onEdit, onDelete }) => {
    return (
        <div style={gridStyles}>
            {works.map(work => (
                <PortfolioCard 
                    key={work.id} 
                    work={work} 
                    onEdit={() => onEdit(work)} 
                    onDelete={() => onDelete(work.id)} 
                />
            ))}
        </div>
    );
};

const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    gridRowGap: '40px',
    padding: '20px',
    margin: '0 auto',
    maxWidth: '1500px',
    marginBottom: '20px'
};

export default PortfolioGrid;
