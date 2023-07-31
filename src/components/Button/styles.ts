import { styled } from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

import { displayFlexStyle } from '@/styles/global';

interface ButtonProps {
	fill: string;
	$buttonSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const buttonSizes = {
	sm: '1rem',
	md: '7.375rem', // 118px
	lg: '11rem', // 176px
	xl: '11.9375rem', // 191px
	'2xl': '19.625rem', // 314px
};

// fill props need to be converted to string to avoid warning of boolean values on DOM
const getBackground = (theme: DefaultTheme, fill: string) =>
	fill === 'true' ? theme.colors.primary : 'transparent';

const getBorder = (theme: DefaultTheme, fill: string) =>
	fill === 'true' ? 'none' : `1px solid ${theme.colors['primary-light']}`;

const getColor = (theme: DefaultTheme, fill: string) =>
	fill === 'true' ? '#fff' : theme.colors['text-color-primary'];

const getHoverBackground = (theme: DefaultTheme, fill: string) =>
	fill === 'true' ? 'transparent' : theme.colors.primary;

const getHoverBorder = (theme: DefaultTheme, fill: string) =>
	fill === 'true' ? `1px solid ${theme.colors['primary-light']}` : 'none';

const getHoverColor = (theme: DefaultTheme, fill: string) =>
	fill === 'true' ? theme.colors['text-color-primary'] : '#fff';

export const ButtonComponent = styled.button<ButtonProps>`
	width: ${({ $buttonSize }) => buttonSizes[$buttonSize]};
	height: ${({ $buttonSize }) =>
		$buttonSize === 'md' ? '1.75rem' : '2.25rem'};
	padding: ${({ $buttonSize }) =>
		$buttonSize === 'md' ? '8px 24px' : '10px 40px'};

	${displayFlexStyle};
	gap: 8px;

	background: ${({ theme, fill }) => getBackground(theme, fill)};
	border: ${({ theme, fill }) => getBorder(theme, fill)};
	border-radius: 71px;
	color: ${({ theme, fill }) => getColor(theme, fill)};

	&:hover {
		background: ${({ theme, fill }) => getHoverBackground(theme, fill)};
		border: ${({ theme, fill }) => getHoverBorder(theme, fill)};
		color: ${({ theme, fill }) => getHoverColor(theme, fill)};
		transition: all ease-in 0.2s;

		img {
			filter: invert(0.8);
		}
	}
`;
