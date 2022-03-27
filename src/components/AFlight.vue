<template>
    <v-card elevation="2" class="mx-auto mb-3" >
        <v-card-title>
            {{props.flight.departureAirport.airportName}} ({{props.flight.departureAirport.city}})
        </v-card-title>
        <v-card-subtitle>
            to
            {{props.flight.destinationAirport.airportName}} ({{props.flight.destinationAirport.city}})
            at {{timeFromDateTime(props.flight.departureTime)}}
        </v-card-subtitle>
        <v-card-subtitle>
        <v-chip small outlined class="ma-1" > 
            {{dateFromDateTime(props.flight.departureTime)}}
        </v-chip>
        <v-chip small outlined class="ma-1"> 
            {{props.flight.flightID.flightNumber}}
        </v-chip>     
        <v-chip small outlined class="ma-1"> 
            {{normalizePrice(props.flight.economyPrice)}}
        </v-chip>
        <v-spacer/>
        </v-card-subtitle>
        <v-card-actions>
            <v-spacer/>
            <v-btn elevation="2" color="info" @click="$emit('select_flight',props.flight)">Select Flight</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        flight:Object
    },
    emits: ["select_flight"],

    setup(props) {
        return {
            props
        }
    },
    methods: {
        dateFromDateTime(datetime) {
            const dateTimeType = new Date(datetime)
            return new String(dateTimeType.getDate()).padStart(2,'0') + '.' + new String(dateTimeType.getMonth()+1).padStart(2,'0') + '.' + dateTimeType.getFullYear() 
        },
        timeFromDateTime(datetime) {
            const dateTimeType = new Date(datetime)
            return new String(dateTimeType.getHours()).padStart(2,'0') + ':' + new String(dateTimeType.getMinutes()).padStart(2,'0')
        },
        normalizePrice(value) {
            return Number.parseFloat(value).toFixed(2) + " USD"
        }
    }

})
</script>