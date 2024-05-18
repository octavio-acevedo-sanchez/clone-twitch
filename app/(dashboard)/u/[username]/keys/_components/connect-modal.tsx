'use client';

import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogTitle,
	DialogTrigger,
	DialogHeader
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

export const ConnectModal = (): React.ReactNode => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='primary'>Generate connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate connection</DialogTitle>
				</DialogHeader>
				<Select>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Ingress Type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='RTMP'>RTMP</SelectItem>
						<SelectItem value='WHIP'>WHIP</SelectItem>
					</SelectContent>
				</Select>
				<Alert>
					<AlertTriangle className='h-4 w-4' />
					<AlertTitle>Warning!</AlertTitle>
					<AlertDescription>
						This action will reset all active streams using the current
						connection
					</AlertDescription>
				</Alert>
				<div className='flex justify-between'>
					<DialogClose>
						<Button variant='ghost'>Cancel</Button>
					</DialogClose>
					<Button variant='primary' onClick={() => {}}>
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
