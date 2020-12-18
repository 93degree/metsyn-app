<script lang="ts">
	import type { Data, Sex, Intervention } from "./types";
	import { interventions, thresholds } from "./data";

	import Tailwindcss from "./Tailwindcss.svelte";
	import Header from "./components/Header.svelte";
	import Interventions from "./components/Interventions.svelte";
	import RadarChart from "./components/RadarChart.svelte";
	import Statistics from "./components/Statistics.svelte";
	import SidePanel from "./components/SidePanel.svelte";

	let data: Data = null;
	let show = true;
	let sex: Sex = null;
	let intervention: Intervention;
	let intervention_index = 0;
</script>

<Tailwindcss />
<div class="min-h-screen bg-gray-100">
	<Header bind:show />

	<main class="p-10">
		{#if data}
			<div
				class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-7">
				<Statistics {thresholds} {data} {sex} {intervention} />
				<div
					class="grid grid-cols-1 space-y-7 lg:grid-cols-2 lg:space-x-7 lg:space-y-0 items-stretch justify-between">
					<div
						class="bg-white overflow-hidden shadow rounded-lg px-6 pt-6 pb-2 flex flex-col h-96 lg:h-auto">
						<div class="flex-auto">
							<RadarChart
								{thresholds}
								{data}
								{sex}
								{intervention} />
						</div>
						<div class="flex-none pt-1">
							<p class="text-xs text-gray-400">
								* Thresholds correspond to NCEP-R (2004)
								criterion for
								{sex}
								patients.
							</p>
						</div>
					</div>
					<div class="flex-grow">
						<div class="pb-5">
							<h3
								class="text-lg leading-6 font-medium text-gray-900">
								Interventions
							</h3>
						</div>
						<Interventions
							{interventions}
							bind:intervention
							bind:intervention_index />
					</div>
				</div>
			</div>
		{/if}
		{#if show}
			<SidePanel
				{thresholds}
				bind:show
				bind:data
				bind:sex
				bind:intervention_index />
		{/if}
	</main>
</div>
