'use client';

import { useTransition } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps {
	label: string;
	value: boolean;
	field: FieldTypes;
}

export const ToggleCard = ({
	field,
	value,
	label
}: ToggleCardProps): React.ReactNode => {
	const [isPending, startTransition] = useTransition();

	const onChange = (): void => {
		startTransition(async () => {
			await updateStream({ [field]: !value })
				.then(() => toast.success('Chat settings updated!'))
				.catch(() => toast.error('Something went wrong'));
		});
	};

	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-center justify-between'>
				<p className='font-semibold shrink-0'>{label}</p>
				<div className='space-y-2'>
					<Switch
						onCheckedChange={onChange}
						disabled={isPending}
						checked={value}
					>
						{value ? 'On' : 'Off'}
					</Switch>
				</div>
			</div>
		</div>
	);
};

export const ToggleCardSkeleton = (): React.ReactNode => {
	return <Skeleton className='rounded-xl p-10 w-full' />;
};
