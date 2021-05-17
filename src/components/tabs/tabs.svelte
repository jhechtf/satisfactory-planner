<script lang="ts" context="module">
  import type { Writable } from 'svelte/store';
  export interface TabsContext {
    addTab(tab: string): number;
    currentTab: Writable<number>;
    setCurrentTab(current: number): void;
  }
</script>
<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  let tabs: string[] = [];
  export let currentTab = 0;
  let tabStore = writable(currentTab);
  setContext('tabs', {
    addTab: (tab: string) => {
      tabs = [...tabs, tab];
      return tabs.length - 1;
    },
    currentTab: tabStore,
    setCurrentTab(current: number) {
      currentTab= current;
      this.currentTab.update(() => current);
    }
  });

</script>

<style>
  .active-tab {
    font-weight: bold;
    @apply border-b-4 border-blue-400;
  }
</style>
<div class="tabs">
  <div class="tab-header text-lg flex items-stretch">
    {#each tabs as tab, index}
      <div on:click={() => tabStore.update(() => index)} class="py-1 px-2" class:ml-1={index !== 0} class:active-tab={$tabStore === index} data-index={index}>
        {tab}
      </div>
    {/each}
  </div>
  <div class="tab-body">
    <slot></slot>
  </div>
</div>