import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = (): React.ReactNode => {
	return (
		<div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
			<h1 className='text-4xl'>404</h1>
			<p>We couldn&apos;t find the user you where looking for</p>
			<Button variant='secondary' asChild>
				<Link href='/'>Go back home</Link>
			</Button>
		</div>
	);
};

export default NotFoundPage;