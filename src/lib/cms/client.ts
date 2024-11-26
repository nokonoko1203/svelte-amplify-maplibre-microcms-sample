import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

import { MICROCMS_API_KEY, SERVICE_DOMAIN } from "$env/static/private";
import type { Post } from "./types";

let client: ReturnType<typeof createClient> | undefined = undefined;
const getClient = () => {
	if (client) return client;
	client = createClient({
		serviceDomain: SERVICE_DOMAIN ?? "",
		apiKey: MICROCMS_API_KEY ?? "",
	});
	return client;
};

const getPostDetail = async (
	id: string,
	queries: MicroCMSQueries = {},
): Promise<Post | null> => {
	const client = getClient();
	try {
		return (await client.get({
			endpoint: "posts",
			contentId: id,
			queries,
		})) as Post;
	} catch {
		return null;
	}
};

export { getPostDetail };
