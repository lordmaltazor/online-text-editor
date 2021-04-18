import React from 'react';

export default function CloseButton({ onClick }) {
    return (
        <button className="close-button" onClick={onClick}><i className="fas fa-times"></i></button>
    )
}
