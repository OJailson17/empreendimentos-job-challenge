/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react';
import { ButtonComponent } from './styles';
import Image from 'next/image';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	fill?: boolean;
	icon?: boolean;
	buttonSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	fill = true,
	icon = false,
	buttonSize = 'md',
	children,
}: ButtonProps) => {
	return (
		<ButtonComponent fill={fill} size={buttonSize}>
			{children}
			{icon && (
				<Image
					src='/assets/plus-icon.svg'
					alt='plus sign'
					width={12}
					height={12}
				/>
			)}
		</ButtonComponent>
	);
};
