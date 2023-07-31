import { styled } from 'styled-components';

import { deviceBreakpoints } from '@/styles/breakpoints';

export const AppMainContainer = styled.main`
	padding: 0 8.5rem 0 10.25rem;
	margin: 3.6875rem 0 3.125rem 0;

	.load-more-btn {
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.not-found {
		color: ${({ theme }) => theme.colors['text-color-secondary']};
		text-align: center;
	}

	@media (max-width: ${deviceBreakpoints.tablet}) {
		padding: 0 4.5rem 0 6rem;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		padding: 0 1rem 0 1rem;
	}
`;

export const AppEnterprisesContainer = styled.div`
	margin-bottom: 3rem;

	display: flex;
	flex-direction: column;
	gap: 2rem;
`;
