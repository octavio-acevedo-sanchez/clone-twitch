'use client';

import { onBlock } from '@/actions/block';
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionProps {
	isFollowing: boolean;
	userId: string;
}

export const Actions = ({
	isFollowing,
	userId
}: ActionProps): React.ReactNode => {
	const [isPending, startTransition] = useTransition();

	const handleFollow = (): void => {
		startTransition(() => {
			void onFollow(userId)
				.then(data =>
					toast.success(`You are now following ${data.following.username}`)
				)
				.catch(() => toast.error('Something went wrong'));
		});
	};

	const handleUnfollow = (): void => {
		startTransition(() => {
			void onUnfollow(userId)
				.then(data =>
					toast.success(`You have unfollowing ${data.following.username}`)
				)
				.catch(() => toast.error('Something went wrong'));
		});
	};

	const onClick = (): void => {
		if (isFollowing) {
			handleUnfollow();
		} else {
			handleFollow();
		}
	};

	const handleBlock = (): void => {
		startTransition(() => {
			void onBlock(userId)
				.then(data => {
					if (typeof data === 'object') {
						toast.success(`Blocked the user ${data.blocked.username}`);
					}
				})
				.catch(() => toast.error('Something went wrong'));
		});
	};

	return (
		<>
			<Button disabled={isPending} onClick={onClick} variant='primary'>
				{isFollowing ? 'Unfollow' : 'Follow'}
			</Button>
			<Button onClick={handleBlock}>Block</Button>
		</>
	);
};
