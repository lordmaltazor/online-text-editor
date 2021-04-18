import React from 'react'

export default function Tab({ name, onClick, close, isCurrent, isLast, modified }) {
    return (
        <button className="tab" onClick={onClick} style={{ background: !isCurrent && 'transparent', borderBottom: modified && '5px solid gray' }}>
            <p className="tab-name">{name}</p>
            {isLast && <button className="close-tab-button" onClick={close}><i className="fas fa-times"></i></button>}
        </button>
    )
}
