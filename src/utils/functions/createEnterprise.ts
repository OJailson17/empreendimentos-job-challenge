import { toast } from 'react-toastify';

import { EnterpriseProps } from '@/@types/Enterprise';
import { api } from '@/lib/axios';

type Response = {
	data: EnterpriseProps;
};

type CreateEnterpriseProps = {
	enterprise: EnterpriseProps;
};

export const onCreateEnterprise = async ({
	enterprise,
}: CreateEnterpriseProps) => {
	try {
		const createEnterpriseResponse: Response = await api.post(
			'/enterprises',
			enterprise,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		toast('Empreendimento Criado', {
			theme: 'light',
			type: 'success',
			position: 'top-center',
			autoClose: 3000,
		});

		return {
			createdEnterprise: createEnterpriseResponse.data,
		};
	} catch (error) {
		console.log(error);
		toast('Algo deu errado!', {
			theme: 'light',
			type: 'error',
			position: 'top-center',
			autoClose: 3000,
		});
		return {
			error,
		};
	}
};
