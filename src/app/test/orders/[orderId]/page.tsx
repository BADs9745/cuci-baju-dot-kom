"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Loader2,
	ArrowLeft,
	CheckCircle2,
	XCircle,
	AlertCircle,
	CalendarClock,
	Clock,
	Package,
} from "lucide-react";

// Sample data for services
const services = [
	{
		id: 1,
		name: "Wash & Fold",
		description: "Regular laundry service with washing, drying, and folding",
		price: 4.99,
	},
	{
		id: 2,
		name: "Dry Cleaning",
		description:
			"Professional dry cleaning for delicate fabrics and formal wear",
		price: 7.99,
	},
	{
		id: 3,
		name: "Express Service",
		description: "Same-day laundry service for urgent needs",
		price: 9.99,
	},
	{
		id: 4,
		name: "Ironing Only",
		description: "Professional ironing and pressing service",
		price: 3.5,
	},
	{
		id: 5,
		name: "Bedding & Linens",
		description: "Specialized cleaning for bedding, towels, and linens",
		price: 12.99,
	},
	{
		id: 6,
		name: "Cold Wash",
		description: "Eco-friendly cold water washing for delicate items",
		price: 5.99,
	},
];

// Sample data for packages
const packages = [
	{
		id: 1,
		name: "Basic Bundle",
		description: "Essential laundry services for everyday needs",
		price: 19.99,
		services: [1, 4],
		savings: "15%",
	},
	{
		id: 2,
		name: "Premium Package",
		description: "Complete laundry care with premium services",
		price: 29.99,
		services: [1, 2, 4],
		savings: "20%",
	},
	{
		id: 3,
		name: "Business Bundle",
		description: "Professional laundry services for businesses",
		price: 49.99,
		services: [1, 2, 3, 4],
		savings: "25%",
	},
	{
		id: 4,
		name: "Home Essentials",
		description: "Complete care for all your home linens and clothing",
		price: 39.99,
		services: [1, 5, 6],
		savings: "18%",
	},
];

