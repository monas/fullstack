<script lang="ts">
import { mapActions, mapState } from "pinia";
import { userPreferences } from "@/stores/userPreferences";

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(userPreferences, ["temperatureCoefficient"]),
    ...mapState(userPreferences, ["temperatureUnits"]),
    computedValue() {
      return (+this.value + this.temperatureCoefficient).toFixed(2);
    },
  },
  methods: {
    ...mapActions(userPreferences, { toggleValue: "toggleTemperature" }),
  },
};
</script>

<template>
  <span @click="toggleValue" class="cursor-pointer"
    >{{ computedValue }} {{ temperatureUnits }}</span
  >
</template>
