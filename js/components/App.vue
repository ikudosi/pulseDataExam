<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <div id="patient-list-container" class="col-xs-12 col-md-4">
                <patient-list></patient-list>
            </div>
            <div class="col-xs-12 col-md-8">
                <div class="row">
                    <div class="graph-container col">
                        <creatinine-chart title="Chart of Creatinine Values"></creatinine-chart>
                    </div>
                </div>
                <div class="row">
                    <div class="graph-container col">
                        <diagnosis-chart title="Chart of Top 10 ICD Codes"></diagnosis-chart>
                    </div>
                </div>
                <div class="row">
                    <div id="patient-icd-codes-container" class="col">
                        <patient-icd-codes></patient-icd-codes>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PatientList from './PatientList.vue';
    import PatientIcdCodes from './PatientIcdCodes.vue';
    import CreatinineChart from './CreatinineChart.vue';
    import DiagnosisChart from './DiagnosisChart.vue';

    export default {
        components: {
            PatientList, PatientIcdCodes, CreatinineChart, DiagnosisChart
        }
    }
</script>

<style scoped>
    #patient-list-container{
        height: 100vh;
        overflow-y: auto;
    }
    #patient-icd-codes-container{
        height: 30vh;
        overflow-y: auto;
    }
    .graph-container{
        height: 35vh;
        overflow-x: auto;
    }
</style>