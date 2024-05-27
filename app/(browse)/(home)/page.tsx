import { Suspense } from 'react';
import { Results, ResultsSkeleton } from './_components/results';

export default function Home(): React.ReactNode {
	return (
		<div className='h-full p-8 max-w-screen-2xl ml-auto'>
			<Suspense fallback={<ResultsSkeleton />}>
				<Results />
			</Suspense>
		</div>
	);
}
