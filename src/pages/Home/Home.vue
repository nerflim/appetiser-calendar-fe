<template>
  <div class="layout">
    <a-card title="Calendar">
      <a-row :gutter="64">
        <a-col :span="8"><Form /></a-col>
        <a-col :span="16" class="calendarContainer">
          <Calendar />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Calendar from './Calendar.vue';
import Form from './Form.vue';

export default Vue.extend({
  components: {
    Calendar,
    Form
  }
});
</script>

<style scoped lang="scss">
.layout {
  padding: 30px;
  background-color: #ececec;
  min-height: 100vh;
}
.calendarContainer {
  border-left: 1px solid #e8e8e8;
}
</style>
