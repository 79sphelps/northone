import api from "./api";
import { errorHandler, isAxiosError } from './errorHandler.ts';

const GET_TODOS_ENDPOINT = `/api/todos`;

class TodoDataService {
  getTodos() {
    try {
      return api.get(GET_TODOS_ENDPOINT);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  getTodo(id) {
    try {
      return api.get(`/api/todos/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  addTodo(data) {
    try {
      return api.post(`/api/todos`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  updateTodo(id, data) {
    try {
      return api.put(`/api/todos/${id}`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteTodo(id) {
    try {
      return api.delete(`/api/todos/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteTodos() {
    try {
      return api.delete(`/api/todos`);
    } catch (error) {
      if (isAxiosError(error)) {
        // console.log(error.response?.data.username);
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  findByTitle(title) {
    try {
      return api.get(`/api/todos?title=${title}`);
    } catch (error) {
      if (isAxiosError(error)) {
        // console.log(error.response?.data.username);
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }
}

export default new TodoDataService();
