import moment from 'moment';

interface Fields {
  event: string;
  date?: moment.Moment[];
  days?: number[];
}
interface CalendarState {
  fields: Fields;
  loading: boolean;
}

interface CalendarModel {
  namespaced: true;
  state: CalendarState;
  mutations: any;
}

const calendar: CalendarModel = {
  namespaced: true,
  state: {
    fields: {
      event: '',
      date: [moment().startOf('month'), moment().endOf('month')],
      days: undefined
    },
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
    }
  }
};

export default calendar;
