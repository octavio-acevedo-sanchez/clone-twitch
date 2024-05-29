import type { CustomUser } from '@/components/stream-player';
import { db } from '@/lib/db';
import type { Stream, User } from '@prisma/client';

export const getUserByUsername = async (
	username: string
): Promise<CustomUser | null> => {
	const user = await db.user.findUnique({
		where: {
			username
		},
		select: {
			id: true,
			externalUserId: true,
			username: true,
			bio: true,
			imageUrl: true,
			stream: {
				select: {
					id: true,
					isLive: true,
					isChatDelayed: true,
					isChatEnabled: true,
					isChatFollowersOnly: true,
					thumbnailUrl: true,
					name: true
				}
			},
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
