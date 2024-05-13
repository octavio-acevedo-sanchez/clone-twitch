import { Navigation } from './navigation';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const Sidebar = (): React.ReactNode => {
	return (
		<Wrapper>
			<Toggle />
			<Navigation />
		</Wrapper>
	);
};
