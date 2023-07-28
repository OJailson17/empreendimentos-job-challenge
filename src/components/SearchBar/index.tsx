import React from 'react';
import { InputContainer, SearchBarContainer } from './styles';
import Image from 'next/image';

export const SearchBar = () => {
	return (
		<SearchBarContainer>
			<InputContainer className='input-container'>
				<div className='icon-container'>
					<i className='icon'>
						<Image
							src='/assets/search-icon.svg'
							alt=''
							width={16}
							height={16}
						/>
					</i>
				</div>
				<div className='input-wrapper'>
					<input type='text' placeholder='Your Placeholder' />
					<div className='bottom-line'></div>
				</div>
			</InputContainer>
		</SearchBarContainer>
	);
};
