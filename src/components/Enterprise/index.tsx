import React from 'react';
import {
	EnterpriseLeftContainer,
	EnterpriseRightContainer,
	EnterpriseWrapper,
} from './styles';
import { Button } from '../Button';
import Image from 'next/image';

export const Enterprise = () => {
	return (
		// Container
		<EnterpriseWrapper>
			{/* First inner container */}
			<EnterpriseLeftContainer>
				<div>
					<p>Villega Vila Velha</p>
					{/* icons */}
					<div className='actions'>
						<button>
							<Image src='/assets/pen-icon.svg' alt='' width={18} height={18} />
						</button>
						<button>
							<Image
								src='/assets/trash-icon.svg'
								alt=''
								width={18}
								height={18}
							/>
						</button>
					</div>
				</div>

				<span>Rua Dório Silva, 100 - Vila Guaranhuns, Vila Velha</span>
			</EnterpriseLeftContainer>

			{/* Second inner container */}
			<EnterpriseRightContainer>
				<Button fill={false}>Lançamento</Button>
				<Button fill={false}>Residencial</Button>
			</EnterpriseRightContainer>
		</EnterpriseWrapper>
	);
};
