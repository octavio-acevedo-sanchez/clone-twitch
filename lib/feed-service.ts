import { db } from '@/lib/db';
import { getSelf } from './auth-service';
import type { User } from '@prisma/client';

interface Results {
	id: string;
	user: User;
	isLive: boolean;
	name: string;
	thumbnailUrl: string | null;
}

export const getStreams = async (): Promise<Results[]> => {
	let userId;

	try {
		const self = await getSelf();
		userId = self.id;
	} catch (error) {
		userId = null;
	}

	let streams = [];

	if (userId) {
		streams = await db.stream.findMany({
			where: {
				user: {
					NOT: {
						blocking: {
							some: {
								blockedId: userId
							}
						}
					}
				}
			},
			// include: {
			// 	user: true
			// },
			select: {
				id: true,
				user: true,
				thumbnailUrl: true,
				name: true,
				isLive: true
			},
			orderBy: [
				{
					isLive: 'desc'
				},
				{
					updatedAt: 'desc'
				}
			]
		});
	} else {
		streams = await db.stream.findMany({
			select: {
				id: true,
				user: true,
				thumbnailUrl: true,
				name: true,
				isLive: true
			},
			orderBy: [
				{
					isLive: 'desc'
				},
				{
					updatedAt: 'desc'
				}
			]
		});
	}

	return streams;
};
