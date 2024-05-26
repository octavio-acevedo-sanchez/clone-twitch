import { StreamPlayerSkeleton } from '@/components/stream-player';
import React from 'react';

const UserLoading = (): React.ReactNode => {
	return (
		<div className='h-full'>
			<StreamPlayerSkeleton />;
		</div>
	);
};

export default UserLoading;
