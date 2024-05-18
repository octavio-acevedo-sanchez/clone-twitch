'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, Copy } from 'lucide-react';

interface CopyButtonProps {
	value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps): React.ReactNode => {
	const [isCopied, setIsCopied] = useState(false);

	const onCopy = async (): Promise<void> => {
		if (!value) return;

		setIsCopied(true);
		await navigator.clipboard.writeText(value);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	const Icon = isCopied ? CheckIcon : Copy;

	return (
		<Button
			onClick={() => {
				void onCopy();
			}}
			disabled={!value || isCopied}
			variant='ghost'
			size='sm'
		>
			<Icon className='h-4 w-4' />
		</Button>
	);
};
