'use client';

import { ConnectionState, Track } from 'livekit-client';
import {
	useConnectionState,
	useRemoteParticipant,
	useTracks
} from '@livekit/components-react';
import React from 'react';
import { OfflineVideo } from './offline-video';
import { LoadingVideo } from './loading';
import { LiveVideo } from './live-video';
import { Skeleton } from '@/components/ui/skeleton';

interface VideoProps {
	hostName: string;
	hostIdentity: string;
}

export const Video = ({
	hostName,
	hostIdentity
}: VideoProps): React.ReactNode => {
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(hostIdentity);
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone
	]).filter(track => track.participant.identity === hostIdentity);

	let content;

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />;
	} else if (!participant || tracks.length === 0) {
		content = <LoadingVideo label={connectionState} />;
	} else {
		content = <LiveVideo participant={participant} />;
	}

	return <div className='aspect-video border-b group relative'>{content}</div>;
};

export const VideoSkeleton = (): React.ReactNode => {
	return (
		<div className='aspect-vide border-x border-background'>
			<Skeleton className='h-full w-full rounded-none' />
		</div>
	);
};
