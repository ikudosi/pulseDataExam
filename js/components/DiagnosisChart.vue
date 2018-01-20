<script>
    import BaseChart from './base/Chart.vue';

    export default {
        extends: BaseChart,

        props: {
            filterLimit: {
                type: Number,
                default: 10
            }
        },

        data() {
            return {
                topDiagnosis: []
            }
        },

        computed: {
            /**
             * I could've just made another API call but since the base data for this component
             * has already been retrieved from the patient icd codes component... why not just re-use via store?
             */
            selectedPatientDiagnosis() {
                return this.$store.state.selectedPatientDiagnosis;
            }
        },

        watch: {
            selectedPatientDiagnosis(newValue) {
                this.setTopDiagnosis(newValue);
                this.processChartData(newValue);
            }
        },

        methods: {
            /**
             * This will go through the patient's diagnosis and then determine
             * the top 10 diagnosis codes found.
             *
             * @param patientDiagnosis
             */
            setTopDiagnosis(patientDiagnosis) {
                let diagnosisCount = {};
                let topDiagnosis = [];

                // Create an object that has the key of the icd and the count of occurrences as the value.
                patientDiagnosis.forEach(data => {
                    if (typeof diagnosisCount[data.icd_code_id] === "undefined" ) {
                        diagnosisCount[data.icd_code_id] = 1;
                    } else {
                        diagnosisCount[data.icd_code_id] += 1;
                    }
                });

                // Iterate through the count of icds and push to an array so that we may sort the data by occurrences.
                for (let prop in diagnosisCount) {
                    topDiagnosis.push([diagnosisCount[prop], prop]);
                }

                topDiagnosis.sort(function(a, b){ return b[0] - a[0] });

                // Take the top x occurrences of diagnosis codes.
                this.topDiagnosis = topDiagnosis.slice(0, this.filterLimit);
            },

            /**
             * Override the parent method to set the chart data as we are not doing an xhr.
             */
            processChartData() {
                let chartData = {
                    x: [],
                    y: [],
                    type: 'bar'
                };

                this.topDiagnosis.forEach(data => {
                    chartData.x.push(data[1]);
                    chartData.y.push(data[0]);
                });

                this.setChartData(chartData);
            }
        }
    }
</script>