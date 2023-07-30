import React, { useState } from 'react';
import { HeaderComponent } from './styles';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { useEnterprise } from '@/hooks/useEnterprise';

export const Header = () => {
	const [showModal, setShowModal] = useState(false);

	// const { showModal, onToggleModal } = useEnterprise();

	const handleToggleModal = () => {
		console.log('hello');
		setShowModal(previousShowModal => !previousShowModal);
	};

	return (
		<HeaderComponent>
			<h1>Empreendimentos</h1>

			<Button buttonSize='lg' icon onClick={handleToggleModal}>
				Adicionar
			</Button>
			{showModal && <Modal onClose={handleToggleModal} mode='create' />}
		</HeaderComponent>
	);
};
