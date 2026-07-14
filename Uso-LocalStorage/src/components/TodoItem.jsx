import React, { Fragment } from 'react'

export function TodoItem({ todo, cambiarEstado }) {
    const { id, task, completed } = todo

    const fnCambiarEstado = () => {
        cambiarEstado(id)
    }
    return (
        <>
            <Fragment>
                <li className="list-group-item">
                    <input onChange={fnCambiarEstado} type="checkbox" checked={completed} className="form-check-input me-2" />
                    {task}
                </li>
            </Fragment>
        </>
    )
}