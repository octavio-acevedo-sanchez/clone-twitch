import { StreamPlayerSkeleton } from '@/components/stream-player';

const CreatorLoading = (): React.ReactNode => {
	return (
		<div className='h-full'>
			<StreamPlayerSkeleton />
		</div>
	);
};

export default CreatorLoading;
