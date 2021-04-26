<script lang="ts">
  import { getContext, setContext, onMount } from 'svelte';
  setContext('tabs', []);
  let shenanigans: string[] = getContext<string[]>('tabs');
</script>
<div class="tabs">
  {JSON.stringify(shenanigans)}
  <slot></slot>
</div>