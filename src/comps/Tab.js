import React from 'react'

export default function Tab({ name, onClick, close, isCurrent, isLast }) {
    return (
        <button className="tab" onClick={onClick} style={{ background: !isCurrent && 'transparent' }}>
            <p className="tab-name">{name}</p>
            {isLast && <button className="close-tab-button" onClick={close}><i className="fas fa-times"></i></button>}
        </button>
    )
}
