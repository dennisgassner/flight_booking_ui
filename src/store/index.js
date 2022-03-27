import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    flights: [],
    selectedFlight:{},
    selectedSeats:[],
    total:null,
    customerId:123,
    bookingId:null
  },
  getters: {
    get_flights(state) {
      return state.flights;
    },
    get_selected_flight(state) {
      return state.selectedFlight
    },
    get_selected_seats(state) {
      return state.selectedSeats
    },
    get_total(state) {
      return state.total
    },
    get_booking_id(state) {
      return state.bookingId
    }
  },
  mutations: {
    add_flight(state, flight) {
      state.flights.push(flight)
    },
    set_flight(state, flight) {
      if(flight.flightID.flightNumber != state.selectedFlight?.flightID?.flightNumber) {
        state.selectedFlight = flight    
        state.selectedSeats = []
      }
    },
    add_booked_seat(state, seat) {
      state.selectedSeats.push(seat)
    },
    set_total(state, total) {
      state.total = total
    },
    set_booking_id(state, booking_id) {
      state.bookingId = booking_id;
    }
  },
  actions: {
    async get_all_flights (context) {
      axios.get('/api/flights').then((response) =>
      {
        response.data.forEach(f => {
          context.commit('add_flight', f)
        })
      })
      .catch(function(error) {
        console.log(error)
      });
    },
    async get_total (context) {
      let seatsIds = new Array(this.state.selectedSeats.length)
      this.state.selectedSeats.forEach(s => seatsIds.push(s.seatNumber.seatNumber))
      const postValue = {
        flightNumber:this.state.selectedFlight.flightID.flightNumber,
        bookedSeats:seatsIds
      };
      axios.post('/api/total', postValue).then((response) =>
      {
        context.commit('set_total', response.data)
      })
      .catch(function(error) {
        console.log(error)
      });
    },
    async book_flight (context) {
      let seatsIds = new Array()
      this.state.selectedSeats.forEach(s => seatsIds.push(s.seatNumber.seatNumber))
      const postValue = {
        flightNumber:this.state.selectedFlight.flightID.flightNumber,
        customerID:this.state.customerId,
        bookedSeats:seatsIds
      };
      axios.post('/api/booking', postValue).then((response) =>
      {
        context.commit('set_booking_id', response.data.bookingID)
      })
      .catch(function(error) {
        console.log(error)
      });
    },
    set_flight(context, flight) {
      context.commit('set_flight', flight)
    },
    add_booked_seat(context, seat) {
      context.commit('add_booked_seat', seat)
    }
  },
  modules: {
  }
})
