import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs';

interface CreatorPageProps {
	params: {
		username: string;
	};
}

const CreatorPage = async ({
	params
}: CreatorPageProps): Promise<JSX.Element> => {
	const externalUser = await currentUser();
	const user = await getUserByUsername(externalUser?.username ?? '');

	if (
		!user ||
		user.externalUserId !== externalUser?.id ||
		!Object.hasOwn(user, 'stream')
	) {
		throw new Error('Unauthorized');
	}

	return (
		<div className='h-full'>
			<StreamPlayer user={user} stream={user.stream} isFollowing />
		</div>
	);
};

export default CreatorPage;
