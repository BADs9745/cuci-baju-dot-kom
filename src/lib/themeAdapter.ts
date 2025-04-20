"use client";
import { useEffect } from "react";
export default function ThemeAdapter() {
	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		const getTheme = localTheme ? localTheme : "light";
		if (getTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);
	return null;
}
