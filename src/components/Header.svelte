<script lang="ts">
    export let show;
</script>

<nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <div class="flex-shrink-0 flex items-center">
                    <img
                        class="block h-12 w-auto"
                        src="logo.jpg"
                        alt="Augment" />
                    <h1 class="px-1 ml-2 text-xl hidden md:block">
                        Metabolic Syndrome
                    </h1>
                    <h1 class="px-1 ml-2 text-xl block md:hidden">MetSyn</h1>
                </div>
            </div>

            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <button
                        on:click={() => (show = true)}
                        type="button"
                        class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg
                            class="-ml-1 mr-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>New Patient</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</nav>
