<template>
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th scope="col" style="min-width: 150px;">Date</th>
                <th scope="col" style="min-width: 150px;">ICD Code</th>
                <th scope="col">Description</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patientDiagnosis" :key="patient.id">
            <td>{{ patient.date }}</td>
            <td>{{ patient.icd_code_id }}</td>
            <td>{{ patient.icd_description }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import xhr from "axios";

    export default {
        data() {
            return {
                patientDiagnosis: []
            }
        },

        computed: {
            selectedPatient() {
                return this.$store.state.selectedPatient;
            }
        },

        watch: {
            selectedPatient(newPatient) {
                this.getPatientDiagnosis(newPatient);
            }
        },

        methods: {
            /**
             * Fetches the patient's diagnosis and then maps the diagnosis code information at the end
             */
            getPatientDiagnosis(newPatient) {
                xhr.get(`http://localhost:3000/diagnosis?patient_id=${newPatient.id}&_sort=date&_order=desc`)
                    .then((response) => {
                        this.$store.commit('updateSelectedPatientDiagnosis', response.data);
                        this.mapDiagnosisToIcdCodes(response.data);
                    });
            },

            /**
             * Method to an API call to get the icd codes pertaining to all of the patient's diagnosis.
             *
             * @param diagnosis
             * @returns {AxiosPromise<any>}
             */
            getPatientIcdCodesFromDiagnosis(diagnosis) {
                let ids = diagnosis.map(v => v.icd_code_id);
                return xhr.get(`http://localhost:3000/icd_codes?id=${ids.join("&id=")}`);
            },

            /**
             * This will take the patient's diagnosis, fetch all related icd codes pertaining
             * to the diagnosis and then join the data all together. The final product will
             * eventually update this component's data.
             *
             * @param diagnosis
             */
            mapDiagnosisToIcdCodes(diagnosis) {
                this.getPatientIcdCodesFromDiagnosis(diagnosis).then(response => {
                    this.patientDiagnosis = diagnosis.map(d => {
                        let icdCode = response.data.filter(c => {
                            return c.id === d.icd_code_id
                        });
                        return Object.assign(d, {icd_description: icdCode[0].description});
                    });
                })
            }
        }
    }
</script>