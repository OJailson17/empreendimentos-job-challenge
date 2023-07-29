import React, { ReactNode } from 'react';
import {
	IconContainer,
	InputContainer,
	// InputMainContainer,
	InputWrapper,
	Select,
} from './styles';
import Image from 'next/image';

interface InputComponentProps extends React.ComponentProps<'input'> {
	icon?: boolean;
	select?: boolean;
	options?: string[];
}

export const InputComponent: React.FC<InputComponentProps> = ({
	icon = false,
	select,
	...rest
}: InputComponentProps) => {
	return (
		<InputWrapper>
			{icon && (
				<IconContainer>
					<Image src='/assets/search-icon.svg' alt='' width={16} height={16} />
				</IconContainer>
			)}
			<InputContainer>
				{select ? (
					<Select name='' id=''>
						<option value='soon-release'>Breve Laçamento</option>
						<option value='release'>Lançamento</option>
						<option value='building'>Em obras</option>
						<option value='ready'>Pronto pra morar</option>
					</Select>
				) : (
					<input type='text' {...rest} />
				)}
			</InputContainer>
		</InputWrapper>
		// </InputMainContainer>
	);
};
