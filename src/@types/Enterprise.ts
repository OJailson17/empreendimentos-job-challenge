export type StatusProps = 'SOON-RELEASE' | 'RELEASE' | 'BUILDING' | 'READY';
export type PurposeProps = 'COMMERCIAL' | 'HOME';
export type AddressProps = {
	district: string;
	city: string;
	street: string;
	state: string;
	number: string;
	cep: string;
};

export type EnterpriseProps = {
	id?: string;
	name: string;
	status: StatusProps;
	purpose: PurposeProps;
	address: AddressProps | null;
};
