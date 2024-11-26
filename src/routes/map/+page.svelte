<script lang="ts">
	import icon from "$lib/assets/data/icon.png";
	import maplibregl from "maplibre-gl";
	import { onMount } from "svelte";
	import { GeoJSONSource, MapLibre, SymbolLayer } from "svelte-maplibre-gl";

	let map: maplibregl.Map | undefined = $state.raw();
	let markerLnglat = $state({ lng: 139.767052, lat: 35.681167 });

	onMount(() => {
		map?.on("load", () => {
			const image = new Image();
			image.src = icon;
			image.onload = () => map?.addImage("icon", image);
		});
	});

	const handlePopup = (e: maplibregl.MapMouseEvent) => {
		new maplibregl.Popup()
			.setLngLat(e.lngLat)
			.setHTML(
				`<p class="text-xl">${e.lngLat.lat.toFixed(3)}, ${e.lngLat.lng.toFixed(3)}</p>`,
			)
			.addTo(map!);
	};
</script>

<h1 class="text-4xl text-red-600">日記やで</h1>
<div class="h-full w-screen">
	<MapLibre
		bind:map
		class="h-[60vh] min-h-[300px]"
		style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
		zoom={5}
		center={{ lng: 137, lat: 36 }}
	>
		<GeoJSONSource id="sample-source" data="src/lib/assets/data/sample.json">
			<SymbolLayer
				onclick={(e) => handlePopup(e)}
				id="sample-layer"
				layout={{
					"icon-image": "icon",
					"icon-size": 0.75,
				}}
			></SymbolLayer>
		</GeoJSONSource>
	</MapLibre>
</div>
