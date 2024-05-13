import { db } from '@/lib/db';
import type { User } from '@prisma/client';
import { getSelf } from '@/lib/auth-service';

export const getRecommended = async (): Promise<User[]> => {
	let userId;

	try {
		const self = await getSelf();
		userId = self.id;
	} catch (error) {
		userId = null;
	}

	let users: User[] = [];

	if (userId) {
		users = await db.user.findMany({
			where: {
				AND: [
					{
						NOT: {
							id: userId
						}
					},
					{
						NOT: {
							followedBy: {
								some: {
									followerId: userId
								}
							}
						}
					},
					{
						NOT: {
							blocking: {
								some: {
									blockedId: userId
								}
							}
						}
					}
				]
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	} else {
		users = await db.user.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
	}

	return users;
};
