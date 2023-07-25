<script lang="ts">
import { mapActions, mapState } from "pinia";
import { userPreferences } from "@/stores/userPreferences";

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    speed: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapActions(userPreferences, { toggleValue: "toggleSpeed" }),
  },
  computed: {
    ...mapState(userPreferences, ["speedUnits"]),
    ...mapState(userPreferences, ["speedCoefficient"]),
    computedValue() {
      return (+this.speed * this.speedCoefficient).toFixed();
    },
    computedSpeedColor() {
      if (this.speed > 50) {
        return "";
      }

      if (this.speed > 30) {
        return "text-danger";
      }

      if (this.speed > 10) {
        return "text-warning";
      }

      return "text-success";
    },
  },
};
</script>

<template>
  <span @click="toggleValue" class="cursor-pointer">
    <b-icon
      icon="cursor-fill"
      class="h2 m-0 mr-2"
      :class="computedSpeedColor"
      :rotate="`${value + -45}`"
    ></b-icon>
    {{ computedValue }} {{ speedUnits }}
  </span>
</template>
