import type { Block, Follow, Stream, User } from '@prisma/client';

export type FollowWithFollowingAndFollower = Follow & {
	following: User;
	follower: User;
};

export type FollowWithFollowing = Follow & {
	following: User & {
		stream: Stream | null;
	};
};

export type BlockWithBlocked = Block & {
	blocked: User;
};
