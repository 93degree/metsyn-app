<script lang="ts">
    import type { Threshold, Data, Sex, Intervention } from "../types";

    export let thresholds: Threshold[];
    export let data: Data;
    export let sex: Sex;
    export let intervention: Intervention;

    let stats = [];
    $: if (intervention && data)
        stats = thresholds.map((d) => ({
            name: d.name,
            units: d.units,
            value: data[d.name],
            diff: Math.round((100 * intervention[d.name]) / data[d.name]),
            risk: d.upper ? data[d.name] >= d[sex] : data[d.name] < d[sex],
        }));
</script>

<div>
    <dl
        class="grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200  md:grid-cols-5 md:divide-y-0 md:divide-x divide-gray-400">
        {#each stats as d}
            <div class:bg-red-100={d.risk}>
                <div class="px-4 py-5 sm:p-6">
                    <dt class="text-base font-normal text-gray-900 truncate">
                        {d.name}
                    </dt>
                    <dd
                        class="mt-1 flex justify-between items-baseline md:block lg:flex">
                        <div
                            class="flex items-baseline text-2xl font-semibold text-indigo-600">
                            {d.value}
                            <span
                                class="mx-2 text-sm font-medium text-gray-500">
                                {d.units}
                            </span>
                        </div>

                        <div
                            class:invisible={!d.diff && d.diff == 0}
                            class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                            <svg
                                class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true">
                                {#if d.diff < 0}
                                    <path
                                        fill-rule="evenodd"
                                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                {:else}
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                {/if}
                            </svg>
                            {#if d.diff < 0}
                                <span class="sr-only"> Decreased by </span>
                            {:else if d.diff > 0}
                                <span class="sr-only"> Increased by </span>
                            {/if}
                            {Math.abs(d.diff)}%
                        </div>
                    </dd>
                </div>
            </div>
        {/each}
    </dl>
</div>
