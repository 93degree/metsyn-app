<script lang="ts">
    import { onMount } from "svelte";
    import type { Threshold, Data, Sex } from "../types";
    export let thresholds: Threshold[];
    export let data: Data;
    export let show: boolean;
    export let sex: Sex;
    export let intervention_index: number;

    let _sex: Sex = "male";
    let _data: Data = {
        "Fasting Glucose": null,
        "Waist Circumference": null,
        "HDL Cholesterol": null,
        Triglycerides: null,
        "Blood Pressure (SBP)": null,
    };
    let error = {};

    onMount(() => {
        if (!data)
            _data = {
                "Fasting Glucose": 117,
                "Waist Circumference": 108,
                "HDL Cholesterol": 60,
                Triglycerides: 143,
                "Blood Pressure (SBP)": 142,
            };
    });
</script>

<div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true" />
        <section
            class="absolute inset-y-0 pl-16 max-w-full right-0 flex"
            aria-labelledby="slide-over-heading">
            <div class="w-screen max-w-md">
                <div
                    class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                    <div class="flex-1 h-0 overflow-y-auto">
                        <div class="py-6 px-4 bg-indigo-700 sm:px-6">
                            <div class="flex items-center justify-between">
                                <h2
                                    id="slide-over-heading"
                                    class="text-lg font-medium text-white">
                                    New Patient
                                </h2>
                                <div class="ml-3 h-7 flex items-center">
                                    <button
                                        on:click={() => (show = false)}
                                        class="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                        <span class="sr-only">Close panel</span>
                                        <!-- Heroicon name: x -->
                                        <svg
                                            class="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="mt-1">
                                <p class="text-sm text-indigo-300">
                                    Get started by filling in the patient
                                    information.
                                </p>
                            </div>
                        </div>
                        <div class="flex-1 flex flex-col justify-between">
                            <div class="px-4 divide-y divide-gray-200 sm:px-6">
                                <fieldset class="pt-6 pb-5">
                                    <div>
                                        <legend
                                            class="text-sm font-medium text-gray-900">
                                            Sex
                                        </legend>
                                        <p class="text-xs text-gray-500">
                                            Determines the Metabolic Syndrome
                                            thresholds
                                        </p>
                                    </div>
                                    <div class="mt-4 flex flex-row space-x-4">
                                        <div class="flex items-center">
                                            <input
                                                bind:group={_sex}
                                                value="male"
                                                id="sex_male"
                                                name="sex"
                                                type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                            <label
                                                for="sex_male"
                                                class="ml-3 block text-sm font-medium text-gray-700">
                                                Male
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                bind:group={_sex}
                                                value="female"
                                                id="sex_female"
                                                name="sex"
                                                type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                            <label
                                                for="sex_female"
                                                class="ml-3 block text-sm font-medium text-gray-700">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="space-y-6 pt-5 pb-5">
                                    {#each thresholds as d}
                                        <div>
                                            <label
                                                for={d.name}
                                                class="block text-sm font-medium text-gray-700">{d.name}</label>
                                            <div
                                                class="mt-1 relative rounded-md shadow-sm">
                                                <input
                                                    bind:value={_data[d.name]}
                                                    type="number"
                                                    name={d.name}
                                                    id={d.name}
                                                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-16 sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="0"
                                                    aria-describedby={d.units} />
                                                <div
                                                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <span
                                                        class="text-gray-500 sm:text-sm"
                                                        id={d.units}>
                                                        {d.units}
                                                    </span>
                                                </div>
                                            </div>
                                            {#if error && error[d.name] && _data[d.name] == null}
                                                <p
                                                    class="mt-2 text-sm text-red-600"
                                                    id="email-error">
                                                    {d.name}
                                                    is required.
                                                </p>
                                            {/if}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-shrink-0 px-4 py-4 flex justify-end">
                        <button
                            on:click={() => (show = false)}
                            type="button"
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </button>
                        <button
                            on:click={() => {
                                let first_error = null;
                                Object.keys(_data).forEach((k) => {
                                    error[k] = _data[k] == null;
                                    if (error[k] && !first_error) first_error = k;
                                });

                                if (Object.values(error).some((d) => d)) {
                                    document
                                        .getElementById(first_error)
                                        .focus();
                                } else {
                                    sex = _sex;
                                    data = _data;
                                    intervention_index = 0;
                                    show = false;
                                }
                            }}
                            class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
