import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors['text-color-primary']};
}

button {
  cursor: pointer;
}
`;

export const displayFlexStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;
