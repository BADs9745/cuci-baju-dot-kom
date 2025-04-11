export type PrismaClientError = {
	meta: {
		modelName?: string;
		target?: string;
	};
};

export type GetProfile = {
	Role: {
		name: string;
	};
} & {
	id: string;
	username: string;
	email: string;
	fullName: string;
	phone: string | null;
	lastLogin: Date | null;
	isActive: boolean;
	userRoleId: string;
};
