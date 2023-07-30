import { api } from '@/lib/axios';

interface ViaCepResponse {
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
	complemento: string;
	error?: boolean;
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

		if (addressResponse.data.error) {
			return {
				address: null,
				// error: addressResponse.data.error
			};
		}

		const formatAddress = {
			city: addressResponse.data.localidade,
			district: addressResponse.data.bairro,
			street: addressResponse.data.logradouro,
			state: addressResponse.data.uf,
		};

		return {
			address: formatAddress,
		};
	} catch (error) {
		console.log({ error });
		return {
			address: null,
		};
	}
};
