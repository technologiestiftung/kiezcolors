import { c as create_ssr_component } from "../../chunks/index2.js";
const app = "";
const styles = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"app"}"><header></header>

	<main>${slots.default ? slots.default({}) : ``}</main>

	<footer></footer>
</div>`;
});
export {
  Layout as default
};
