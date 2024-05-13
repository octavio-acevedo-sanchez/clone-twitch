import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
import type { User } from '@prisma/client';

export const getSelf = async (): Promise<User> => {
	const self = await currentUser();

	if (!self?.username) {
		throw new Error('Unauthorized');
	}

	const user = await db.user.findUnique({
		where: {
			externalUserId: self.id
		}
	});

	if (!user) {
		throw new Error('Not found');
	}

	return user;
};
