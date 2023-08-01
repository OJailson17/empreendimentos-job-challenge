/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AddressProps, EnterpriseProps } from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { api } from '@/lib/axios';
import { onCreateEnterprise } from '@/utils/functions/onCreateEnterprise';
import { onGetAddress } from '@/utils/functions/onGetAddress';
import { onUpdateEnterprise } from '@/utils/functions/onUpdateEnterprise';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../Button';
import { InputComponent } from '../Input';
import { SelectComponent } from '../Input/SelectComponent';
import { EnterpriseFormType, enterpriseSchema } from './enterpriseSchema';
import {
	CloseButton,
	ModalContent,
	ModalForm,
	ModalInputWrapper,
	ModalTitle,
	ModalWrapper,
} from './styles';

interface ModalProps {
	onClose: () => void;
	mode?: 'create' | 'update';
	enterpriseId?: string | null;
}

const enterprisePurposeOptions = [
	{
		value: 'HOME',
		label: 'Residencial',
	},
	{
		value: 'COMMERCIAL',
		label: 'Comercial',
	},
];

const enterpriseStatusOptions = [
	{
		value: 'SOON-RELEASE',
		label: 'Lançamento Breve',
	},
	{
		value: 'RELEASE',
		label: 'Lançamento',
	},
	{
		value: 'BUILDING',
		label: 'Em obras',
	},
	{
		value: 'READY',
		label: 'Pronto pra morar',
	},
];

export const Modal = ({ onClose, mode, enterpriseId }: ModalProps) => {
	const [address, setAddress] = useState<AddressProps | null>(null);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<EnterpriseFormType>({
		resolver: yupResolver(enterpriseSchema),
	});

	// watch cep and number input values to get address data
	const watchCep = watch('cep');
	const watchNumber = watch('number');

	// get the screen viewport to change submit button size
	const screenWidth = useScreenWidth();

	const { onGetEnterprises } = useEnterprise();

	const handleCreateEnterprise = async (
		enterpriseFormData: EnterpriseFormType,
	) => {
		let formattedAddress: AddressProps | null = null;

		if (address) {
			formattedAddress = {
				city: address.city,
				street: address.street,
				district: address.district,
				state: address.state,
				number: String(enterpriseFormData.number),
				cep: enterpriseFormData.cep,
			};
		}

		const formattedEnterprise: EnterpriseProps = {
			name: enterpriseFormData.name,
			address: formattedAddress || null,
			purpose: enterpriseFormData.purpose,
			status: enterpriseFormData.status,
		};

		const { createdEnterprise } = await onCreateEnterprise({
			enterprise: formattedEnterprise,
		});

		if (createdEnterprise) await onGetEnterprises();

		onClose();
	};

	const handleUpdateEnterprise = async (
		enterpriseFormData: EnterpriseFormType,
	) => {
		let formattedAddress: AddressProps | null = null;

		if (address) {
			formattedAddress = {
				city: address.city,
				street: address.street,
				district: address.district,
				state: address.state,
				number: String(enterpriseFormData.number),
				cep: enterpriseFormData.cep,
			};
		}

		const formattedEnterprise: EnterpriseProps = {
			name: enterpriseFormData.name,
			address: formattedAddress || null,
			purpose: enterpriseFormData.purpose,
			status: enterpriseFormData.status,
		};

		if (enterpriseId) {
			await onUpdateEnterprise({
				enterprise: formattedEnterprise,
				enterpriseId,
			});

			await onGetEnterprises();
		}

		onClose();
	};

	// Update the input fields after get enterprise data from api
	const handleUpdateFields = (enterprise: EnterpriseProps) => {
		setValue('purpose', enterprise.purpose, {
			shouldValidate: true,
		});
		setValue('status', enterprise.status, {
			shouldValidate: true,
		});
		setValue('name', enterprise.name, {
			shouldValidate: true,
		});

		if (enterprise.address) {
			setValue('cep', enterprise.address?.cep, {
				shouldValidate: true,
			});
			setValue('number', Number(enterprise.address?.number), {
				shouldValidate: true,
			});
		}
	};

	// If modal is with update mode ,then get the enterprise data using the id
	useEffect(() => {
		const handleGetEnterprise = async () => {
			try {
				const enterpriseResponse: { data: EnterpriseProps } = await api.get(
					`/enterprises/${enterpriseId}`,
				);

				handleUpdateFields(enterpriseResponse.data);
			} catch (error) {
				console.log({ error });
			}
		};

		if (mode === 'update' && enterpriseId) {
			handleGetEnterprise();
		}
	}, [mode, enterpriseId]);

	// When user type 8 digits on cep input, get the address data from api
	useEffect(() => {
		const getAddressData = async () => {
			const { address: addressData } = await onGetAddress({
				cep: String(watchCep),
			});

			// don't save address if cep does not exist
			if (addressData) {
				setAddress({
					cep: addressData.cep,
					number: String(watchNumber),
					city: addressData.city,
					district: addressData.district,
					state: addressData.state,
					street: addressData.street,
				});
			} else {
				setAddress(null);
			}
		};

		if (String(watchCep).length === 8) {
			getAddressData();
		}
	}, [watchCep]);

	return (
		<>
			<ModalWrapper>
				<ModalContent>
					<CloseButton onClick={onClose}>
						<Image
							src={'/assets/close-icon.svg'}
							alt='close button'
							width={24}
							height={24}
						/>
					</CloseButton>
					<ModalTitle>
						{mode === 'update' ? 'Atualizar' : 'Criar'} Empreendimento
					</ModalTitle>
					<ModalForm
						autoComplete='off'
						onSubmit={
							mode === 'create'
								? handleSubmit(handleCreateEnterprise)
								: handleSubmit(handleUpdateEnterprise)
						}
					>
						<ModalInputWrapper>
							<SelectComponent
								options={enterpriseStatusOptions}
								error={errors?.status}
								{...register('status')}
							/>
						</ModalInputWrapper>
						<ModalInputWrapper>
							<SelectComponent
								options={enterprisePurposeOptions}
								error={errors?.purpose}
								{...register('purpose')}
							/>
						</ModalInputWrapper>
						<ModalInputWrapper>
							<InputComponent
								placeholder='Nome do empreendimento'
								{...register('name')}
								error={errors?.name}
							/>
						</ModalInputWrapper>
						<ModalInputWrapper>
							<InputComponent
								placeholder='CEP'
								type='number'
								{...register('cep')}
								error={errors?.cep}
							/>
						</ModalInputWrapper>
						<div className='address-info'>
							{address && (
								<div>
									<p>{address.street}</p>
									<p>{address.district}</p>
									<p>{address.city}</p>
									<p>{address.state}</p>
								</div>
							)}
						</div>
						<ModalInputWrapper>
							<InputComponent
								placeholder='Número'
								type='number'
								{...register('number')}
								error={errors?.number}
							/>
						</ModalInputWrapper>
						<Button
							type='submit'
							buttonSize={screenWidth && screenWidth < 500 ? 'xl' : '2xl'}
						>
							{mode === 'update' ? 'Atualizar' : 'Criar'}
						</Button>
					</ModalForm>
				</ModalContent>
			</ModalWrapper>
		</>
	);
};
