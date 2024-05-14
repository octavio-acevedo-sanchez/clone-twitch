import { db } from '@/lib/db';
import type { Stream } from '@prisma/client';

export const getStreamByUserId = async (
	userId: string
): Promise<Stream | null> => {
	const stream = await db.stream.findUnique({
		where: { userId }
	});

	return stream;
};
