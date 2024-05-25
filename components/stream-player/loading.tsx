import { Loader } from 'lucide-react';

interface LoadingVideoProps {
	label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps): React.ReactNode => {
	return (
		<div className='h-full flex flex-col space-x-4 justify-center items-center'>
			<Loader className='h-10 w-10 text-muted-foreground animate-spin' />
			<p className='text-muted-foreground capitalize'>{label}</p>
		</div>
	);
};
