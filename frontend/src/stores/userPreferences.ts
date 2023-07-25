import { ref } from "vue";
import { defineStore } from "pinia";

export const userPreferences = defineStore("userPreferences", () => {
  const temperatureCoefficient = ref(1);
  const temperatureUnits = ref("°C");

  const speedCoefficient = ref(1);
  const speedUnits = ref("km/h");

  function toggleTemperature() {
    if (temperatureCoefficient.value === 1) {
      temperatureCoefficient.value = 33.8;
      temperatureUnits.value = "°F";
      return;
    }

    temperatureCoefficient.value = 1;
    temperatureUnits.value = "°C";
  }

  function toggleSpeed() {
    if (speedCoefficient.value === 1) {
      speedCoefficient.value = 0.621371192;
      speedUnits.value = "mp/h";
      return;
    }

    speedCoefficient.value = 1;
    speedUnits.value = "km/h";
  }

  return {
    temperatureUnits,
    temperatureCoefficient,
    speedUnits,
    speedCoefficient,
    toggleTemperature,
    toggleSpeed,
  };
});
