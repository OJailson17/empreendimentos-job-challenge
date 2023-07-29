import React, { useState } from 'react';
import { HeaderComponent } from './styles';
import { Button } from '../Button';
import { Modal } from '../Modal';

export const Header = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		console.log('hello');
		setShowModal(previousShowModal => !previousShowModal);
	};

	return (
		<HeaderComponent>
			<h1>Empreendimentos</h1>

			<Button buttonSize='lg' icon onClick={toggleModal}>
				Adicionar
			</Button>
			{showModal && <Modal onClose={toggleModal} />}
		</HeaderComponent>
	);
};