// Sample data for orders
const ordersData = [
	{
		id: "ORD-1234",
		customer: {
			id: "CUST-001",
			name: "John Doe",
			email: "john.doe@example.com",
			phone: "555-123-4567",
			address: "123 Main St, Anytown, USA",
		},
		items: [
			{ type: "package", id: 1, quantity: 1, weight: 5 },
			{ type: "service", id: 3, quantity: 2, weight: 0 },
		],
		status: "Pending",
		notes: "Please handle with care, contains delicate items.",
		createdAt: "2023-05-01T10:30:00Z",
		updatedAt: "2023-05-01T10:30:00Z",
		scheduledPickup: "2023-05-02T14:00:00Z",
		scheduledDelivery: "2023-05-04T14:00:00Z",
		totalAmount: 39.97,
	},
	{
		id: "ORD-1235",
		customer: {
			id: "CUST-002",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "555-987-6543",
			address: "456 Oak Ave, Somewhere, USA",
		},
		items: [
			{ type: "service", id: 2, quantity: 3, weight: 2 },
			{ type: "service", id: 4, quantity: 5, weight: 0 },
		],
		status: "Processing",
		notes: "",
		createdAt: "2023-05-02T09:15:00Z",
		updatedAt: "2023-05-02T14:20:00Z",
		scheduledPickup: "2023-05-03T10:00:00Z",
		scheduledDelivery: "2023-05-05T16:00:00Z",
		totalAmount: 33.47,
	},
	{
		id: "ORD-1236",
		customer: {
			id: "CUST-003",
			name: "Robert Johnson",
			email: "robert.johnson@example.com",
			phone: "555-456-7890",
			address: "789 Pine St, Elsewhere, USA",
		},
		items: [{ type: "package", id: 3, quantity: 1, weight: 8 }],
		status: "Completed",
		notes: "Regular customer, prefers eco-friendly detergent.",
		createdAt: "2023-05-03T11:45:00Z",
		updatedAt: "2023-05-05T16:30:00Z",
		scheduledPickup: "2023-05-04T09:00:00Z",
		scheduledDelivery: "2023-05-06T13:00:00Z",
		totalAmount: 49.99,
	},
	{
		id: "ORD-1237",
		customer: {
			id: "CUST-004",
			name: "Emily Davis",
			email: "emily.davis@example.com",
			phone: "555-789-0123",
			address: "101 Maple Dr, Nowhere, USA",
		},
		items: [{ type: "service", id: 5, quantity: 2, weight: 6 }],
		status: "Cancelled",
		notes: "Customer cancelled due to scheduling conflict.",
		createdAt: "2023-05-03T14:20:00Z",
		updatedAt: "2023-05-03T16:45:00Z",
		scheduledPickup: "2023-05-04T11:00:00Z",
		scheduledDelivery: "2023-05-06T15:00:00Z",
		totalAmount: 77.94,
	},
	{
		id: "ORD-1238",
		customer: {
			id: "CUST-005",
			name: "Michael Wilson",
			email: "michael.wilson@example.com",
			phone: "555-234-5678",
			address: "202 Elm St, Someplace, USA",
		},
		items: [
			{ type: "package", id: 2, quantity: 1, weight: 4 },
			{ type: "service", id: 6, quantity: 1, weight: 2 },
		],
		status: "Ready for Pickup",
		notes: "",
		createdAt: "2023-05-04T08:30:00Z",
		updatedAt: "2023-05-06T10:15:00Z",
		scheduledPickup: "2023-05-05T13:00:00Z",
		scheduledDelivery: "2023-05-07T13:00:00Z",
		totalAmount: 41.97,
	},
	{
		id: "ORD-1239",
		customer: {
			id: "CUST-006",
			name: "Sarah Brown",
			email: "sarah.brown@example.com",
			phone: "555-345-6789",
			address: "303 Cedar Ln, Anywhere, USA",
		},
		items: [{ type: "service", id: 1, quantity: 1, weight: 7 }],
		status: "Delivered",
		notes: "Leave package at the door if no one answers.",
		createdAt: "2023-05-05T13:10:00Z",
		updatedAt: "2023-05-07T15:40:00Z",
		scheduledPickup: "2023-05-06T10:00:00Z",
		scheduledDelivery: "2023-05-08T14:00:00Z",
		totalAmount: 34.93,
	},
	{
		id: "ORD-1240",
		customer: {
			id: "CUST-007",
			name: "David Miller",
			email: "david.miller@example.com",
			phone: "555-456-7890",
			address: "404 Birch Ave, Somewhere Else, USA",
		},
		items: [
			{ type: "package", id: 4, quantity: 1, weight: 5 },
			{ type: "service", id: 2, quantity: 2, weight: 1 },
		],
		status: "Pending",
		notes: "",
		createdAt: "2023-05-06T09:45:00Z",
		updatedAt: "2023-05-06T09:45:00Z",
		scheduledPickup: "2023-05-07T11:00:00Z",
		scheduledDelivery: "2023-05-09T15:00:00Z",
		totalAmount: 55.97,
	},
];

// Order status options
const statusOptions = [
	{ value: "Pending", label: "Pending" },
	{ value: "Processing", label: "Processing" },
	{ value: "Ready for Pickup", label: "Ready for Pickup" },
	{ value: "Out for Delivery", label: "Out for Delivery" },
	{ value: "Delivered", label: "Delivered" },
	{ value: "Completed", label: "Completed" },
	{ value: "Cancelled", label: "Cancelled" },
];

// Helper function to get status badge variant
function getStatusVariant(status) {
	switch (status) {
		case "Completed":
		case "Delivered":
			return "success";
		case "Processing":
		case "Ready for Pickup":
		case "Out for Delivery":
			return "default";
		case "Pending":
			return "secondary";
		case "Cancelled":
			return "destructive";
		default:
			return "outline";
	}
}

