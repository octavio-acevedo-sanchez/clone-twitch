'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import type { Stream, User } from '@prisma/client';

interface StreamPlayerProps {
	user: User & { stream: Stream | null };
	stream: Stream | null;
	isFollowing: boolean;
}

export const StreamPlayer = ({
	user,
	stream,
	isFollowing
}: StreamPlayerProps): React.ReactNode => {
	const { token, name, identity } = useViewerToken(user.id);

	if (!token || !name || !identity) {
		return <div>Cannot wath the stream</div>;
	}

	console.log({ token, name, identity });

	return <div>Allowed to wath the strema</div>;
};
