import React, { FormEvent, useState } from 'react';
import {
	// IconContainer,
	// InputContainer,
	SearchBarContainer,
	// SearchBarWrapper,
} from './styles';
// import Image from 'next/image';
import { InputComponent } from '../Input';
import { api } from '@/lib/axios';
import { EnterpriseProps } from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';

interface Response {
	data: EnterpriseProps[];
}

export const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const { handleSetEnterprises } = useEnterprise();

	const handleSearchEnterprise = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const searchResponse: Response = await api.get(
				`/enterprises/?q=${searchQuery}`,
			);
			const searchQueryResults = searchResponse.data;

			handleSetEnterprises(searchQueryResults);
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<SearchBarContainer onSubmit={handleSearchEnterprise}>
			<InputComponent
				icon
				placeholder='Buscar'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
			/>
		</SearchBarContainer>
	);
};
