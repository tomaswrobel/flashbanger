<script lang="ts" module>
	import type { SVGAttributes } from "svelte/elements";

	export interface Props extends SVGAttributes<SVGCircleElement> {
		cx?: undefined;
		cy?: undefined;
	}
</script>

<script lang="ts">
	const props: Props = $props();
</script>

<circle
	r="60"
	fill="transparent"
	stroke-width="12"
	{...props}
	cx="400"
	cy="240"
	class={["stroke-gray-300", props.class]}
></circle>
