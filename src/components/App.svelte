<script lang="ts" module>
	import * as Konsta from "konsta/svelte";
	import Grenade from "./Grenade.svelte";
	import Ring from "./Ring.svelte";
	import type { MouseEventHandler } from "svelte/elements";
	import { flashbangSound } from "../utils/flashbangSound.ts";
	import Torch from "../utils/Torch.svelte.ts";
	import Settings from "@material-symbols/svg-400/rounded/settings-fill.svg?raw";
	import type { Snippet } from "svelte";

	let settingsOpen = $state(false);
	let useSounds = $state(true);
	let useTorch = $state(true);
	const torch = new Torch();

	const dropRing: MouseEventHandler<SVGCircleElement> = async e => {
		const ring = e.currentTarget;

		const dropAnimation = ring.animate(
			[{ translate: "0 0" }, { translate: "0 200%" }],
			{
				duration: 900,
				iterations: 1,
				fill: "forwards",
				easing: "cubic-bezier(0.42, 0, 0.58, 1)",
			}
		);
		await dropAnimation.finished;

		document.body.animate(
			[{ filter: "brightness(100%)" }, { filter: "brightness(7500%)" }],
			{
				duration: 900,
				iterations: 1,
				fill: "forwards",
				easing: "cubic-bezier(0.42, 0, 0.58, 1)",
			}
		);

		if (useTorch) {
			await torch.enable();
		}

		if (useSounds) {
			await flashbangSound(5);
		} else {
			await new Promise<void>(resolve => setTimeout(resolve, 5e3));
		}

		ring.animate([{ translate: "0 200%" }, { translate: "0 0" }], {
			duration: 1,
			iterations: 1,
			fill: "forwards",
		});

		const unflashAnimation = document.body.animate(
			[{ filter: "brightness(7500%)" }, { filter: "brightness(100%)" }],
			{
				duration: 900,
				iterations: 1,
				fill: "forwards",
				easing: "cubic-bezier(0.42, 0, 0.58, 1)",
			}
		);
		await unflashAnimation.finished;

		if (useTorch) {
			await torch.enable();
		}
	};

	function createTitle(string: unknown) {
		return { title: string as Snippet & string };
	}
</script>

<Konsta.App theme="material" class="dark" safeAreas={false}>
	<Konsta.Page class="overflow-hidden">
		<Konsta.Navbar {...createTitle("Flashbang")}>
			{#snippet right()}
				<Konsta.Button
					clear
					rounded
					class="fill-current *:size-[2em]"
					onclick={() => (settingsOpen = true)}
				>
					{@html Settings}
				</Konsta.Button>
			{/snippet}
		</Konsta.Navbar>

		<div class="flex h-full justify-center items-center">
			<Grenade class="w-3/4 max-h-[75vh] overflow-visible">
				<Ring onclick={dropRing} />
			</Grenade>
		</div>
		<Konsta.Dialog
			opened={settingsOpen}
			onBackdropClick={() => (settingsOpen = false)}
		>
			{#snippet title()}
				Settings
			{/snippet}

			<Konsta.List>
				<Konsta.ListItem label {...createTitle("Use torch")}>
					{#snippet after()}
						<Konsta.Toggle
							bind:checked={useTorch}
							disabled={torch.checkVideoInput}
						/>
					{/snippet}
				</Konsta.ListItem>

				<Konsta.ListItem label {...createTitle("Use sounds")}>
					{#snippet after()}
						<Konsta.Toggle bind:checked={useSounds} />
					{/snippet}
				</Konsta.ListItem>
			</Konsta.List>

			<Konsta.Block>
				Flashbanger does not use your camera, just its light.
			</Konsta.Block>

			{#snippet buttons()}
				<Konsta.DialogButton onclick={() => (settingsOpen = false)}>
					Close
				</Konsta.DialogButton>
			{/snippet}
		</Konsta.Dialog>
	</Konsta.Page>
</Konsta.App>
