<script lang="ts">
  import { onMount } from 'svelte';
  import { Game } from './game';

  export let data;
  let game: Game;

  let currentGuess = '';
  let badGuess = false;
  let won = false;

  onMount(() => {
    game = data?.game;
    updateDerived();
  });

  function updateDerived() {
    const i = game.answers.length;
    currentGuess = game.guesses[i] ?? '';
    won = game.answers.at(-1) === 'xxxxx';
  }

  function pressKey(key: string) {
    if (won) return;

    game.updateKey(key);
    persist();
    updateDerived();
  }

  function submit() {
    const ok = game.enterGuess();

    if (!ok) {
      badGuess = true;
      return;
    }

    badGuess = false;
    persist();
    updateDerived();
  }

  function restart() {
    game = game.restart();
    persist();
    updateDerived();
  }

  function persist() {
    localStorage.setItem('sverdle', game.toString());
  }

  function keydown(e: KeyboardEvent) {
    if (e.key === 'Enter') submit();
    if (e.key === 'Backspace') pressKey('backspace');

    if (/^[a-z]$/.test(e.key)) pressKey(e.key);
  }
</script>

<svelte:window on:keydown={keydown} />

<h1>Sverdle (Client-Side)</h1>

<div class="grid" class:bad={badGuess}>
  {#each Array.from({ length: 6 }) as _, row}
    <div class="row">
      {#each Array.from({ length: 5 }) as _, col}
        {@const guess = game.guesses[row]}
        {@const val = guess?.[col] ?? ''}
        {@const answer = game.answers[row]?.[col]}

        <div class="cell {answer}">
          {val}
        </div>
      {/each}
    </div>
  {/each}
</div>

<div class="controls">
  {#if won}
    <p>🎉 Du hast gewonnen!</p>
    <button on:click={restart}>Neu starten</button>
  {:else if game.answers.length >= 6}
    <p>Spiel vorbei! Lösung: {game.answer}</p>
    <button on:click={restart}>Neu starten</button>
  {:else}
    <button on:click={submit}>Enter</button>
    <div class="keyboard">
      {#each ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'] as row}
        <div class="row">
          {#each row.split('') as letter}
            <button on:click={() => pressKey(letter)}>
              {letter}
            </button>
          {/each}
        </div>
      {/each}
      <button on:click={() => pressKey('backspace')}>Back</button>
    </div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    gap: 0.3rem;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(5, 2.5rem);
    gap: 0.3rem;
  }
  .cell {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #444;
    font-weight: bold;
    text-transform: uppercase;
  }
  .x {
    background: green;
    color: white;
  }
  .c {
    background: orange;
    color: white;
  }
  ._ {
    background: #ddd;
  }
  .controls {
    margin-top: 1rem;
  }
</style>
