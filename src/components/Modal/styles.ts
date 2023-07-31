import { deviceBreakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(48, 46, 69, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
`;

export const ModalContent = styled.div`
	width: 100%;
	max-width: 496px;
	padding: 22px 3.125rem 35px;
	position: relative;

	background-color: ${({ theme }) => theme.colors['background-white']};
	border-radius: 16px;
	/* height: 646px; */

	@media (max-width: ${deviceBreakpoints.desktop}) {
		width: 70%;
	}

	@media (max-width: ${deviceBreakpoints.tablet}) {
		width: 90%;
	}

	@media (max-width: ${deviceBreakpoints.mobile}) {
		padding: 1.375rem 2.5rem 2.1875rem;
	}
`;
export const ModalForm = styled.form`
	margin-top: 4.0625rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.address-info {
		width: 100%;
		height: 4.5rem;
		margin-bottom: 1.3125rem;
	}

	& > button {
		margin-top: 38px;
	}
`;

export const ModalTitle = styled.h2`
	font-family: Inter;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 100%; /* 18px */
	text-align: center;
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 19px;
	right: 17px;
	background-color: transparent;
	border: none;
	font-size: 20px;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalInputWrapper = styled.div`
	width: 100%;
	max-width: 396px;

	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

// export const Input = styled.input`
// 	padding: 5px;
// 	margin-bottom: 10px;
// `;
