<script lang="ts">
  import { setContext, getContext, onMount } from 'svelte';
  export let header: string = '';
  const something = getContext<string[]>('tabs');
  setContext('tabs', [...something, header]);
  console.log(something.length);
</script>
<slot></slot>