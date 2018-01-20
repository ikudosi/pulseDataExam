<template>
    <div :id="containerId"></div>
</template>

<script>
    let Plotly = require('plotly.js');
    import xhr from 'axios';

    export default {
        props: {
            title: {
                default: "",
                type: String
            }
        },

        data() {
            return {
                containerId: `chart_${this._uid}`,
                chartData: [],
                componentApiUrl: ""
            }
        },

        computed: {
            selectedPatient() {
                return this.$store.state.selectedPatient;
            }
        },

        watch: {
            selectedPatient(newValue) {
                this.getChartData(newValue);
            },

            chartData(newValue) {
                Plotly.newPlot(this.containerId, newValue, {title:this.title});
            }
        },

        methods: {
            processChartData(response) {},

            setChartData(data) {
                this.$set(this, 'chartData', [data]);
            },

            getChartData(selectedPatient) {
                if (!this.componentApiUrl) {
                    return;
                }

                xhr.get(`${this.componentApiUrl}${selectedPatient.id}`)
                    .then(response => {
                        this.processChartData(response);
                    });
            }
        }
    }
</script>

<style scoped>

</style>