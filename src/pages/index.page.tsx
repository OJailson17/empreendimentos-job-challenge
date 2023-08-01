/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

import { EnterpriseProps } from '@/@types/Enterprise';
import { Button } from '@/components/Button';
import { Enterprise } from '@/components/Enterprise';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { useEnterprise } from '@/hooks/useEnterprise';
import { api } from '@/lib/axios';

import { AppEnterprisesContainer, AppMainContainer } from './styles';

interface HomeProps {
	enterprises_list: EnterpriseProps[];
}

interface Response {
	data: EnterpriseProps[];
}

export default function Home({ enterprises_list }: HomeProps) {
	const { handleSetEnterprises, enterprises, onAddPageCount, isLastPage } =
		useEnterprise();

	useEffect(() => {
		handleSetEnterprises(enterprises_list);
	}, [enterprises_list]);

	return (
		<>
			<Head>
				<title>Empreendimentos</title>
			</Head>

			<Header />

			<SearchBar />

			<AppMainContainer>
				<AppEnterprisesContainer>
					{enterprises.map(enterprise => (
						<Enterprise key={enterprise?.id} enterprise={enterprise} />
					))}

					{enterprises.length <= 0 && (
						<p className='not-found'>Nenhum resultado</p>
					)}
				</AppEnterprisesContainer>

				{enterprises.length > 0 && !isLastPage && (
					<div className='load-more-btn'>
						<Button buttonSize='xl' onClick={onAddPageCount}>
							Carregar mais
						</Button>
					</div>
				)}
			</AppMainContainer>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	let enterprises: EnterpriseProps[] = [];

	try {
		const response: Response = await api.get('/enterprises?&_limit=10&_page=1');
		const enterprisesData = response.data;

		enterprises = enterprisesData;
	} catch (error) {
		console.log({ error });
	}

	return {
		props: {
			enterprises_list: enterprises,
		},
	};
};
