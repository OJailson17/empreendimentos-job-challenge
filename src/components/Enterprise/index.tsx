import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { EnterpriseProps } from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';
import { api } from '@/lib/axios';

import { Button } from '../Button';
import { Modal } from '../Modal';
import {
	EnterpriseLeftContainer,
	EnterpriseRightContainer,
	EnterpriseWrapper,
} from './styles';

interface EnterpriseComponentProps {
	enterprise: EnterpriseProps;
}

const Status = {
	'SOON-RELEASE': 'Breve',
	RELEASE: 'Lançamento',
	BUILDING: 'Em obras',
	READY: 'Pronto',
};

const Purpose = {
	COMMERCIAL: 'Comercial',
	HOME: 'Residencial',
};

export const Enterprise = ({ enterprise }: EnterpriseComponentProps) => {
	const [showModal, setShowModal] = useState(false);
	const { enterprises, handleSetEnterprises } = useEnterprise();

	const handleToggleModal = () => {
		setShowModal(previousShowModal => !previousShowModal);
	};

	const handleDeleteEnterprise = async () => {
		try {
			await api.delete(`/enterprises/${enterprise.id}`);

			const formattedEnterprises = enterprises.filter(
				enterprise_el => enterprise_el.id !== enterprise.id,
			);

			toast('Deletado com sucesso', {
				theme: 'light',
				type: 'success',
				position: 'top-center',
				autoClose: 3000,
			});

			handleSetEnterprises(formattedEnterprises);
		} catch (error) {
			toast('Algo deu errado', {
				theme: 'light',
				type: 'error',
				position: 'top-center',
				autoClose: 3000,
			});
			console.log({ error });
		}
	};

	return (
		// Container
		<EnterpriseWrapper>
			{/* First inner container */}
			<EnterpriseLeftContainer>
				<div>
					<p>{enterprise.name}</p>
					{/* icons */}
					<div className='actions'>
						<button onClick={handleToggleModal}>
							<Image src='/assets/pen-icon.svg' alt='' width={18} height={18} />
						</button>
						<button onClick={handleDeleteEnterprise}>
							<Image
								src='/assets/trash-icon.svg'
								alt=''
								width={18}
								height={18}
							/>
						</button>
					</div>
				</div>

				{enterprise.address && (
					<span>
						{enterprise.address?.street}, {enterprise.address?.number} -{' '}
						{enterprise.address?.district}, {enterprise.address?.city}
					</span>
				)}
			</EnterpriseLeftContainer>

			{/* Second inner container */}
			<EnterpriseRightContainer>
				<Button fill={false}>{Status[enterprise.status]}</Button>
				<Button fill={false}>{Purpose[enterprise.purpose]}</Button>
			</EnterpriseRightContainer>

			{showModal && (
				<Modal
					onClose={handleToggleModal}
					mode='update'
					enterpriseId={enterprise.id}
				/>
			)}
		</EnterpriseWrapper>
	);
};
