import { getSelf } from './auth-service';
import { db } from '@/lib/db';
import type {
	FollowWithFollowing,
	FollowWithFollowingAndFollower,
	FollowWithFollowingStream
} from '@/types';

export const getFollowedUsers = async (): Promise<
	FollowWithFollowingStream[]
> => {
	try {
		const self = await getSelf();

		const followedUsers = await db.follow.findMany({
			where: {
				followerId: self.id,
				following: {
					blocking: {
						none: { blockedId: self.id }
					}
				}
			},
			include: {
				following: {
					include: {
						stream: {
							select: {
								isLive: true
							}
						}
					}
				}
			}
		});

		return followedUsers;
	} catch (error) {
		return [];
	}
};

export const isFollowingUser: (id: string) => Promise<boolean> = async (
	id: string
): Promise<boolean> => {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({
			where: { id }
		});

		if (!otherUser) {
			throw new Error('User not found');
		}

		if (otherUser.id === self.id) {
			return true;
		}

		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id
			}
		});

		return !!existingFollow;
	} catch (error) {
		return false;
	}
};

export const followUser = async (
	id: string
): Promise<FollowWithFollowingAndFollower> => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: { id }
	});

	if (!otherUser) {
		throw new Error('User not found');
	}

	if (otherUser.id === self.id) {
		throw new Error('Cannot follow yourself');
	}

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id
		}
	});

	if (existingFollow) {
		throw new Error('Already following');
	}

	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id
		},
		include: {
			following: true,
			follower: true
		}
	});

	return follow;
};

export const unfollowUser = async (
	id: string
): Promise<FollowWithFollowing> => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: { id }
	});

	if (!otherUser) {
		throw new Error('User not found');
	}

	if (otherUser.id === self.id) {
		throw new Error('Cannot unfollow yourself');
	}

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id
		}
	});

	if (!existingFollow) {
		throw new Error('Not following');
	}

	const follow = await db.follow.delete({
		where: {
			id: existingFollow.id
		},
		include: {
			following: true
		}
	});

	return follow;
};
