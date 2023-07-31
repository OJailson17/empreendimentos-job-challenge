import React, { useState } from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { HeaderComponent } from './styles';

export const Header = () => {
	const [showModal, setShowModal] = useState(false);

	const screenWidth = useScreenWidth();

	const handleToggleModal = () => {
		setShowModal(previousShowModal => !previousShowModal);
	};

	return (
		<HeaderComponent>
			<h1>Empreendimentos</h1>

			<Button
				buttonSize={screenWidth && screenWidth < 500 ? 'sm' : 'xl'}
				icon
				onClick={handleToggleModal}
			>
				{/* Adicionar */}
				{screenWidth && screenWidth > 500 && 'Adicionar'}
			</Button>
			{showModal && <Modal onClose={handleToggleModal} mode='create' />}
		</HeaderComponent>
	);
};
