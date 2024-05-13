import type { Block, Follow, User } from '@prisma/client';

export type FollowWithFollowingAndFollower = Follow & {
	following: User;
	follower: User;
};

export type FollowWithFollowing = Follow & {
	following: User;
};

export type BlockWithBlocked = Block & {
	blocked: User;
};
