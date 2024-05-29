import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import type { User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface ResultCardProps {
	// data: Stream | (Stream & { user: User });
	data: {
		user: User;
		isLive: boolean;
		name: string;
		thumbnailUrl: string | null;
	};
}

export const ResultCard = ({ data }: ResultCardProps): React.ReactNode => {
	const username = 'user' in data ? data.user.username : '';
	const imageUrl = 'user' in data ? data.user.imageUrl : '';

	return (
		<Link href={`/${username}`}>
			<div className='h-full w-full space-y-4'>
				<Thumbnail
					src={data.thumbnailUrl}
					fallback={imageUrl}
					isLive={data.isLive}
					username={username}
				/>

				<div className='flex gap-x-3'>
					<UserAvatar
						username={username}
						imageUrl={imageUrl}
						isLive={data.isLive}
					/>
					<div className='flex flex-col text-sm overflow-hidden '>
						<p className='truncate font-semibold hover:text-blue-500'>
							{data.name}
						</p>
						<p className='text-muted-foreground'>{username}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export const ResultCardSkeleton = (): React.ReactNode => {
	return (
		<div className='h-full w-full space-y-4'>
			<ThumbnailSkeleton />
			<div className='flex gap-x-3'>
				<UserAvatarSkeleton />
				<div className='flex flex-col gap-y-1'>
					<Skeleton className='h-4 w-32' />
					<Skeleton className='h-3 w-24' />
				</div>
			</div>
		</div>
	);
};
