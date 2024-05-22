import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import { createViewerToken } from '@/actions/token';

export const useViewerToken = (
	hostIdentity: string
): {
	token: string;
	name: string;
	identity: string;
} => {
	const [token, setToken] = useState('');
	const [name, setName] = useState('');
	const [identity, setIdentity] = useState('');

	useEffect(() => {
		const createToken = async (): Promise<void> => {
			try {
				const viewerToken = await createViewerToken(hostIdentity);
				setToken(viewerToken);

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
				const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
					name?: string;
				};
				const name = decodedToken?.name;
				const identity = decodedToken.jti;

				if (identity) {
					setIdentity(identity);
				}

				if (name) {
					setName(name);
				}
			} catch (error) {
				toast.error('Something went wrong');
			}
		};

		void createToken();
	}, [hostIdentity]);

	return {
		token,
		name,
		identity
	};
};
