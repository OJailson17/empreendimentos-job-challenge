import styled from 'styled-components';

export const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalContent = styled.div`
	width: 100%;
	max-width: 496px;
	padding: 22px 3.125rem 35px;
	position: relative;

	background-color: ${({ theme }) => theme.colors['background-white']};
	border-radius: 16px;
	/* height: 646px; */
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
