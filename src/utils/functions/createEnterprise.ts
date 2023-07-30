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

		return {
			createdEnterprise: createEnterpriseResponse.data,
		};
	} catch (error) {
		console.log(error);
		return {
			error,
		};
	}
};
