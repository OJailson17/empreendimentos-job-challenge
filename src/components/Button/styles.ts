import { styled } from 'styled-components';

interface ButtonProps {
	fill: boolean;
	size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const buttonSizes = {
	sm: '',
	md: '7.375rem', // 118px
	lg: '11rem', // 176px
	xl: '11.9375rem', // 191px
	'2xl': '19.625rem', // 314px
};

export const ButtonComponent = styled.button<ButtonProps>`
	width: ${({ size }) => buttonSizes[size]};
	height: ${({ size }) => (size === 'md' ? '1.75rem' : '2.25rem')};
	padding: ${({ size }) => (size === 'md' ? '8px 24px' : '10px 40px')};

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;

	background: ${({ theme, fill }) =>
		fill ? `${theme.colors.primary}` : 'transparent'};
	border: ${({ theme, fill }) =>
		fill ? 'none' : `1px solid ${theme.colors['primary-light']}`};
	border-radius: 71px;
	color: ${({ theme, fill }) =>
		fill ? '#fff' : `${theme.colors['text-color-primary']}`};

	&:hover {
		transition: all ease-in 0.2s;

		background: ${({ theme, fill }) =>
			fill ? 'transparent' : `${theme.colors.primary}`};
		border: ${({ theme, fill }) =>
			fill ? `1px solid ${theme.colors['primary-light']}` : 'none'};
		color: ${({ theme, fill }) =>
			fill ? `${theme.colors['text-color-primary']}` : '#fff'};

		img {
			filter: invert(0.8);
		}
	}
`;
