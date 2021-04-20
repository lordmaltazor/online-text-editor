import React from 'react'

export default function Tab({ name, onClick, close, isCurrent, isLast, modified }) {
    return (
        <button className="tab" onClick={onClick} style={{ background: isCurrent && 'var(--color)', borderBottom: modified && '4px solid rgb(219, 242, 5)' }}>
            <p className="tab-name">{name}</p>
            {isLast && <button className="close-tab-button" onClick={close}><i className="fas fa-times"></i></button>}
        </button>
    )
}
