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
		console.log(updateEnterpriseResponse.data);

		return {
			updatedEnterprise: updateEnterpriseResponse.data,
		};
	} catch (error) {
		console.log(error);
		return {
			error,
		};
	}
};
