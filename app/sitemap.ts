import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://prettier-config-generator.nooobtimex.me/",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
