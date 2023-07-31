import * as yup from 'yup';

export const enterpriseSchema = yup.object({
	name: yup
		.string()
		.min(6, 'Mínimo de 6 caracteres')
		.trim()
		.required('Campo obrigatório'),
	cep: yup
		.string()
		.min(8, 'Mínimo de 8 caracteres')
		.max(8, 'Máximo de 8 caracteres')
		.required('Campo obrigatório'),
	number: yup
		.number()
		.required('Campo obrigatório')
		.typeError('Campo precisa ser um número'),
	status: yup
		.string()
		.oneOf(['SOON-RELEASE', 'RELEASE', 'BUILDING', 'READY'])
		.strict()
		.default('RELEASE')
		.required('Campo obrigatório'),
	purpose: yup
		.string()
		.oneOf(['HOME', 'COMMERCIAL'])
		.strict()
		.required('Campo obrigatório')
		.default('HOME'),
});

export type EnterpriseFormType = yup.InferType<typeof enterpriseSchema>;
