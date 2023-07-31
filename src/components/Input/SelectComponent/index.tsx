import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { InputWrapper } from '../styles';
import { ErrorMessage, Select } from './styles';

interface Option {
	value: string;
	label: string;
}

interface SelectProps extends React.ComponentProps<'select'> {
	options: Option[];
	error?: FieldError;
}

const SelectComponentBase: React.ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectProps
> = ({ options, error, ...rest }, ref) => {
	return (
		<InputWrapper>
			<Select {...rest} ref={ref}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
			{error && <ErrorMessage>{error.message}</ErrorMessage>}
		</InputWrapper>
	);
};

SelectComponentBase.displayName = 'SelectComponent';

export const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
	SelectComponentBase,
);
