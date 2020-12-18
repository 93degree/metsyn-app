<script lang="ts">
    import type { Intervention } from "../types";

    export let interventions: Intervention[];
    export let intervention: Intervention;
    export let intervention_index: number;
    $: intervention = interventions[intervention_index];
</script>

<fieldset>
    <legend id="radiogroup-label" class="sr-only">Intervention</legend>
    <ul class="space-y-4" role="radiogroup" aria-labelledby="radiogroup-label">
        {#each interventions as d, i}
            <li
                on:click={(x) => (intervention_index = i)}
                id={`radiogroup-option-${i}`}
                tabindex={i == intervention_index ? 0 : -1}
                role="radio"
                aria-checked={i == intervention_index}
                class="relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-500">
                <div
                    class="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
                    <div class="flex items-center">
                        <div class="text-sm">
                            <p class="font-medium text-gray-900">{d.name}</p>
                            <div
                                class:invisible={d.name === 'None'}
                                class="text-gray-500 inline-flex">
                                <p class="sm:inline">{d.type}</p>
                                <span
                                    class="hidden sm:inline sm:mx-1"
                                    aria-hidden="true">&middot;</span>
                                <a
                                    href={d.link}
                                    target="_blank"
                                    class="group hidden sm:flex items-center text-sm text-gray-500 hover:text-gray-900 hover:underline">
                                    More info
                                    <svg
                                        class="flex-shrink-0 ml-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path
                                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path
                                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- On: "border-green-500", Off: "border-transparent" -->
                <div
                    class:border-green-500={i === intervention_index}
                    class:border-transparent={i !== intervention_index}
                    class="border-transparent absolute inset-0 rounded-lg border-2 pointer-events-none"
                    aria-hidden="true" />
            </li>
        {/each}
    </ul>
</fieldset>
