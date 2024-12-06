import { json } from "@sveltejs/kit";

export const GET = async () => {
	return json({ message: "Hello from the server!" });
};
