import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function GetFormDatas<FormType>(formdata: FormData) {
	let data = {};
	for (const [key, value] of formdata.entries()) {
		data = { ...data, [key]: value };
	}
	return data as FormType;
}

function tw(cn: TemplateStringsArray): string {
	return cn.toString();
}

type Omits<T, K extends keyof T> = Omit<T, K>;

const nthBasedBg = tw`group-nth-[1n]:bg-chart-1 group-nth-[2n]:bg-chart-2 group-nth-[3n]:bg-chart-3 group-nth-[4n]:bg-chart-4 group-nth-[5n]:bg-chart-5`;

export { nthBasedBg, tw, cn, GetFormDatas, type Omits };
