import {
	EnterpriseLeftContainer,
	EnterpriseRightContainer,
	EnterpriseWrapper,
} from './styles';
import { Button } from '../Button';
import Image from 'next/image';
import { useEnterprise } from '@/hooks/useEnterprise';
import { api } from '@/lib/axios';
import { EnterpriseProps } from '@/@types/Enterprise';
import { useState } from 'react';
import { Modal } from '../Modal';

interface EnterpriseComponentProps {
	enterprise: EnterpriseProps;
}

const Status = {
	'SOON-RELEASE': 'Breve Lançamento',
	RELEASE: 'Lançamento',
	BUILDING: 'Em obras',
	READY: 'Pronto pra mmorar',
};

const Purpose = {
	COMMERCIAL: 'Comercial',
	HOME: 'Residencial',
};

export const Enterprise = ({ enterprise }: EnterpriseComponentProps) => {
	const [showModal, setShowModal] = useState(false);
	const { enterprises, handleSetEnterprises } = useEnterprise();

	// const { showModal, onToggleModal } = useEnterprise();

	const handleToggleModal = () => {
		console.log('hello');
		setShowModal(previousShowModal => !previousShowModal);
	};

	// console.log('component', enterprises);

	const handleDeleteEnterprise = async () => {
		try {
			await api.delete(`/enterprises/${enterprise.id}`);

			const formattedEnterprises = enterprises.filter(
				enterprise_el => enterprise_el.id !== enterprise.id,
			);

			handleSetEnterprises(formattedEnterprises);
		} catch (error) {
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

				<span>
					{enterprise.address.street}, {enterprise.address.number} -{' '}
					{enterprise.address.district}, {enterprise.address.city}
				</span>
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
