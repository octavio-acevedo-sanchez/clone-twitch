'use client';

import { useSidebar } from '@/store/use-sidebar';
import type { User } from '@prisma/client';
import { UserItem, UserItemSkeleton } from './user-item';

interface RecommendedProps {
	data: Array<User | (User & { stream: { isLive: boolean } | null })>;
}

export const Recommended = ({ data }: RecommendedProps): React.ReactNode => {
	const { collapsed } = useSidebar(state => state);

	const showLabel = !collapsed && data.length > 0;

	return (
		<div>
			{showLabel && (
				<div className='pl-6 mb-4'>
					<p className='text-sm text-muted-foreground'>Recommended</p>
				</div>
			)}
			<ul className='space-y-2 px-2'>
				{data.map(user => (
					<UserItem
						key={user.id}
						username={user.username}
						imageUrl={user.imageUrl}
						isLive={'stream' in user ? user.stream?.isLive : false}
					/>
				))}
			</ul>
		</div>
	);
};

export const RecommendedSkeleton = (): React.ReactNode => {
	return (
		<ul className='px-2'>
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	);
};
