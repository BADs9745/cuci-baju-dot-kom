import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log("awdwdwa");
	console.log(req.body);
	return NextResponse.json({
		message: "Hello World",
		ayam: "Ayam",
	});
}

export async function POST(req: NextRequest) {
	console.log("awdwdwa");
	console.log(await req.formData());
	return NextResponse.json({
		message: "Hello World",
		ayam: "Ayam",
	});
}
