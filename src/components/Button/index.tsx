/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { ReactNode } from 'react';

import { ButtonComponent } from './styles';

interface ButtonProps extends React.ComponentProps<'button'> {
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
	...rest
}: ButtonProps) => {
	return (
		<ButtonComponent fill={String(fill)} $buttonSize={buttonSize} {...rest}>
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
