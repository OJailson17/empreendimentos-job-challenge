import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { EnterpriseProps } from '@/@types/Enterprise';
import { useEnterprise } from '@/hooks/useEnterprise';
import { api } from '@/lib/axios';
import { onDeleteEnterprise } from '@/utils/functions/onDeleteEnterprise';

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
	const { onGetEnterprises } = useEnterprise();

	const handleToggleModal = () => {
		setShowModal(previousShowModal => !previousShowModal);
	};

	const handleDeleteEnterprise = async () => {
		if (enterprise.id) {
			const { success } = await onDeleteEnterprise({
				enterpriseId: enterprise.id,
			});

			if (success) {
				await onGetEnterprises();
			}
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
