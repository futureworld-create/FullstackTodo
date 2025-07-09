import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TodoNavbar from "./TodoNavbar";
import moment from "moment";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, DatePicker, Switch } from "antd";

const TodoEdit = () => {
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");

  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/get_todo/${todoId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todo");
        }
        const data = await response.json();
        setTodo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [todoId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TodoNavbar />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h2>Edit Todo</h2>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: todo.title,
            description: todo.description,
            due_date: todo.due_date ? moment(todo.due_date) : null,
            completed: todo.completed,
          }}
          onFinish={async (values) => {
            try {
              const response = await axios.put(
                `http://localhost:8000/update_todo/${todoId}/`,
                values,
                {
                  headers: {
                    Authorization: `Token ${token}`,
                  },
                }
              );
              toast.success("Todo updated successfully!");
              navigate(`/todo/${todoId}`);
            } catch (error) {
              toast.error("Failed to update todo.");
            }
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="due_date" label="Due Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="completed" label="Completed" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Todo
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default TodoEdit;
