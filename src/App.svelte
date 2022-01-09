<script lang="ts">
	import Filter from './Filter.svelte';

	export const name = "ManageBac Class Roster Filter Demo";
  </script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
  </style>
  
  <main>
	<div class="mb-10">{name}</div>
	<Filter />
  </main>