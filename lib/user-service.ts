import { db } from '@/lib/db';
import type { Stream, User } from '@prisma/client';

export const getUserByUsername = async (
	username: string
): Promise<(User & { stream: Stream | null }) | null> => {
	const user = await db.user.findUnique({
		where: {
			username
		},
		include: {
			stream: true,
			_count: {
				select: {
					followedBy: true
				}
			}
		}
	});

	return user;
};

export const getUserById = async (
	id: string
): Promise<(User & { stream: Stream | null }) | null> => {
	const user = await db.user.findUnique({
		where: {
			id
		},
		include: {
			stream: true
		}
	});

	return user;
};
