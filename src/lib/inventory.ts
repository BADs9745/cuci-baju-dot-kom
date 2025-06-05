"use server";
import "server-only";
import { prisma } from "./prisma";
import type { z } from "zod";
import type { InventoryItemSchema } from "./types/inventory";
import { revalidatePath } from "next/cache";

async function GetAllInventory() {
	return await prisma.inventory.findMany();
}

async function AddInvetoryItem(data: z.infer<typeof InventoryItemSchema>) {
	const { desc, name, qty } = data;
	const item = await prisma.inventory.create({
		data: {
			name,
			desc,
			qty,
		},
		select: {
			name: true,
		},
	});
	revalidatePath("/manage/inventory");
	return item.name;
}

async function DeleteItemById(id: string) {
	async function Delete(id: string) {
		return await prisma.inventory.delete({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
			},
		});
	}
	let res: Awaited<ReturnType<typeof Delete>> | null;
	try {
		res = await Delete(id);
		revalidatePath("/manage/inventory");
	} catch (error) {
		if (error) {
		}
		res = null;
	}
	return res?.name;
}

export { GetAllInventory, AddInvetoryItem, DeleteItemById };
