"use server";
import "server-only";

import { createCipheriv, createDecipheriv, createHash } from "node:crypto";

export async function Hash(string: string) {
	return createHash("sha256").update(string).digest("base64");
}

const key = "vwpP5A5u98RX9/QbCPpLzw==";
const iv = "v7Si/vLL78/31tZlz2383w==";

export async function Cipher(string: string) {
	const cipher = createCipheriv(
		"aes-128-ctr",
		Buffer.from(key, "base64"),
		Buffer.from(iv, "base64"),
	);

	return cipher.update(string, "utf8", "base64") + cipher.final("base64");
}

export async function Decipher(string: string) {
	const decipher = createDecipheriv(
		"aes-128-ctr",
		Buffer.from(key, "base64"),
		Buffer.from(iv, "base64"),
	);
	return decipher.update(string, "base64", "utf8") + decipher.final("utf8");
}
