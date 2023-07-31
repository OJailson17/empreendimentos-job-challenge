import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';

import {
	AddressProps,
	EnterpriseProps,
	PurposeProps,
	StatusProps,
} from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { api } from '@/lib/axios';
import { onCreateEnterprise } from '@/utils/functions/createEnterprise';
import { onGetAddress } from '@/utils/functions/getAddress';
import { onUpdateEnterprise } from '@/utils/functions/updateEnterprise';

import { Button } from '../Button';
import { InputComponent } from '../Input';
import { SelectComponent } from '../Input/SelectComponent';
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

export const Modal = ({ onClose, mode, enterpriseId }: ModalProps) => {
	const [status, setStatus] = useState<StatusProps>('RELEASE');
	const [purpose, setPurpose] = useState<PurposeProps>('HOME');
	const [name, setName] = useState<string>('');
	const [cep, setCep] = useState<string>('');
	const [number, setNumber] = useState('');
	const [address, setAddress] = useState<AddressProps | null>(null);

	const screenWidth = useScreenWidth();

	const { handleSetEnterprises, enterprises, onGetEnterprises } =
		useEnterprise();

	const handleCreateEnterprise = async (e: FormEvent) => {
		e.preventDefault();

		let formattedAddress;

		if (address) {
			formattedAddress = {
				city: address.city,
				street: address.street,
				district: address.district,
				state: address.state,
				number,
				cep,
			};
		}

		const formatEnterprise: EnterpriseProps = {
			name: name,
			address: formattedAddress || null,
			purpose,
			status,
		};

		const { createdEnterprise, error } = await onCreateEnterprise({
			enterprise: formatEnterprise,
		});

		if (createdEnterprise)
			handleSetEnterprises([...enterprises, createdEnterprise]);
		onClose();
	};

	const handleUpdateEnterprise = async (e: FormEvent) => {
		e.preventDefault();

		let formattedAddress;

		if (address) {
			formattedAddress = {
				city: address.city,
				street: address.street,
				district: address.district,
				state: address.state,
				number,
				cep,
			};
		}

		const formatEnterprise: EnterpriseProps = {
			name: name,
			address: formattedAddress || null,
			purpose,
			status,
		};

		if (enterpriseId) {
			const { updatedEnterprise, error } = await onUpdateEnterprise({
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
		setPurpose(enterprise.purpose);
		setStatus(enterprise.status);
		setName(enterprise.name);

		if (enterprise.address) {
			setCep(enterprise.address.cep);
			setNumber(enterprise.address.number);
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
			const { address: addressData } = await onGetAddress({ cep });

			if (addressData) {
				setAddress({
					cep,
					number,
					city: addressData.city,
					district: addressData.district,
					state: addressData.state,
					street: addressData.street,
				});
			}
		};

		if (cep.length === 8) {
			getAddressData();
		}
	}, [cep, number]);

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
				<ModalTitle>
					{mode === 'update' ? 'Atualizar' : 'Criar'} Empreendimento
				</ModalTitle>
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
							required
						/>
					</ModalInputWrapper>
					<ModalInputWrapper>
						<SelectComponent
							options={enterprisePurposeOptions}
							value={purpose}
							onChange={(e: any) => setPurpose(e.target.value)}
							required
						/>
					</ModalInputWrapper>
					<ModalInputWrapper>
						<InputComponent
							placeholder='Nome do empreendimento'
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</ModalInputWrapper>
					<ModalInputWrapper>
						<InputComponent
							placeholder='CEP'
							value={cep}
							onChange={e => setCep(e.target.value)}
							required
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
							value={number}
							onChange={e => setNumber(String(e.target.value))}
							required
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
	);
};
