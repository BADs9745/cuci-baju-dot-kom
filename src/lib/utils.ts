import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function GetFormDatas<FormType>(formdata: FormData) {
	let data = {};
	for (const [key, value] of formdata.entries()) {
		data = { ...data, [key]: value };
	}
	return data as FormType;
}

export function tw(cn: TemplateStringsArray): string {
	return cn.toString();
}
