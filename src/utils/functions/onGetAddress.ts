import { toast } from 'react-toastify';

import { api } from '@/lib/axios';

interface ViaCepResponse {
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
	complemento: string;
	erro?: boolean;
	cep: string;
}

interface Response {
	data: ViaCepResponse;
}

type GetAddressProps = {
	cep: string;
};

export const onGetAddress = async ({ cep }: GetAddressProps) => {
	try {
		const addressResponse: Response = await api.get(
			`https://viacep.com.br/ws/${cep}/json/`,
			{
				baseURL: '',
			},
		);

		if (addressResponse.data.erro) {
			toast('CEP Não encontrado', {
				theme: 'light',
				type: 'error',
				position: 'top-center',
				autoClose: 3000,
			});

			return {
				address: null,
			};
		}

		// remove hífen
		const formatCep = addressResponse.data.cep.split('-').join('');

		const formatAddress = {
			city: addressResponse.data.localidade,
			district: addressResponse.data.bairro,
			street: addressResponse.data.logradouro,
			state: addressResponse.data.uf,
			cep: formatCep,
		};

		return {
			address: formatAddress,
		};
	} catch (error) {
		toast('CEP Não encontrado', {
			theme: 'light',
			type: 'error',
			position: 'top-center',
			autoClose: 3000,
		});

		console.log({ error });
		return {
			address: null,
		};
	}
};
