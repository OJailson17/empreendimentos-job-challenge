import React from 'react';
import { HeaderComponent } from './styles';
import { Button } from '../Button';

export const Header = () => {
	return (
		<HeaderComponent>
			<h1>Empreendimentos</h1>

			<Button buttonSize='lg' icon>
				Adicionar
			</Button>
		</HeaderComponent>
	);
};
