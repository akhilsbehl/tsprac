<script>
    import { onMount } from 'svelte';

    export let joke;

    let fetchJoke = async () => {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = await response.json();
            joke = data.joke;

        } catch (error) {
            joke = 'The joke store called and they are running out of you!';
        };
    };

    onMount(() => fetchJoke())

</script>

<main>
    <h3>Here is your bloody joke!</h3>
    <div class="jokebox">
        <h1>{joke}</h1>
    </div>
    <button on:click={fetchJoke}>Get another joke</button>
</main>

<style>
    main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    }

    .jokebox {
    min-height: 240px;
    max-height: 240px;
    margin-top: 3em;
    margin-bottom: 5em;
    margin-left: 10em;
    margin-right: 10em;
    }

    h1 {
    color: #936ed4;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: bolder;
    }

    h3 {
    color: #936ed4;
    font-size: 2em;
    font-weight: normal;
    margin: 4em;
    }

    button {
    background-color: #936ed4;
    border: none;
    color: white;
    padding: 1em;
    margin-top: 1em;
    font-size: 1em;
    }

    @media (min-width: 640px) {
    main {
    max-width: none;
    }
</style>
