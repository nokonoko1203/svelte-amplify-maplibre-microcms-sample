import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

import { env } from "$env/dynamic/private";
import type { Post } from "./types";

let client: ReturnType<typeof createClient> | undefined = undefined;
const getClient = () => {
	console.log("env.SERVICE_DOMAIN", env.SERVICE_DOMAIN);
	console.log("env.MICROCMS_API_KEY", env.MICROCMS_API_KEY);
	if (client) return client;
	client = createClient({
		serviceDomain: env.SERVICE_DOMAIN ?? "",
		apiKey: env.MICROCMS_API_KEY ?? "",
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
