export const getStoryFromFormData = (data: FormData) => {
	return {
		title: data.get("story-title")?.toString() ?? "",
		content: data.get("story-content")?.toString() ?? "",
		image_url: data.get("story-image_url")?.toString() ?? null,
		type: data.get("story-type") as "long" | "short",
		status: data.get("story-status") as "draft" | "published",
		difficulty: Number.parseInt(
			data.get("story-difficulty")?.toString() ?? "1",
		),
		estimated_time: data.get("story-estimated_time")?.toString() ?? null,
		area: data.get("story-area")?.toString() ?? "",
		latitude: Number.parseFloat(data.get("story-latitude")?.toString() ?? "0"),
		longitude: Number.parseFloat(
			data.get("story-longitude")?.toString() ?? "0",
		),
		radius: Number.parseInt(data.get("story-radius")?.toString() ?? "0"),
		pin_class: data.get("story-pin_class")?.toString() ?? null,
	};
};
