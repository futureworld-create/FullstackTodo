import React from 'react';
import { NavLink } from 'react-router-dom';
import TodoNavbar from './TodoNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TodoView = () => {
    const { todoId } = useParams();
    const [todo, setTodo] = useState(null);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get_todo/${todoId}/`,
                    {
                        headers: {
                            Authorization: `Token ${localStorage.getItem("token")}`
                        }
                    }
                );
                setTodo(response.data);
            } catch (error) {
                console.error("Error fetching todo:", error);
            }
        };

        fetchTodo();
    }, [todoId]);

    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <TodoNavbar />
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',   
            padding: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginTop: '20px',
            }}>
            <h1 style={
                {
                    color: '#6c63ff',
                    marginBottom: '10px',
                    fontSize: '1.8rem',
                    textAlign: 'center'
                }
            } >{todo.title}</h1>
            <p style={{
                color: '#666',
                marginBottom: '10px',
                fontSize: '1rem',
                textAlign: 'center'
            }}>{todo.description}</p>
            <p style={{
                color: '#666',
                marginBottom: '10px',
                fontSize: '1rem',
                textAlign: 'center'
            }}>Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
        </>
    );
};

export default TodoView;
