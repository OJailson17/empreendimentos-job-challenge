import Image from 'next/image';
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import {
	ErrorMessage,
	IconContainer,
	InputContainer,
	InputWrapper,
} from './styles';

interface InputComponentProps extends React.ComponentProps<'input'> {
	icon?: boolean;
	options?: string[];
	error?: FieldError;
}

//
const InputComponentBase: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputComponentProps
> = ({ icon = false, error, ...rest }, ref) => {
	return (
		<InputWrapper style={error ? { borderBottomColor: '#ff4444' } : {}}>
			{icon && (
				<IconContainer>
					<Image src='/assets/search-icon.svg' alt='' width={16} height={16} />
				</IconContainer>
			)}
			<InputContainer>
				<input ref={ref} type='text' {...rest} />
				{error && <ErrorMessage>{error.message}</ErrorMessage>}
			</InputContainer>
		</InputWrapper>
	);
};

InputComponentBase.displayName = 'InputComponent';

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
	InputComponentBase,
);
