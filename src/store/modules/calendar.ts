import moment from 'moment';

interface CalendarState {
  fields: {
    date?: moment.Moment[];
    days?: number[];
  };
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
      date: [moment().startOf('month'), moment().endOf('month')],
      days: undefined
    },
    loading: false
  },
  mutations: {
    setFields(state: CalendarState, payload: { date: any; days: any }) {
      state.fields = {
        ...state.fields,
        date: payload.date,
        days: payload.days
      };
    },
    setLoading(state: CalendarState, payload: boolean) {
      state.loading = payload;
    }
  }
};

export default calendar;
