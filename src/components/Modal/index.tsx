/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AddressProps, EnterpriseProps } from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { api } from '@/lib/axios';
import { onCreateEnterprise } from '@/utils/functions/createEnterprise';
import { onGetAddress } from '@/utils/functions/getAddress';
import { onUpdateEnterprise } from '@/utils/functions/updateEnterprise';
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
		control,
		setValue,
		formState: { errors },
	} = useForm<EnterpriseFormType>({
		resolver: yupResolver(enterpriseSchema),
	});

	const watchCep = watch('cep');
	const watchNumber = watch('number');

	const screenWidth = useScreenWidth();

	const { handleSetEnterprises, enterprises, onGetEnterprises } =
		useEnterprise();

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

		const formatEnterprise: EnterpriseProps = {
			name: enterpriseFormData.name,
			address: formattedAddress || null,
			purpose: enterpriseFormData.purpose,
			status: enterpriseFormData.status,
		};

		const { createdEnterprise } = await onCreateEnterprise({
			enterprise: formatEnterprise,
		});

		if (createdEnterprise)
			handleSetEnterprises([...enterprises, createdEnterprise]);
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

		const formatEnterprise: EnterpriseProps = {
			name: enterpriseFormData.name,
			address: formattedAddress || null,
			purpose: enterpriseFormData.purpose,
			status: enterpriseFormData.status,
		};

		if (enterpriseId) {
			const { error } = await onUpdateEnterprise({
				enterprise: formatEnterprise,
				enterpriseId,
			});

			if (error) {
				console.log({ error });
				return;
			}

			await onGetEnterprises();
		}

		onClose();
	};

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

	useEffect(() => {
		const getAddressData = async () => {
			const { address: addressData } = await onGetAddress({
				cep: String(watchCep),
			});

			if (addressData) {
				setAddress({
					cep: String(watchCep),
					number: String(watchNumber),
					city: addressData.city,
					district: addressData.district,
					state: addressData.state,
					street: addressData.street,
				});
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
