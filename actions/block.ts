'use server';

import { revalidatePath } from 'next/cache';
import type { BlockWithBlocked } from '@/types';
import { blockUser, unblockUser } from '@/lib/block-service';

export const onBlock = async (
	id: string
): Promise<BlockWithBlocked | boolean> => {
	try {
		const blockedUser = await blockUser(id);

		revalidatePath('/');

		if (typeof blockedUser === 'object') {
			revalidatePath(`/${blockedUser.blocked.username}`);
		}

		return blockedUser;
	} catch (error) {
		throw new Error('Internal Error');
	}
};

export const onUnblock = async (
	id: string
): Promise<BlockWithBlocked | boolean> => {
	try {
		const unblockedUser = await unblockUser(id);

		revalidatePath('/');

		if (typeof unblockedUser === 'object') {
			revalidatePath(`/${unblockedUser.blocked.username}`);
		}

		return unblockedUser;
	} catch (error) {
		throw new Error('Internal Error');
	}
};
