// components/Modal.js

import React, { FormEvent, useEffect, useState } from 'react';
import {
	CloseButton,
	ModalContent,
	ModalForm,
	ModalInputWrapper,
	ModalTitle,
	ModalWrapper,
	// Select,
} from './styles';
import { Button } from '../Button';
import Image from 'next/image';
import { InputComponent } from '../Input';
import { api } from '@/lib/axios';
import {
	AddressProps,
	EnterpriseProps,
	PurposeProps,
	StatusProps,
} from '@/@types/Enterprise';
import { useForm } from 'react-hook-form';
import { SelectComponent } from '../Input/SelectComponent';
import { useEnterprise } from '@/hooks/useEnterprise';
import axios from 'axios';

interface ModalProps {
	onClose: () => void;
	mode?: 'create' | 'update';
	enterpriseId?: string | null;
	onSubmit?: () => Promise<void>;
}

interface Response {
	data: EnterpriseProps;
}

interface ViaCepResponse {
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
	complemento: string;
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
		label: 'Breve Lançamento',
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

export const Modal = ({
	onClose,
	mode,
	enterpriseId,
	onSubmit,
}: ModalProps) => {
	const [status, setStatus] = useState<StatusProps>('RELEASE');
	const [purpose, setPurpose] = useState<PurposeProps>('HOME');
	const [name, setName] = useState<string>('');
	const [cep, setCep] = useState<string>('');
	const [address, setAddress] = useState<AddressProps | null>(null);

	console.log(enterpriseId);

	const { handleSetEnterprises, enterprises, onGetEnterprises } =
		useEnterprise();

	const handleCreateEnterprise = async (e: FormEvent) => {
		e.preventDefault();

		const formatEnterprise: EnterpriseProps = {
			id: 'PA06',
			name: name,
			address: {
				city: 'city',
				street: 'street',
				district: 'utinga',
				state: 'bahia',
				number: '12',
				cep: '47901212',
			},
			purpose,
			status,
		};

		console.log({
			status,
			purpose,
			name,
			cep,
		});

		try {
			const createEnterpriseResponse: Response = await api.post(
				'/enterprises',
				formatEnterprise,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			console.log(createEnterpriseResponse.data);
			handleSetEnterprises([...enterprises, createEnterpriseResponse.data]);

			onClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateEnterprise = async (e: FormEvent) => {
		e.preventDefault();

		const formatEnterprise: EnterpriseProps = {
			id: 'PA08',
			name: name,
			address: {
				city: 'city',
				street: 'street',
				district: 'utinga',
				state: 'bahia',
				number: '12',
				cep: '47901212',
			},
			purpose,
			status,
		};

		console.log({
			status,
			purpose,
			name,
			cep,
		});

		try {
			const updateEnterpriseResponse: Response = await api.put(
				`/enterprises/${enterpriseId}`,
				formatEnterprise,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			console.log(updateEnterpriseResponse.data);
			await onGetEnterprises();

			onClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateFields = (enterprise: EnterpriseProps) => {
		setPurpose(enterprise.purpose);
		setStatus(enterprise.status);
		setName(enterprise.name);
		setCep(enterprise.address.cep);
	};

	useEffect(() => {
		const handleGetEnterprise = async () => {
			try {
				const enterpriseResponse: Response = await api.get(
					`/enterprises/${enterpriseId || 'PA02'}`,
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
			try {
				const addressResponse: { data: ViaCepResponse } = await api.get(
					`https://viacep.com.br/ws/${cep}/json/`,
					{
						baseURL: '',
					},
				);

				// setAddress({
				// 	cep,
				// 	city
				// })

				console.log(addressResponse);
			} catch (error) {
				console.log({ error });
			}
		};

		if (cep.length === 8) {
			getAddressData();
		}
	}, [cep]);

	return (
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
				<ModalTitle>Editar Empreendimento</ModalTitle>
				<ModalForm
					onSubmit={
						mode === 'create' ? handleCreateEnterprise : handleUpdateEnterprise
					}
				>
					<ModalInputWrapper>
						<SelectComponent
							options={enterpriseStatusOptions}
							value={status}
							onChange={(e: any) => setStatus(e.target.value)}
						/>
					</ModalInputWrapper>
					<ModalInputWrapper>
						<SelectComponent
							options={enterprisePurposeOptions}
							value={purpose}
							onChange={(e: any) => setPurpose(e.target.value)}
						/>
					</ModalInputWrapper>
					<ModalInputWrapper>
						<InputComponent
							placeholder='Nome do empreendimento'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</ModalInputWrapper>
					<ModalInputWrapper>
						<InputComponent
							placeholder='CEP'
							value={cep}
							onChange={e => setCep(e.target.value)}
						/>
					</ModalInputWrapper>
					<Button type='submit' buttonSize='2xl'>
						Atualizar
					</Button>
				</ModalForm>
			</ModalContent>
		</ModalWrapper>
	);
};
