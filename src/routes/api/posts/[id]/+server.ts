import { getPostDetail } from "$lib/cms/cms-client.server";
import { error, json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
	const { id } = params;

	if (!id) {
		throw error(400, "ID is required");
	}

	try {
		const post = await getPostDetail(id);

		if (!post) {
			throw error(404, "Post not found");
		}

		return json(post);
	} catch (e) {
		throw error(
			500,
			e instanceof Error ? e.message : "An unknown error occurred",
		);
	}
};
