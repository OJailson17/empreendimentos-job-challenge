import { toast } from 'react-toastify';

import { EnterpriseProps } from '@/@types/Enterprise';
import { api } from '@/lib/axios';

type Response = {
	data: EnterpriseProps;
};

type UpdateEnterpriseProps = {
	enterpriseId: string;
	enterprise: EnterpriseProps;
};

export const onUpdateEnterprise = async ({
	enterprise,
	enterpriseId,
}: UpdateEnterpriseProps) => {
	try {
		const updateEnterpriseResponse: Response = await api.put(
			`/enterprises/${enterpriseId}`,
			enterprise,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		toast('Salvo', {
			theme: 'light',
			type: 'success',
			position: 'top-center',
			autoClose: 3000,
		});

		return {
			updatedEnterprise: updateEnterpriseResponse.data,
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
