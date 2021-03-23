<script lang="ts">
  import Navbar from './components/navbar.svelte';
  import {Router, Route} from 'yrv';
</script>

<Navbar />

<Router>
  <Route fallback>
    <div class="flex-grow">
      jimbob
    </div>
  </Route>
</Router>

<footer>
  I am the footer
</footer>