// Helper function to get status icon
function getStatusIcon(status) {
	switch (status) {
		case "Completed":
			return <CheckCircle2 className="size-4" />;
		case "Delivered":
			return <CheckCircle2 className="size-4" />;
		case "Processing":
			return <Clock className="size-4" />;
		case "Ready for Pickup":
			return <Package className="size-4" />;
		case "Out for Delivery":
			return <Package className="size-4" />;
		case "Pending":
			return <CalendarClock className="size-4" />;
		case "Cancelled":
			return <XCircle className="size-4" />;
		default:
			return <AlertCircle className="size-4" />;
	}
}

// Format date helper
function formatDate(dateString) {
	if (!dateString) return "N/A";
	return format(new Date(dateString), "MMM d, yyyy h:mm a");
}

export default function OrderProcessPage({ params }) {
	const { orderId } = use(params);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [order, setOrder] = useState(null);

	// Fetch order data
	useEffect(() => {
		// In a real app, this would be an API call
		const foundOrder = ordersData.find((o) => o.id === orderId);
		if (foundOrder) {
			setOrder({ ...foundOrder });
		} else {
			// Order not found, redirect to orders list
			toast.error("Order not found");
			router.push("/admin/orders");
		}
	}, [orderId, router]);

	if (!order) {
		return (
			<div className="container mx-auto py-10 flex justify-center items-center">
				<Loader2 className="size-8 animate-spin text-primary" />
			</div>
		);
	}

	// Handle status change
	const handleStatusChange = (status) => {
		setOrder({
			...order,
			status,
			updatedAt: new Date().toISOString(),
		});
	};

	// Handle item quantity change
	const handleItemQuantityChange = (index, quantity) => {
		const newItems = [...order.items];
		newItems[index] = {
			...newItems[index],
			quantity: Number.parseInt(quantity) || 0,
		};

		setOrder({
			...order,
			items: newItems,
		});

		// Recalculate total
		const newTotal = calculateOrderTotal(newItems);
		setOrder((prev) => ({
			...prev,
			items: newItems,
			totalAmount: newTotal,
		}));
	};

	// Handle item weight change
	const handleItemWeightChange = (index, weight) => {
		const newItems = [...order.items];
		newItems[index] = {
			...newItems[index],
			weight: Number.parseFloat(weight) || 0,
		};

		// Recalculate total
		const newTotal = calculateOrderTotal(newItems);
		setOrder((prev) => ({
			...prev,
			items: newItems,
			totalAmount: newTotal,
		}));
	};

	// Calculate order total based on items
	const calculateOrderTotal = (items) => {
		let total = 0;
		items.forEach((item) => {
			if (item.type === "package") {
				const pkg = packages.find((p) => p.id === item.id);
				if (pkg) {
					total += pkg.price * item.quantity;
				}
			} else if (item.type === "service") {
				const service = services.find((s) => s.id === item.id);
				if (service) {
					// For services that are charged by weight
					if (item.weight > 0) {
						total += service.price * item.weight;
					} else {
						total += service.price * item.quantity;
					}
				}
			}
		});

		return Number.parseFloat(total.toFixed(2));
	};

	// Get item name
	const getItemName = (item) => {
		if (item.type === "package") {
			const pkg = packages.find((p) => p.id === item.id);
			return pkg ? pkg.name : "Unknown Package";
		} else {
			const service = services.find((s) => s.id === item.id);
			return service ? service.name : "Unknown Service";
		}
	};

	// Get item price
	const getItemPrice = (item) => {
		if (item.type === "package") {
			const pkg = packages.find((p) => p.id === item.id);
			return pkg ? pkg.price : 0;
		} else {
			const service = services.find((s) => s.id === item.id);
			return service ? service.price : 0;
		}
	};

	// Calculate item subtotal
	const calculateItemSubtotal = (item) => {
		const price = getItemPrice(item);
		if (item.type === "service" && item.weight > 0) {
			return price * item.weight;
		}
		return price * item.quantity;
	};

	// Save order changes
	const handleSaveChanges = () => {
		setIsLoading(true);

		// In a real app, this would be an API call
		setTimeout(() => {
			setIsLoading(false);
			toast.success("Order updated", {
				description: `Order ${order.id} has been updated successfully.`,
			});
		}, 600);
	};

	return (
		<div className="container mx-auto py-10">
			<Toaster position="top-right" richColors closeButton />

			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onClick={() => router.push("/admin/orders")}
					>
						<ArrowLeft className="size-4" />
						<span className="sr-only">Back to Orders</span>
					</Button>
					<div>
						<h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
							Order {order.id}
							<Badge
								variant={getStatusVariant(order.status)}
								className="ml-2 flex items-center gap-1"
							>
								{getStatusIcon(order.status)}
								{order.status}
							</Badge>
						</h1>
						<p className="text-zinc-500 dark:text-zinc-400">
							Process and update order details
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Customer Information */}
					<Card>
						<CardHeader>
							<CardTitle>Customer Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Name:</div>
									<div>{order.customer.name}</div>
								</div>
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Email:</div>
									<div>{order.customer.email}</div>
								</div>
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Phone:</div>
									<div>{order.customer.phone}</div>
								</div>
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Address:</div>
									<div>{order.customer.address}</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Order Details */}
					<Card>
						<CardHeader>
							<CardTitle>Order Details</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Created:</div>
									<div>{formatDate(order.createdAt)}</div>
								</div>
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Last Updated:</div>
									<div>{formatDate(order.updatedAt)}</div>
								</div>
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Scheduled Pickup:</div>
									<div>{formatDate(order.scheduledPickup)}</div>
								</div>
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Scheduled Delivery:</div>
									<div>{formatDate(order.scheduledDelivery)}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Order Status */}
				<Card>
					<CardHeader>
						<CardTitle>Order Status</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="status">Update Status</Label>
							<Select value={order.status} onValueChange={handleStatusChange}>
								<SelectTrigger>
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									{statusOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="notes">Order Notes</Label>
							<Textarea
								id="notes"
								value={order.notes}
								onChange={(e) => setOrder({ ...order, notes: e.target.value })}
								placeholder="Add notes about this order..."
								className="min-h-[80px]"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Order Items */}
				<Card>
					<CardHeader>
						<CardTitle>Order Items</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{order.items.map((item, index) => (
								<div key={index} className="border rounded-lg p-4">
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
										<div className="space-y-1">
											<div className="font-medium">{getItemName(item)}</div>
											<div className="text-sm text-zinc-500 dark:text-zinc-400">
												{item.type === "package" ? "Package" : "Service"} - $
												{getItemPrice(item).toFixed(2)}
												{item.type === "service" && item.weight > 0
													? "/lb"
													: "/item"}
											</div>
										</div>

										<div className="flex flex-wrap gap-4">
											<div className="w-24">
												<Label
													htmlFor={`quantity-${index}`}
													className="text-xs"
												>
													Quantity
												</Label>
												<Input
													id={`quantity-${index}`}
													type="number"
													min="1"
													value={item.quantity}
													onChange={(e) =>
														handleItemQuantityChange(index, e.target.value)
													}
													className="h-8"
												/>
											</div>

											{item.type === "service" && (
												<div className="w-24">
													<Label
														htmlFor={`weight-${index}`}
														className="text-xs"
													>
														Weight (lb)
													</Label>
													<Input
														id={`weight-${index}`}
														type="number"
														min="0"
														step="0.1"
														value={item.weight}
														onChange={(e) =>
															handleItemWeightChange(index, e.target.value)
														}
														className="h-8"
													/>
												</div>
											)}

											<div className="w-24">
												<Label className="text-xs">Subtotal</Label>
												<div className="h-8 flex items-center font-medium">
													${calculateItemSubtotal(item).toFixed(2)}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}

							<div className="flex justify-between pt-4 border-t">
								<span className="font-medium">Total Amount:</span>
								<span className="font-bold">
									${order.totalAmount.toFixed(2)}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex justify-end gap-4">
					<Button
						variant="outline"
						onClick={() => router.push("/admin/orders")}
					>
						Cancel
					</Button>
					<Button onClick={handleSaveChanges} disabled={isLoading}>
						{isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
						Save Changes
					</Button>
				</div>
			</div>
		</div>
	);
}
