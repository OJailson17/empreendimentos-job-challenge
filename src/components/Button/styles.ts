import { styled } from 'styled-components';

interface ButtonProps {
	fill: boolean;
	buttonSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const buttonSizes = {
	sm: '',
	md: '7.375rem', // 118px
	lg: '11rem', // 176px
	xl: '11.9375rem', // 191px
	'2xl': '19.625rem', // 314px
};

const getBackground = (theme: any, fill: boolean) =>
	fill ? theme.colors.primary : 'transparent';

const getBorder = (theme: any, fill: boolean) =>
	fill ? 'none' : `1px solid ${theme.colors['primary-light']}`;

const getColor = (theme: any, fill: boolean) =>
	fill ? '#fff' : theme.colors['text-color-primary'];

const getHoverBackground = (theme: any, fill: boolean) =>
	fill ? 'transparent' : theme.colors.primary;

const getHoverBorder = (theme: any, fill: boolean) =>
	fill ? `1px solid ${theme.colors['primary-light']}` : 'none';

const getHoverColor = (theme: any, fill: boolean) =>
	fill ? theme.colors['text-color-primary'] : '#fff';

export const ButtonComponent = styled.button<ButtonProps>`
	width: ${({ buttonSize }) => buttonSizes[buttonSize]};
	height: ${({ buttonSize }) => (buttonSize === 'md' ? '1.75rem' : '2.25rem')};
	padding: ${({ buttonSize }) =>
		buttonSize === 'md' ? '8px 24px' : '10px 40px'};

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;

	background: ${({ theme, fill }) => getBackground(theme, fill)};
	border: ${({ theme, fill }) => getBorder(theme, fill)};
	border-radius: 71px;
	color: ${({ theme, fill }) => getColor(theme, fill)};

	&:hover {
		transition: all ease-in 0.2s;
		background: ${({ theme, fill }) => getHoverBackground(theme, fill)};
		border: ${({ theme, fill }) => getHoverBorder(theme, fill)};
		color: ${({ theme, fill }) => getHoverColor(theme, fill)};

		img {
			filter: invert(0.8);
		}
	}
`;
