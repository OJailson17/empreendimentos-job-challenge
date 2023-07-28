import { styled } from 'styled-components';

export const EnterpriseWrapper = styled.div`
	height: 7.125rem;
	padding: 2rem;

	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	background-color: ${({ theme }) => theme.colors['background-white']};
	box-shadow: 0px 2px 4px 0px rgba(48, 46, 69, 0.06);
	border-radius: 8px;
`;

export const EnterpriseLeftContainer = styled.div`
	& > div {
		display: flex;
		gap: 18px;

		p {
			font-size: 20px;
			font-weight: bold;
			line-height: 100%;

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
	}

	span {
		display: block;
		margin-top: 1rem;

		color: ${({ theme }) => theme.colors['text-color-secondary']};
		font-size: 0.875rem;
	}
`;

export const EnterpriseRightContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;
