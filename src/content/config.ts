import { defineCollection, z } from "astro:content";

const photos = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { photos };