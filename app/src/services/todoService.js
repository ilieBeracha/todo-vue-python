import axios from "axios";

class TodoService {
  constructor() {
    this.token = localStorage.getItem("vuetoken");
  }

  async addTodo(title, description, status, date) {
    const results = await axios.post(
      "http://127.0.0.1:5000/addTodo",
      {
        title,
        description,
        status,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return results;
  }

  async getTodosByUser(status) {
    const token = localStorage.getItem("vuetoken");
    const results = await axios.get(
      `http://127.0.0.1:5000/getTodos?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return results.data;
  }

  async deleteTodo(id) {
    const results = await axios.delete(
      `http://127.0.0.1:5000/deleteTodo?id=${id}`
    );
    return results.data;
  }
}

export const todoService = new TodoService();
