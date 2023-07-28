import styled from 'styled-components';

export const HeaderComponent = styled.header`
	width: 100%;
	height: 2.5rem;
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
`;
