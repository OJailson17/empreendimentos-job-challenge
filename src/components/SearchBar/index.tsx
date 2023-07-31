import React, { FormEvent, useState } from 'react';

import { EnterpriseProps } from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';
import { api } from '@/lib/axios';

import { InputComponent } from '../Input';
import { SearchBarContainer } from './styles';

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
