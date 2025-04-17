"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formInput, kontakSchema } from "@/lib/types/kontak";

export default function KontakForm() {
	const form = useForm<z.infer<typeof kontakSchema>>({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			phone: "",
			message: "",
		},
		resolver: zodResolver(kontakSchema),
	});
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((data) => console.log(data))}
					className="mx-10 contain-layout"
				>
					<h1 className="text-4xl font-bold">Hubungi Kami dan berikan saran</h1>
					<div className="grid grid-cols-2 gap-5 mt-10">
						{formInput.map((el) => {
							if (el === "message") {
								return (
									<FormField
										key={el}
										control={form.control}
										name={el}
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>{el}</FormLabel>
												<FormControl>
													<Textarea {...field} placeholder={el} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								);
							}
							return (
								<FormField
									key={el}
									control={form.control}
									name={el}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{el}</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder={el}
													type={el === "phone" ? "number" : "text"}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							);
						})}
					</div>
					<div className="mt-10 space-x-5 flex justify-end">
						<Button
							type="reset"
							variant={"secondary"}
							onClick={() => {
								form.reset();
							}}
						>
							Reset
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
