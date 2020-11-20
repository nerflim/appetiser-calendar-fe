<template>
  <div>
    <a-form :form="form" @submit="onSubmit">
      <a-form-item label="Event">
        <a-input
          placeholder="Event Name"
          :disabled="loading"
          v-decorator="[
            'event',
            {
              rules: [{ required: true, message: 'Please enter an event' }],
              initialValue: fields.event
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Select Date">
        <a-range-picker
          style="width: 100%"
          :format="dateFormats"
          :disabled="loading"
          v-decorator="[
            'date',
            {
              rules: [{ required: true, message: 'Please select a date' }],
              initialValue: fields.date
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Select Days">
        <a-checkbox-group
          :options="daysOptions"
          v-decorator="['days', { initialValue: fields.days }]"
          :disabled="loading"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          block
          class="submit"
          :loading="loading"
        >
          Save
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { dateFormats, daysOptions } from '../../helpers/constants';
import { getEvents } from '../../services/event';

export default Vue.extend({
  data() {
    return {
      form: this.$form.createForm(this, { name: 'eventForm' }),
      dateFormats,
      daysOptions
    };
  },
  computed: {
    fields() {
      return this.$store.state.calendar.fields;
    },
    loading() {
      return this.$store.state.calendar.loading;
    }
  },
  methods: {
    onSubmit(e: { preventDefault: () => void }) {
      e.preventDefault();
      this.form.validateFields((err, { date, days }) => {
        if (!err) {
          this.$store.commit('calendar/setLoading', true);
          this.$store.commit('calendar/setFields', { date, days, event });
          getEvents()
            .then(res => {
              console.log('GET EVENTS:', res);

              this.$notification.success({
                message: 'Success!',
                description: 'Event saved successfully!',
                placement: 'topLeft'
              });
            })
            .finally(() => this.$store.commit('calendar/setLoading', false));
        }
      });
    }
  }
});
</script>

<style scoped>
.submit {
  margin-top: 30px;
}
</style>
