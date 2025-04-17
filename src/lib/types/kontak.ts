import { z } from "zod";

export const kontakSchema = z.object({
	name: z
		.string()
		.min(5, { message: "Name must be at least 5 characters long" }),
	email: z.string().email(),
	subject: z
		.string()
		.min(5, { message: "Subject must be at least 5 characters long" }),
	phone: z.string(),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters long" }),
});
export type kontakType = keyof z.infer<typeof kontakSchema>;
export const formInput = Object.keys(kontakSchema.shape) as kontakType[];
