import { styled } from 'styled-components';

import { deviceBreakpoints } from '@/styles/breakpoints';

export const SearchBarContainer = styled.form`
	max-width: 1400px;
	padding: 0 9.375rem 0 9.375rem;
	margin: 0 auto;
	margin-top: 1.875rem;

	@media (max-width: ${deviceBreakpoints.tablet}) {
		padding: 0 5rem 0 5rem;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		padding: 0 2rem 0 2rem;
	}
`;
