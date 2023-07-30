import React from 'react';
import { Select } from './styles';
import { InputWrapper } from '../styles';

interface Option {
	value: string;
	label: string;
}

interface SelectProps extends React.ComponentProps<'select'> {
	options: Option[];
}

export const SelectComponent: React.FC<SelectProps> = ({
	options,
	...rest
}) => {
	return (
		<InputWrapper>
			<Select {...rest}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		</InputWrapper>
	);
};
