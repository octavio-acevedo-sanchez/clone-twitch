import type { BlockWithBlocked } from '@/types';
import { getSelf } from './auth-service';
import { db } from '@/lib/db';

export const isBlockedByUser = async (id: string): Promise<boolean> => {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({
			where: { id }
		});

		if (!otherUser) {
			throw new Error('User not found');
		}

		if (otherUser.id === self.id) {
			return false;
		}

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: otherUser.id,
					blockedId: self.id
				}
			}
		});

		return !!existingBlock;
	} catch (error) {
		return false;
	}
};

export const blockUser = async (
	id: string
): Promise<BlockWithBlocked | boolean> => {
	try {
		const self = await getSelf();

		if (self.id === id) {
			throw new Error('Cannot block yourself');
		}

		const otherUser = await db.user.findUnique({
			where: { id }
		});

		if (!otherUser) {
			throw new Error('User not found');
		}

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: self.id,
					blockedId: otherUser.id
				}
			}
		});

		if (existingBlock) {
			throw new Error('Already blocked');
		}

		const block = await db.block.create({
			data: {
				blockerId: self.id,
				blockedId: otherUser.id
			},
			include: {
				blocked: true
			}
		});

		return block;
	} catch (error) {
		return false;
	}
};

export const unblockUser = async (
	id: string
): Promise<BlockWithBlocked | boolean> => {
	try {
		const self = await getSelf();

		if (self.id === id) {
			throw new Error('Cannot unblock yourself');
		}

		const otherUser = await db.user.findUnique({
			where: { id }
		});

		if (!otherUser) {
			throw new Error('User not found');
		}

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: self.id,
					blockedId: otherUser.id
				}
			}
		});

		if (!existingBlock) {
			throw new Error('Not blocked');
		}

		const unblock = await db.block.delete({
			where: {
				id: existingBlock.id
			},
			include: {
				blocked: true
			}
		});

		return unblock;
	} catch (error) {
		return false;
	}
};

export const getBlockedUsers = async (): Promise<BlockWithBlocked[]> => {
	const self = await getSelf();

	const blockedUsers = await db.block.findMany({
		where: {
			blockerId: self.id
		},
		include: {
			blocked: true
		}
	});

	return blockedUsers;
};
