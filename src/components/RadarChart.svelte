<script lang="ts">
    import type { Threshold, Data, Sex, Intervention, Feature } from "../types";
    import Chart from "chart.js";
    import { onMount } from "svelte";
    export let thresholds: Threshold[];
    export let data: Data;
    export let sex: Sex;
    export let intervention: Intervention;

    let canvas;
    let chart = null;

    $: normalize_funs = thresholds.reduce((obj, t) => {
        if (t.upper) {
            obj[t.name] = (x) => (x - t.min) / (t.max - t.min);
        } else {
            obj[t.name] = (x) => 1 - (x - t.min) / (t.max - t.min);
        }
        return obj;
    }, {});

    // Thresholds
    const threshold_encoding = {
        label: "Thresholds*",
        backgroundColor: "transparent",
        borderColor: "#4B5563",
        borderDash: [8, 2],
        borderWidth: 2,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverRadius: 3,
        order: 1,
    };
    let thresholds_n: number[];
    $: thresholds_n = thresholds.map((t) => normalize_funs[t.name](t[sex]));

    let threshold_id = null;
    function updateThresholds(thresholds_n) {
        if (threshold_id != null)
            chart.data.datasets[threshold_id].data = thresholds_n;
        else
            threshold_id =
                chart.data.datasets.push({
                    ...threshold_encoding,
                    data: thresholds_n,
                }) - 1;

        chart.update();
    }

    $: if (chart) updateThresholds(thresholds_n);

    // Patient
    const patient_encoding = {
        label: "Patient",
        backgroundColor: "#8B5CF622",
        borderColor: "#8B5CF6",
        pointHoverRadius: 3,
        order: 2,
    };

    let patient_n: number[];
    $: if (data)
        patient_n = thresholds.map((t) => normalize_funs[t.name](data[t.name]));

    let patient_id = null;
    function updatePatient(patient_n) {
        console.log("UPDATE PATIENT");
        if (patient_id != null)
            chart.data.datasets[patient_id].data = patient_n;
        else
            patient_id =
                chart.data.datasets.push({
                    ...patient_encoding,
                    data: patient_n,
                }) - 1;

        chart.update();
    }

    $: if (chart) updatePatient(patient_n);

    // Intervention
    const intervention_encoding = {
        label: "With intervention",
        backgroundColor: "#10B98122",
        borderColor: "#10B981",
        pointHoverRadius: 3,
        order: 3,
    };

    let intervention_id = null;
    let intervention_n: number[];
    $: if (data && intervention)
        intervention_n = thresholds.map((t) =>
            normalize_funs[t.name](data[t.name] + intervention[t.name])
        );

    function updateIntervention(intervention_n) {
        console.log("UPDATE Inter");
        if (intervention_id != null) {
            if (intervention.name != "None")
                chart.data.datasets[intervention_id].data = intervention_n;
            else {
                chart.data.datasets.splice(intervention_id);
                intervention_id = null;
            }
        } else if (intervention.name != "None")
            intervention_id =
                chart.data.datasets.push({
                    ...intervention_encoding,
                    data: intervention_n,
                }) - 1;

        chart.update();
    }

    $: if (chart) updateIntervention(intervention_n);

    onMount(() => {
        chart = new Chart(canvas.getContext("2d"), {
            type: "radar",
            data: {
                labels: thresholds.map((d) => d.name),
            },
            options: {
                tooltips: {
                    enabled: false,
                },
                maintainAspectRatio: false,
                scale: {
                    ticks: {
                        display: false,
                        min: 0,
                        suggestedMax: 0.8,
                    },
                },
            },
        });

        updateThresholds(thresholds_n);
        updatePatient(patient_n);
    });
</script>

<canvas
    bind:this={canvas}
    id="radar-chart"
    aria-label="Metabolic syndrome chart"
    role="img" />
