<template>
    <table class="table table-bordered table-hover">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Patient ID</th>
                <th scope="col">Risk Score</th>
                <th scope="col">Age</th>
                <th scope="col">Sex</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="patient in patients" :key="patient.id" @click="rowClickHandler(patient)">
                <td>{{ patient.id }}</td>
                <td>{{ patient.risk_score }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.sex }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import xhr from "axios";

    export default {
       data() {
           return {
               patients: []
           }
       },

        methods: {
            rowClickHandler(patient) {
               this.$store.commit('updateSelectedPatient', patient);
            },

            getPatients() {
                xhr.get(`http://localhost:3000/patients`)
                    .then((response) => {
                        this.patients = response.data;
                    })
            }
        },

        mounted(){
            this.getPatients();
        }
    }
</script>