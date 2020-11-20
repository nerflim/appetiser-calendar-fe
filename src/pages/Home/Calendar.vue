<template>
  <div>
    <h1 class="calendarRange">
      {{ fields.date[0] | date }} - {{ fields.date[1] | date }}
    </h1>
    <a-spin :spinning="loading">
      <a-calendar>
        <ul slot="dateCellRender" slot-scope="value" class="events">
          <li v-for="item in getListData(value)" :key="item.content">
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
    }
  },
  filters: {
    date(value: moment.Moment) {
      return moment(value).format('MMM DD, YYYY');
    }
  },
  methods: {
    getListData() {
      return [];
    }
  }
});
</script>

<style scoped>
.calendarRange {
  text-align: right;
}
</style>
