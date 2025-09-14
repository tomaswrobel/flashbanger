import { mount } from "svelte";
import App from "./components/App.svelte";
import "./css/style.css";

const app = mount(App, {
	target: document.body.appendChild(document.createElement("div")),
});

export default app;
