<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { TabsContext } from './tabs.svelte';
  /** @description the header that will appear in the */
  export let header: string = '';
  const tabsContext = getContext<TabsContext>('tabs');
  let tabIndex = -1;
  let currentTab = -1;
  onMount(() => {
    tabIndex = tabsContext.addTab(header);
    const unsub = tabsContext.currentTab.subscribe(($tab: number) => {
      currentTab = $tab;
    })
    return () => {
      unsub()
    };
  });
</script>

{#if currentTab === tabIndex}
  <slot></slot>
{/if}