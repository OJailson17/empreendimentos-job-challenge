import { Enterprise } from '@/components/Enterprise';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { api } from '@/lib/axios';
import { GetServerSideProps } from 'next';

interface Enterprise {
	id: string;
	name: string;
	status: string;
	purpose: string;
	address: {
		district: string;
		city: string;
		street: string;
		state: string;
		number: string;
		cep: string;
	};
}

interface HomeProps {
	enterprises: Enterprise[];
}

interface Response {
	data: Enterprise[];
}

export default function Home({ enterprises }: HomeProps) {
	return (
		<>
			<Header />

			{/* Search bar */}
			<SearchBar />

			{/* list */}
			<main
				style={{
					padding: '0 8.5rem 0 10.25rem',
					marginTop: '3.6875rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
				}}
			>
				<Enterprise />
				<Enterprise />
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	let enterprises: Enterprise[] = [];

	try {
		const response: Response = await api.get('/enterprises');
		const enterprisesData = response.data;

		enterprises = enterprisesData;
	} catch (error) {
		console.log({ error });
	}

	return {
		props: {
			enterprises,
		},
	};
};
