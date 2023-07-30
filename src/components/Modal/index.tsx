// components/Modal.js

import React, { FormEvent, useState } from 'react';
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
	EnterpriseProps,
	PurposeProps,
	StatusProps,
} from '@/@types/Enterprise';
import { useForm } from 'react-hook-form';
import { SelectComponent } from '../Input/SelectComponent';
import { useEnterprise } from '@/hooks/useEnterprise';

interface ModalProps {
	onClose: () => void;
}

interface Response {
	data: EnterpriseProps;
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

export const Modal = ({ onClose }: ModalProps) => {
	const [status, setStatus] = useState<StatusProps>('RELEASE');
	const [purpose, setPurpose] = useState<PurposeProps>('HOME');
	const [name, setName] = useState<string>('');
	const [cep, setCep] = useState<string>('');

	const { handleSetEnterprises, enterprises } = useEnterprise();

	const handleCreateEnterprise = async (e: FormEvent) => {
		e.preventDefault();

		const formatEnterprise: EnterpriseProps = {
			id: 'PA05',
			name: name,
			address: {
				city: 'city',
				street: 'street',
				district: 'utinga',
				state: 'bahia',
				number: '12',
				cep: '47901212',
			},
			purpose: purpose,
			status: status,
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

	return (
		<ModalWrapper>
			<ModalContent>
				<CloseButton onClick={onClose} formMethod='dialog'>
					<Image
						src={'/assets/close-icon.svg'}
						alt='close button'
						width={24}
						height={24}
					/>
				</CloseButton>
				<ModalTitle>Editar Empreendimento</ModalTitle>
				<ModalForm onSubmit={handleCreateEnterprise}>
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
			/
		</ModalWrapper>
	);
};
