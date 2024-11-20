<script lang="ts">
	import { sampleData } from "$lib/assets/data/sample.json";
	import { CircleLayer, GeoJSONSource, MapLibre } from "svelte-maplibre-gl";
</script>

<!-- 文字の色を変える -->
<h1 class="text-4xl text-red-600">Map</h1>
<div class="h-full w-screen">
	<MapLibre
		class="h-[60vh] min-h-[300px]"
		style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
		zoom={5}
		center={{ lng: 137, lat: 36 }}
	>
		<GeoJSONSource id="sample-source" data={sampleData}>
			<CircleLayer
				paint={{
					"circle-radius": 8,
					"circle-color": "#ff0000",
					"circle-stroke-width": 1,
					"circle-stroke-color": "#ffffff",
				}}
			/>
		</GeoJSONSource>
	</MapLibre>
</div>
