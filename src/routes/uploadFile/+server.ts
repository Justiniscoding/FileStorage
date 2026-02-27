import { parseFile } from "$lib/file.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }): Promise<Response> {
	const data = await request.formData();
	const file = data.get('file') as File;
	if (file) {
		const fileData = await parseFile(file);
		return json(fileData, { status: 201 });
	}
	return json({ success: "false" })
}
