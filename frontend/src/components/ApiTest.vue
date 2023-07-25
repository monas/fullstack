<script lang="ts">
import TemperatureOutput from "./TemperatureOutput.vue";
import WindOutput from "./WindOutput.vue";
import echo from "@/use/echo";
import type { UserInterface, WeatherSyncInterface } from "@/interfaces/user";

export default {
  components: {
    TemperatureOutput,
    WindOutput,
  },
  data: () => ({
    apiResponse: [] as UserInterface[],
    showMap: false,
    mapLink: "",
  }),

  created() {
    echo
      .channel("weather-sync")
      .listen("WeatherUpdated", (e: WeatherSyncInterface) => {
        const updatable = this.apiResponse?.findIndex(
          (item) => item.latest_weather?.user_id === e.weather.user_id
        );
        if (updatable) {
          this.apiResponse[updatable].latest_weather = e.weather;
        }
      });

    this.fetchData();
  },

  methods: {
    async fetchData() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const url = apiUrl;
      const responseJson = await (await fetch(url)).json();
      this.apiResponse = responseJson?.users;
    },
    formatDate(dateValue?: string) {
      if (!dateValue || !dateValue.length) {
        return "";
      }

      const date = new Date(dateValue);
      return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? "" : "0"}${
        date.getMonth() + 1 + (date.getDate() > 9 ? "" : "0")
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    showMapModal(user: UserInterface) {
      this.mapLink = `https://maps.google.com?q=${user.latitude},${user.longitude}&ll=${user.latitude},${user.longitude}&z=5`;
      this.showMap = true;
    },
  },
};
</script>

<template>
  <div v-if="!apiResponse.length">Pinging the api...</div>

  <div v-else>
    <b-card-group columns>
      <b-card
        v-for="user in apiResponse"
        :key="user?.id"
        :title="user.name"
        footer-tag="footer"
        footer-class="border-0 bg-white pt-0 px-3 pb-2"
      >
        <b-card-text class="d-flex justify-content-between align-items-center">
          <img
            :src="`https://openweathermap.org/img/wn/${user.latest_weather?.conditions.weather[0].icon}@2x.png`"
            :alt="user.latest_weather?.conditions.weather[0].description"
            :title="user.latest_weather?.conditions.weather[0].description"
          />

          <temperature-output
            :value="user.latest_weather?.conditions.main.temp"
          />

          <wind-output
            :value="user.latest_weather?.conditions.wind.deg"
            :speed="user.latest_weather?.conditions.wind.speed"
          />
        </b-card-text>
        <template #footer>
          <div class="d-flex justify-content-between">
            <a href="#" @click="showMapModal(user)">map</a>
            <span class="text-muted small">{{
              formatDate(user.latest_weather?.created_at)
            }}</span>
          </div>
        </template>
      </b-card>
    </b-card-group>

    <b-modal
      v-model="showMap"
      size="xl"
      class="h-100"
      centered
      hide-header
      body-class="p-0"
      ok-only
      ok-title="Close"
      @hide="mapLink = ''"
    >
      <iframe
        :src="mapLink"
        frameborder="0"
        width="100%"
        height="100%"
        style="min-height: 80vh"
      ></iframe>
      <div class="text-center small mb-1">
        <span
          >Direct link:
          <a :href="mapLink" target="_blank">{{ mapLink }}</a></span
        >
      </div>
    </b-modal>
  </div>
</template>
