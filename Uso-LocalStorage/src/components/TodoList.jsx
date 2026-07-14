import React, { Fragment, useEffect, useRef, useState } from "react";
import { TodoItem } from './TodoItem';
import { v4 as uuid } from 'uuid'

const KEY = 'todoApp.todos'
export function TodoList() {

    const [todos, setTodos] = useState([])

    const taskRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if (storedTodos) {
            setTodos(storedTodos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const agregarTarea = () => {
        console.log("AGREGANDO TAREA!")
        const task = taskRef.current.value;
        const id = uuid();
        console.log("TASK: " + task);
        console.log("ID: " + id);

        if (task === '') return;

        setTodos((prevTodos) => {
            const newTask = {
                id: id,
                task: task,
                completed: true
            }

            return [...prevTodos, newTask];
        })

        taskRef.current.value = null;
    }

    const cambiarEstadoTarea = (id) => {
        console.log("CAMBIANDO ESTADO DE TAREA CON ID: " + id);
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const contarTareasPendientes = () => {
        return todos.filter((todo) => !todo.completed).length;
    }

    const resumenTareas = () => {
        const pendientes = contarTareasPendientes();

        if (pendientes === 1) {
            return (
                <div className="alert alert-info">
                    Solo queda una tarea por terminar!
                </div>
            )
        }
        if (pendientes === 0) {
            return (
                <div className="alert alert-success">
                    Felicidades! No quedan tareas pendientes!
                </div>
            )
        }
        return (
            <div className="alert alert-info">
                Quedan {pendientes} tareas por hacer!
            </div>
        )
    }

    return (
        <Fragment>
            <h1 className="alert alert-info">Listado de Tareas</h1>

            <div className="input-group mt-3 mb-3">
                <input ref={taskRef} type="text" placeholder="AGREGAR TAREA" className="form-control"></input>
                <button onClick={agregarTarea} className="btn btn-success">
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>

            <ul className="list-group mt-3 mb-3">
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea} />
                ))}
            </ul>
            {resumenTareas()}
        </Fragment>
    )
}
