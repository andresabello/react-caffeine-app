import React from 'react'

export function Alert(props) {
    if (!props.display || props.message === '') {
        return null
    }

    return (
        <div className="alert alert-danger" role="alert">
            {props.message}
        </div>
    );
}