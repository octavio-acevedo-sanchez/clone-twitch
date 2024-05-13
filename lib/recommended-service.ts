import { db } from '@/lib/db';
import type { User } from '@prisma/client';

export const getRecommended = async (): Promise<User[]> => {
	const users = await db.user.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});

	return users;
};
