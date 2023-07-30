import { styled } from 'styled-components';

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
