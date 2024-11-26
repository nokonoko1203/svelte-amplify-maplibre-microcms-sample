<script lang="ts">
	import icon from "$lib/assets/data/icon.png";
	import geoJson from "$lib/assets/data/sample.json";

	import maplibregl from "maplibre-gl";
	import { onMount } from "svelte";
	import { GeoJSONSource, MapLibre, SymbolLayer } from "svelte-maplibre-gl";

	let map: maplibregl.Map | undefined = $state.raw();
	let geojson = geoJson as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

	onMount(() => {
		map?.on("load", () => {
			const image = new Image();
			image.src = icon;
			image.onload = () => map?.addImage("icon", image);
		});
	});

	const fetchPostData = async (id: string) => {
		try {
			const res = await fetch(`/api/posts/${id}`);
			if (!res.ok) throw new Error("Failed to fetch post data");
			return await res.json();
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const handlePopup = async (e: maplibregl.MapLayerMouseEvent) => {
		const id = e.features?.[0]?.properties.contentId;
		if (!id) return;

		const post = await fetchPostData(id);

		if (post) {
			new maplibregl.Popup()
				.setLngLat(e.lngLat)
				.setHTML(
					`
					<div>
						<h2 class="text-xl">${post.title}</h2>
						<img src="${post.eyecatch.url}" alt="${post.title}" class="w-full h-auto" />
					</div>
				`,
				)
				.addTo(map!);
		} else {
			new maplibregl.Popup()
				.setLngLat(e.lngLat)
				.setHTML("<p>データの取得に失敗しました。</p>")
				.addTo(map!);
		}
	};
</script>

<div class="h-full w-screen">
	<MapLibre
		bind:map
		class="h-[100vh] min-h-[300px]"
		style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
		zoom={5}
		center={{ lng: 137.5, lat: 38.5 }}
	>
		<GeoJSONSource id="sample-source" data={geojson}>
			<SymbolLayer
				onclick={(e) => {
					handlePopup(e);
				}}
				id="sample-layer"
				layout={{
					"icon-image": "icon",
					"icon-size": 0.75,
				}}
			></SymbolLayer>
		</GeoJSONSource>
	</MapLibre>
</div>
