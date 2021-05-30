<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { TabsContext } from './tabs.svelte';
  export let header: string = '';
  export let id = header;
  const { addTab, currentTab, removeTab } = getContext<TabsContext>('tabs');
  // let currentTab: string = '';
  onMount(() => {
    addTab(id, header);
    return () => {
      removeTab(id);
    }
  });

</script>
{#if id == $currentTab}
<slot></slot>
{/if}
