<template>
  <div>
    <a-row>
      <a-col :span="4">
        <a-button type="danger" @click="onDelete">
          <a-icon type="delete" /> Delete All Events
        </a-button>
      </a-col>
      <a-col :span="20">
        <h1 class="calendarRange">
          {{ date.format('MMM YYYY') }}
        </h1>
      </a-col>
    </a-row>
    <a-spin :spinning="loading">
      <a-calendar @panelChange="onChange">
        <ul slot="dateCellRender" slot-scope="value" class="events">
          <li
            v-for="(item, index) in getListData(value)"
            :key="`${item.content}-${index}`"
          >
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </a-calendar>
    </a-spin>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

export default Vue.extend({
  computed: {
    fields() {
      return this.$store.state.calendar.fields;
    },
    loading() {
      return this.$store.state.calendar.loading;
    },
    events() {
      return this.$store.state.calendar.events;
    },
    date() {
      return this.$store.state.calendar.date;
    }
  },
  filters: {
    date(value: moment.Moment) {
      return moment(value).format('MMM DD, YYYY');
    }
  },
  methods: {
    getListData(value: moment.Moment) {
      const listData: any[] = [];
      // find the events that are in between the dates
      this.events.forEach((item: any) => {
        if (
          (value.isBetween(moment(item.date_from), moment(item.date_to)) ||
            value.isSame(item.date_from) ||
            value.isSame(item.date_to)) &&
          item.days.includes(value.day())
        ) {
          listData.push({ type: 'success', content: item.name });
        }
      });
      return listData;
    },
    onDelete() {
      this.$store.dispatch('calendar/deleteEventsAsync');
    },
    onChange(value: moment.Moment) {
      console.log(value.format('MMM DD, YYYY'));
      this.$store.commit('calendar/setDate', value);
    }
  }
});
</script>

<style>
.calendarRange {
  text-align: right;
}
.ant-fullcalendar-header .ant-radio-group {
  display: none;
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>
