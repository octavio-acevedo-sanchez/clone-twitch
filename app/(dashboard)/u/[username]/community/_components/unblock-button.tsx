'use client';

import { useTransition } from 'react';
import { onUnblock } from '@/actions/block';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface UnblockButtonProps {
	userId: string;
}

export const UnblockButton = ({
	userId
}: UnblockButtonProps): React.ReactNode => {
	const [isPending, startTransition] = useTransition();

	const onClick = (): void => {
		startTransition(() => {
			onUnblock(userId)
				.then(result => {
					const username =
						typeof result === 'object' ? result.blocked.username : '';
					toast.success(`User ${username} unblocked`);
				})
				.catch(() => toast.error('Something went wrong'));
		});
	};

	return (
		<Button
			variant='link'
			disabled={isPending}
			onClick={onClick}
			size='sm'
			className='text-blue-500 w-full'
		>
			Unblock
		</Button>
	);
};
