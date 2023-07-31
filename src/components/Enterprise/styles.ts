import { deviceBreakpoints } from '@/styles/breakpoints';
import { styled } from 'styled-components';

export const EnterpriseWrapper = styled.div`
	/* height: 7.125rem; */
	/* margin: 0 auto; */
	padding: 2rem;
	max-width: 1400px;

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
	/* background: red; */

	& > div {
		display: flex;
		gap: 18px;

		p {
			/* width: 80%; */
			font-size: 20px;
			font-weight: bold;
			line-height: 100%;

			/* text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden; */

			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3; /* start showing ellipsis when 3rd line is reached */
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
		display: block;
		margin-top: 1rem;

		color: ${({ theme }) => theme.colors['text-color-secondary']};
		font-size: 0.875rem;
	}
`;

export const EnterpriseRightContainer = styled.div`
	/* width: 100%; */

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	@media (max-width: ${deviceBreakpoints.tablet}) {
		gap: 0.5rem;
		flex: 1;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		flex-direction: column;
	}
`;
