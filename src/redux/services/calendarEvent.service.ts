import api from "./api";
import { ICalendarEvent } from "../types";

const ENDPOINT = "/api/calendarEvents";

export const CalendarEventService = {
  async getCalendarEvents(): Promise<ICalendarEvent[]> {
    const { data } = await api.get<ICalendarEvent[]>(ENDPOINT);
    return data;
  },

  async getCalendarEvent(id: string): Promise<ICalendarEvent> {
    const { data } = await api.get<ICalendarEvent>(`${ENDPOINT}/${id}`);
    return data;
  },

  async addCalendarEvent(payload: ICalendarEvent): Promise<ICalendarEvent> {
    const { data } = await api.post<ICalendarEvent>(ENDPOINT, payload);
    return data;
  },

  async updateCalendarEvent(payload: ICalendarEvent): Promise<ICalendarEvent> {
    const { data } = await api.put<ICalendarEvent>(
      `${ENDPOINT}/${payload._id}`,
      payload
    );
    return data;
  },

  async deleteCalendarEvent(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  async deleteCalendarEvents(): Promise<void> {
    await api.delete(ENDPOINT);
  },

  async findByTitle(title: string): Promise<ICalendarEvent[]> {
    const { data } = await api.get<ICalendarEvent[]>(
      `${ENDPOINT}?title=${encodeURIComponent(title)}`
    );
    return data;
  },
};
