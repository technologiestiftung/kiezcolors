<script>
	import '../app.postcss';
	// import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<header />

	<main>
		<slot />
	</main>

	<footer>
		<!-- <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p> -->
	</footer>
</div>

<style>
</style>
