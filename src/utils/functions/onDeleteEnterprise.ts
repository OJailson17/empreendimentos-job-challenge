import { toast } from 'react-toastify';

import { api } from '@/lib/axios';

type DeleteEnterpriseProps = {
	enterpriseId: string;
};

export const onDeleteEnterprise = async ({
	enterpriseId,
}: DeleteEnterpriseProps) => {
	try {
		await api.delete(`/enterprises/${enterpriseId}`);

		toast('Deletado com sucesso', {
			theme: 'light',
			type: 'success',
			position: 'top-center',
			autoClose: 3000,
		});

		return {
			success: true,
		};

		// handleSetEnterprises(formattedEnterprises);
	} catch (error) {
		toast('Algo deu errado', {
			theme: 'light',
			type: 'error',
			position: 'top-center',
			autoClose: 3000,
		});
		console.log({ error });
		return {
			success: false,
		};
	}
};
