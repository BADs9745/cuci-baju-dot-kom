import { z } from "zod";

const InventoryItemSchema = z.object({
	name: z.string().min(5, "Minimal 5 karakter"),
	desc: z.string().min(10, "Deskripsi minimal 10 karakter"),
	qty: z.number(),
});

export { InventoryItemSchema };
