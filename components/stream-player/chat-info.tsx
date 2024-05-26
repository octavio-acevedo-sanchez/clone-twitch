import { useMemo } from 'react';
import { Info } from 'lucide-react';

import { Hint } from '@/components/hint';

interface ChatInfoProps {
	isDelayed: boolean | undefined;
	isFollowersOnly: boolean | undefined;
}

export const ChatInfo = ({
	isDelayed,
	isFollowersOnly
}: ChatInfoProps): React.ReactNode => {
	const hint = useMemo(() => {
		if (isFollowersOnly && !isDelayed) {
			return 'Only followers can chat';
		}

		if (isDelayed && !isFollowersOnly) {
			return 'Message are delayed by 3 seconds';
		}

		if (isDelayed && isFollowersOnly) {
			return 'Only followers can chat, Messages are delayed by 3 seconds';
		}

		return '';
	}, [isDelayed, isFollowersOnly]);

	const label = useMemo(() => {
		if (isFollowersOnly && !isDelayed) {
			return 'Follwers only';
		}

		if (isDelayed && !isFollowersOnly) {
			return 'Slow mode';
		}

		if (isDelayed && isFollowersOnly) {
			return 'Followers only and slow mode';
		}

		return '';
	}, [isDelayed, isFollowersOnly]);

	if (!isDelayed && !isFollowersOnly) {
		return null;
	}

	return (
		<div className='p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2'>
			<Hint label={hint}>
				<Info className='w-4 w-4' />
			</Hint>
			<p className='text-xs font-semibold'>{label}</p>
		</div>
	);
};
