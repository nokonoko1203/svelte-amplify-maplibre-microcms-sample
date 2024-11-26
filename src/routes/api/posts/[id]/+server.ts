import { getPostDetail } from "$lib/cms/client";
import { error, json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
	const { id } = params;

	if (!id) {
		throw error(400, "ID is required");
	}

	const post = await getPostDetail(id);

	if (!post) {
		throw error(404, "Post not found");
	}

	return json(post);
};
