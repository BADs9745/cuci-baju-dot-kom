"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { motion as m } from "motion/react";
import { useEffect, useState } from "react";
export default function ThemeSwitch() {
	const [theme, setTheme] = useState("");
	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		const getTheme = localTheme ? localTheme : "light";
		setTheme(getTheme);
	}, []);

	return (
		<div className="flex items-center gap-3 px-4 py-2 rounded-full bg-background">
			<span className="text-lg text-foreground">
				{theme === "dark" ? "Dark" : "Light"} Mode
			</span>
			<button
				className="flex items-center w-14 p-1 duration-300 rounded-full bg-foreground"
				type="button"
				onClick={() => {
					setTheme((prev) => (prev === "light" ? "dark" : "light"));
					if (theme === "dark") {
						document.documentElement.classList.remove("dark");
						localStorage.setItem("theme", "light");
					} else {
						document.documentElement.classList.add("dark");
						localStorage.setItem("theme", "dark");
					}
				}}
				style={{
					justifyContent: theme === "dark" ? "flex-end" : "flex-start",
				}}
			>
				<m.div
					className="flex items-center justify-center p-1 rounded-full bg-background"
					layout
				>
					{theme === "dark" ? (
						<MoonIcon className="size-5 text-foreground" />
					) : (
						<SunIcon className="size-5 text-foreground" />
					)}
				</m.div>
			</button>
		</div>
	);
}
