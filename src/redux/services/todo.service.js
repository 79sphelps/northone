import http from "../../http-common";

class TodoDataService {
  getTodos() {
    return http.get(`/api/todos`);
  }

  getTodo(id) {
    return http.get(`/api/todos/${id}`);
  }

  addTodo(data) {
    return http.post(`/api/todos`, data);
  }

  updateTodo(id, data) {
    return http.put(`/api/todos/${id}`, data);
  }

  deleteTodo(id) {
    return http.delete(`/api/todos/${id}`);
  }

  deleteTodos() {
    return http.delete(`/api/todos`);
  }

  findByTitle(title) {
    return http.get(`/api/todos?title=${title}`);
  }
}

export default new TodoDataService();
