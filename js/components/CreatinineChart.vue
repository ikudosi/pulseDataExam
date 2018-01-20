<script>
    import BaseChart from './base/Chart.vue';

    export default {
        extends: BaseChart,

        data() {
            return {
                componentApiUrl: `http://localhost:3000/labs?patient_id=`
            }
        },

        methods: {
            /**
             * This will override the parent method to set the chart data
             */
            processChartData(response) {
                let chartData = {
                    x: [],
                    y: [],
                    type: 'scatter'
                };

                response.data.forEach(data => {
                    chartData.x.push(data.date);
                    chartData.y.push(data.value);
                });

                this.setChartData(chartData);
            }
        }
    }
</script>