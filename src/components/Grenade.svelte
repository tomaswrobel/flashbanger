<script lang="ts" module>
	import type { SVGAttributes } from "svelte/elements";

	export interface Props extends SVGAttributes<SVGSVGElement> {
		viewBox?: undefined;
		xmlns?: undefined;
	}
</script>

<script lang="ts">
	const {children, ...props}: Props = $props();
	const id = $props.id();
</script>

{#snippet holes(x: number, y: number)}
	<g transform="translate({x} {y})" fill="black">
		<circle cx="565" cy="527" r="44" />
		<circle cx="685" cy="527" r="44" />
	</g>
{/snippet}

{#snippet platform(x: number, y: number)}
	<rect
		{x}
		{y}
		width="395"
		height="142"
		rx="42"
		ry="42"
		class="fill-md-light-surface-3 dark:fill-md-dark-surface-3"
	/>
{/snippet}

<svg {...props} viewBox="213 109.2 568.77 950.12">
	<defs>
		<mask id="clip-{id}">
			<rect x="169.63" width="100%" height="100%" fill="white" />

			{@render holes(-85, 3)}
			{@render holes(-85, 153)}
			{@render holes(-85, 303)}
		</mask>
	</defs>
	<path
		d="m178.23 517.11c-11-14-11.276-26.492-1.9349-75.899 15.825-83.699 50.045-156.29 93.59-198.53 21.488-20.195 50.266-40.466 74.679-51.982 20.655-9.0556 57.207-18.452 67.137-17.259 2.6313 0.31601 5.0168 0.221 5.3012-0.20957 0.28441-0.43126 1.9732-0.6332 3.7528-0.44873 3.4347 0.35599 4.6112-1.1625 5.9159-7.6354 7.5745-37.578 36.718-54.413 94.428-54.547 16.603-0.0387 37.705-0.1956 46.893-0.34861 9.1879-0.15301 22.014-0.34243 28.502-0.42092 6.4884-0.0785 24.287-0.33333 39.553-0.5663 35.148-0.5364 44.863 1.9808 53.672 13.907 3.7862 5.126 9.5009 25.582 7.646 27.368-0.27933 0.26916-0.90119 2.7493-1.3817 5.5114-2.0558 11.818-14.334 23.672-27.941 26.977-6.2809 1.5252-6.2809 1.5252-6.1442 19.884 0.0754 10.098 0.0902 19.32 0.0334 20.494-0.0848 1.7564-11.833 2.2673-66.253 2.8812-151.97 1.7146-182.35 2.285-185.12 3.4758-3.3814 1.4522-7.9868 7.7379-8.2742 11.293-0.15624 1.9322-1.2243 2.7827-5.0866 4.0504-71.785 23.561-136.42 127.04-150.69 241.25-5.1103 40.903-45.896 59.271-68.273 30.747z"
		class="fill-md-light-surface-3 dark:fill-md-dark-surface-3"
		stroke-width="1.154"
	/>
	<g transform="matrix(1.1745 0 0 .99262 -181.7 9.5566)">
		<path
			d="m503.97 210.79c-5.5667 0-10.047 4.4821-10.047 10.049v54.78c0 0.0357 9e-3 0.0686 0.01 0.10428h-0.01v13.886h242.66v-13.886h-0.01c3.6e-4 -0.0356 0.01-0.0685 0.01-0.10428v-54.78c0-5.5667-4.4821-10.049-10.049-10.049z"
			class="fill-md-light-primary dark:fill-md-dark-primary"
		/>
	</g>
	<circle class="fill-gray-300" cx="400" cy="200" r="10" />
	{@render platform(343, 297)}
	{@render platform(343, 917)}
	<path
		d="m398.4 439.1h285v480.52h-285z"
		class="fill-md-light-primary dark:fill-md-dark-primary"
		mask="url(#clip-{id})"
	/>
	{@render children?.()}
</svg>
