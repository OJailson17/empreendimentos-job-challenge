import { styled } from 'styled-components';

import { deviceBreakpoints } from '@/styles/breakpoints';

export const EnterpriseWrapper = styled.div`
	max-width: 1400px;
	padding: 2rem;

	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	background-color: ${({ theme }) => theme.colors['background-white']};
	box-shadow: 0px 2px 4px 0px rgba(48, 46, 69, 0.06);
	border-radius: 8px;

	@media (max-width: ${deviceBreakpoints.tablet}) {
		padding: 1.5rem;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		padding: 1.2rem;
	}
`;

export const EnterpriseLeftContainer = styled.div`
	width: 60%;

	& > div {
		display: flex;
		gap: 18px;

		p {
			font-size: 20px;
			font-weight: bold;
			line-height: 100%;

			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			white-space: pre-wrap;

			color: ${({ theme }) => theme.colors['text-color-primary']};
		}

		.actions {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;

			button {
				width: 18px;
				height: 18px;

				background: transparent;
				border: none;
			}
		}

		@media (max-width: ${deviceBreakpoints.tablet}) {
			flex-direction: column;
			gap: 10px;

			p {
				font-size: 18px;
			}

			.actions {
				width: max-content;
			}
		}
	}

	span {
		margin-top: 1rem;

		display: block;

		color: ${({ theme }) => theme.colors['text-color-secondary']};
		font-size: 0.875rem;
	}
`;

export const EnterpriseRightContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	@media (max-width: ${deviceBreakpoints.tablet}) {
		flex: 1;
		gap: 0.5rem;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		flex-direction: column;
	}
`;
