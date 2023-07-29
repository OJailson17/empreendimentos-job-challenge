/* eslint-disable react-hooks/exhaustive-deps */
import { Enterprise } from '@/components/Enterprise';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { api } from '@/lib/axios';
import { GetServerSideProps } from 'next';
import { AppEnterprisesContainer, AppMainContainer } from './styles';
import { Button } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { useEnterprise } from '@/hooks/useEnterprise';
import { EnterpriseProps } from '@/@types/Enterprise';

interface HomeProps {
	enterprises_list: EnterpriseProps[];
}

interface Response {
	data: EnterpriseProps[];
}

export default function Home({ enterprises_list }: HomeProps) {
	// const [enterprises, setEnterprises] =
	// 	useState<Enterprise[]>(enterprises_list);
	const [page, setPage] = useState(1);

	const { handleSetEnterprises, enterprises } = useEnterprise();

	const handleLoadEnterprises = useCallback(async () => {
		try {
			const enterpriseResponse: Response = await api.get(
				`/enterprises/?&_limit=2&_page=${String(page)}`,
			);
			const enterprisesData = enterpriseResponse.data;

			const formatEnterprises = enterprises.concat(enterprisesData);

			handleSetEnterprises(formatEnterprises);
			console.log({ formatEnterprises });
		} catch (error) {
			console.log({ error });
		}
	}, [page]);

	const handleAddPageCount = async () => {
		setPage(currentPage => currentPage + 1);
	};

	useEffect(() => {
		const fetchEnterprises = async () => {
			await handleLoadEnterprises();
		};

		if (page > 1) {
			fetchEnterprises();
		}
	}, [handleLoadEnterprises, page]);

	useEffect(() => {
		handleSetEnterprises(enterprises_list);
	}, [enterprises_list]);

	return (
		<>
			<Header />

			<SearchBar />

			<AppMainContainer>
				<AppEnterprisesContainer>
					{enterprises.map(enterprise => (
						<Enterprise key={enterprise?.id} enterprise={enterprise} />
					))}
				</AppEnterprisesContainer>

				<div className='load-more-btn'>
					<Button buttonSize='xl' onClick={handleAddPageCount}>
						Carregar mais
					</Button>
				</div>
			</AppMainContainer>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	let enterprises: EnterpriseProps[] = [];

	try {
		const response: Response = await api.get('/enterprises?_limit=2&_page=1');
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
