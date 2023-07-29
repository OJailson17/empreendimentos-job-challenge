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
	}
`;

export const Select = styled.select`
	width: 100%;
	height: 100%;
	/* padding: 5px; */
	margin-bottom: 10px;
	border: none;
	/* border-bottom: 2px solid #bbb8d9; */
	background-color: transparent;
	font-size: 1rem;
	color: ${({ theme }) => theme.colors['text-color-primary']};
	outline: none;
	/* background-color: red; */

	/* Styles for the dropdown options */
	option {
		/* Customize the background and text color of the options */
		font-size: 1rem;
		/* Add any additional styling you want for the options here */
	}
`;
