import { styled } from 'styled-components';

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 40px;

	display: flex;
	align-items: center;
	gap: 16px;
	border: none;
	border-bottom: 2px solid #bbb8d9;
`;

export const IconContainer = styled.div`
	height: 100%;
	/*   background: yellow; */

	display: flex;
	align-items: center;

	img {
		width: 16px;
		height: 16px;
	}
`;

export const InputContainer = styled.div`
	width: 100%;
	height: 90%;

	input {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;

		background: transparent;
		border: none;
		color: ${({ theme }) => theme.colors['text-color-primary']};
		font-size: 1rem;

		&:focus {
			outline: none;
		}

		&::placeholder {
			font-size: 1rem;
			color: ${({ theme }) => theme.colors['text-color-primary']};
		}

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
`;
