import { styled } from 'styled-components';

export const SearchBarContainer = styled.div`
	/* padding: 0 8.5rem 0 10.25rem; */
	/* background-color: red; */

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const InputContainer = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;

	.icon-container {
		position: absolute;
		top: 0;
		left: 0;
	}

	.input-wrapper {
		position: relative;
	}

	input {
		border: none;
		border-bottom: 1px solid #bbb8d9; /* Change the color and style as desired */
		padding-left: 25px; /* Ensure space for the icon */
		width: 100%; /* Set the desired width */
		outline: none;
		background-color: transparent;
	}

	.bottom-line {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #bbb8d9; /* Change the color as desired */
	}
`;
