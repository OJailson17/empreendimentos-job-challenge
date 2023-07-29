// components/Modal.js

import React from 'react';
import {
	CloseButton,
	InputWrapper,
	ModalContent,
	ModalForm,
	ModalTitle,
	ModalWrapper,
	// Select,
} from './styles';
import { Button } from '../Button';
import Image from 'next/image';
import { InputComponent } from '../Input';
import CustomSelect from '../CustomSelect';
import { api } from '@/lib/axios';
import { EnterpriseProps } from '@/@types/Enterprise';
import { useForm } from 'react-hook-form';

interface ModalProps {
	onClose: () => void;
}

// const options = [
// 	{ value: 'option1', label: 'Option 1' },
// 	{ value: 'option2', label: 'Option 2' },
// 	{ value: 'option3', label: 'Option 3' },
// 	// Add more options as needed
// ];

export const Modal = ({ onClose }: ModalProps) => {
	const handleCreateEnterprise = async (e: any) => {
		e.preventDefault();

		const enterprise: EnterpriseProps = {
			id: 'PA04',
			name: 'enterprise test',
			address: {
				city: 'city',
				street: 'street',
				district: 'utinga',
				state: 'bahia',
				number: '12',
				cep: '47901212',
			},
			purpose: 'HOME',
			status: 'RELEASE',
		};

		try {
			const createEnterpriseResponse = await api.post(
				'/enterprises',
				enterprise,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			console.log(createEnterpriseResponse.data);
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
					<InputWrapper>
						<InputComponent select />
					</InputWrapper>
					<InputWrapper>
						<InputComponent select />
					</InputWrapper>
					<InputWrapper>
						<InputComponent placeholder='Nome do empreendimento' />
					</InputWrapper>
					<InputWrapper>
						<InputComponent placeholder='CEP' />
					</InputWrapper>
					<Button type='submit' buttonSize='2xl'>
						Atualizar
					</Button>
				</ModalForm>
			</ModalContent>
			/
		</ModalWrapper>
	);
};
