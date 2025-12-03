import { Game } from "./game";

export const ssr = false;
export const prerender = true;

export const load = () => {
  const saved = localStorage.getItem("sverdle");
  const game = new Game(saved);

  return {
    game,
  };
};
