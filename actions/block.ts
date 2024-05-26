'use server';

import { revalidatePath } from 'next/cache';
import type { BlockWithBlocked } from '@/types';
import { blockUser, unblockUser } from '@/lib/block-service';
import { getSelf } from '@/lib/auth-service';
import { RoomServiceClient } from 'livekit-server-sdk';

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL ?? '',
	process.env.LIVEKIT_API_KEY ?? '',
	process.env.LIVEKIT_API_SECRET ?? ''
);

export const onBlock = async (
	id: string
): Promise<BlockWithBlocked | boolean | undefined> => {
	try {
		const self = await getSelf();

		let blockedUser;
		try {
			blockedUser = await blockUser(id);
		} catch (error) {
			// this means user is a guest
		}

		try {
			await roomService.removeParticipant(self.id, id);
		} catch (error) {
			// this means user is not in the room
		}

		revalidatePath(`/u/${self.username}/community`);

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
