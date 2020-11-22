import { addEvents, deleteEvents, getEvents } from '@/services/event';
import moment from 'moment';

export interface Fields {
  event: string;
  date?: moment.Moment[];
  days?: number[];
}

export interface CalendarEvent {
  id: number;
  name: string;
  date_from: string;
  date_to: string;
  days: number[];
}
export interface CalendarState {
  fields: Fields;
  loading: boolean;
  events: CalendarEvent[];
  date: moment.Moment;
}

interface CalendarModel {
  namespaced: true;
  state: CalendarState;
  mutations: any;
  actions: any;
}

const calendar: CalendarModel = {
  namespaced: true,
  state: {
    fields: {
      event: '',
      date: [moment().startOf('month'), moment().endOf('month')],
      days: undefined
    },
    date: moment(),
    events: [],
    loading: false
  },
  mutations: {
    setFields(state: CalendarState, payload: Fields) {
      state.fields = {
        date: payload.date,
        days: payload.days,
        event: payload.event
      };
    },
    setLoading(state: CalendarState, payload: boolean) {
      state.loading = payload;
    },
    setEvents(state: CalendarState, payload: CalendarEvent[]) {
      state.events = payload;
    },
    setDate(state: CalendarState, payload: moment.Moment) {
      state.date = payload;
    }
  },
  actions: {
    async getEvents({ commit }: any) {
      commit('setLoading', true);
      try {
        const data = await getEvents();
        commit('setEvents', data);
      } catch (err) {
        console.log(err);
      }
      commit('setLoading', false);
    },
    async addEventsAsync({ dispatch, commit }: any, payload: Fields) {
      let data = null;
      commit('setLoading', true);
      try {
        data = await addEvents(payload);
        await dispatch('getEvents');
      } catch (err) {
        console.log(err);
      }
      commit('setLoading', false);
      return data;
    },
    async deleteEventsAsync({ dispatch, commit }: any) {
      commit('setLoading', true);
      try {
        await deleteEvents();
        await dispatch('getEvents');
      } catch (err) {
        console.log(err);
      }
      commit('setLoading', false);
    }
  }
};

export default calendar;
