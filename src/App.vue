
<template>
  <v-app>
  <v-app-bar elevation="4">
    <v-spacer/>
    <h2 class="text-justify text-uppercase font-weight-thin blue-text">Flight Booking App</h2>
    <v-spacer/>
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <a-flight v-for="(item, i) in allflights" :key="i"
              :flight=item @select_flight="setFlight($event)"></a-flight>   
        </v-col>
        <v-col cols="6">
          <v-card v-if="!isBooked()">
            <v-card-title>Book your flight {{selectedFlight?.flightID?.flightNumber}}</v-card-title>
            <v-card-subtitle>Choose your seats</v-card-subtitle>
            <v-card-text>
              <v-list>  
                <v-list-item v-for="(item, i) in selectedFlight?.availableSeats" :key="i">
                  <v-btn :color="setColor(item.seatType.seatClass)" class="ma-1" 
                    :disabled="isSeatBooked(item.seatNumber.seatNumber)"
                    @click="bookSeat(item)">
                      {{item.seatNumber.seatNumber}}
                  </v-btn>
                  <v-chip class="ma-1">{{item.seatType.seatClass}}</v-chip>
                  <v-icon v-if="item.seatType.extraLegroom" class="ma-1">mdi-seat-legroom-extra</v-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn elevation="2" color="info" v-if="isBookingPossible()"
                @click="doBooking">
                Book now for {{normalizePrice(getTotal)}}
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-if="isBooked()" color="light-green accent-4" class="pb-2">
            <v-card-title>Booking completed</v-card-title>
            <v-card-subtitle>Booking ID:  {{bookingId}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Flight Booking App</strong>
    </v-col>
  </v-footer>
</v-app>
</template>

<script>

import { computed, onMounted  } from 'vue'
import { useStore } from 'vuex'
import AFlight from './components/AFlight.vue'

export default {
  components: { AFlight },
  setup() {
    const store = useStore()

        onMounted (() => {
          store.dispatch('get_all_flights');
        })

        return {
          allflights: computed(() => store.getters.get_flights),
          setFlight: (flight) => store.dispatch('set_flight', flight),
          selectedFlight: computed(() => store.getters.get_selected_flight),
          bookSeat: (seat) => {
            store.dispatch('add_booked_seat', seat)
            store.dispatch('get_total')
            },
          bookedSeats: computed(() => store.getters.get_selected_seats),
          getTotal: computed(() => store.getters.get_total),
          bookingId: computed(() => store.getters.get_booking_id),
          doBooking:() => store.dispatch('book_flight')
        }
  },
  methods: {
    normalizePrice(value) {
      return Number.parseFloat(value).toFixed(2) + " USD"
    },
    setColor(setClass) {
      if (setClass == 'BUSINESS') {
        return 'teal'
      }
      return 'cyan'      
    },
    isSeatBooked(seatId) {
      let isBooked = false;
      if(this.bookedSeats==null) {
        return isBooked;
      }
      this.bookedSeats.forEach(element => {
        if(element.seatNumber.seatNumber == seatId) {
          isBooked = true;
        }
      });
      return isBooked;
    },
    isBookingPossible() {
      return this.selectedFlight!=null && this.bookedSeats!=null && this.bookedSeats.length>0
    },
    isBooked() {
      return this.bookingId != null
    }
  }
 
}
</script>

