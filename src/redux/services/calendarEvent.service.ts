import api from "./api.ts";
import { errorHandler, isAxiosError } from './errorHandler.ts';
import { ICalendarEvent } from "../actions/index.ts";

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

  getCalendarEvent(id: string) {
    try {
      return api.get(`${GET_CALENDAR_EVENTS_ENDPOINT}/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  addCalendarEvent(data: ICalendarEvent) {
    try {
      return api.post(GET_CALENDAR_EVENTS_ENDPOINT, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  updateCalendarEvent(data: ICalendarEvent) {
    try {
      return api.put(`${GET_CALENDAR_EVENTS_ENDPOINT}/${data.id}`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteCalendarEvent(id: string) {
    try {
      return api.delete(`${GET_CALENDAR_EVENTS_ENDPOINT}/${id}`);
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
      return api.delete(GET_CALENDAR_EVENTS_ENDPOINT);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  findByTitle(title: string) {
    try {
      return api.get(`${GET_CALENDAR_EVENTS_ENDPOINT}?title=${title}`);
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
