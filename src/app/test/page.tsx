"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function TestPage() {
	const name = `<h1 class='text-red-500'>Ayam</h1>`;
	const divRef = useRef<HTMLDivElement>(null);
	if (divRef.current) {
		divRef.current.innerHTML = name;
		console.log(divRef.current.innerHTML);
	}
	return (
		<>
			<Link href={"/test/kotak"}>To Kotak</Link>
			Kotak <div dangerouslySetInnerHTML={{ __html: name }} />{" "}
			<div ref={divRef} />
			<br />
		</>
	);
}
