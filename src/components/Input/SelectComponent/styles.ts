import { styled } from 'styled-components';

export const Select = styled.select`
	width: 100%;
	height: 100%;
	margin-bottom: 10px;

	background-color: transparent;
	border: none;
	font-size: 1rem;
	color: ${({ theme }) => theme.colors['text-color-primary']};

	outline: none;

	option {
		font-size: 1rem;
	}
`;
