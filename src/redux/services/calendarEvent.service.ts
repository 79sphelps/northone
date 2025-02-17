import api from "./api.js";
import { errorHandler, isAxiosError } from './errorHandler.ts';

const GET_CALENDAR_EVENTS_ENDPOINT = `/api/calendarEvents`;

class CalendarEventDataService {
  getCalendarEvents() {
    try {
      return api.get(GET_CALENDAR_EVENTS_ENDPOINT);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  getCalendarEvent(id) {
    try {
      return api.get(`/api/calendarEvents/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  addCalendarEvent(data) {
    try {
      return api.post(`/api/calendarEvents`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  updateCalendarEvent(id, data) {
    try {
      return api.put(`/api/calendarEvents/${id}`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteCalendarEvent(id) {
    try {
      return api.delete(`/api/calendarEvents/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteCalendarEvents() {
    try {
      return api.delete(`/api/calendarEvents`);
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
      return api.get(`/api/calendarEvents?title=${title}`);
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

export default new CalendarEventDataService();
