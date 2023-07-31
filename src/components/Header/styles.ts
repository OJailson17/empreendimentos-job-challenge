import { deviceBreakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const HeaderComponent = styled.header`
	width: 100%;
	height: 5rem;
	padding: 1.75rem 9.375rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	background: ${({ theme }) => theme.colors['background-white']};

	h1 {
		color: ${({ theme }) => theme.colors.primary};
		font-weight: bold;
		font-size: 1.5rem;
	}

	@media (max-width: ${deviceBreakpoints.tablet}) {
		padding: 1.75rem 5rem;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		padding: 1.75rem 3rem;

		h1 {
			font-size: 1.25rem;
		}
	}
	@media (max-width: ${deviceBreakpoints.mobileSM}) {
		padding: 1.75rem 1.5rem;

		h1 {
			font-size: 1.25rem;
		}
	}
`;
