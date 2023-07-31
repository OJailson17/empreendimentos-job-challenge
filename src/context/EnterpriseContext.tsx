/* eslint-disable react-hooks/exhaustive-deps */
import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react';

import { EnterpriseProps } from '@/@types/Enterprise';
import { api } from '@/lib/axios';

interface EnterpriseProviderProps {
	children: ReactNode;
}

interface EnterpriseContextProps {
	enterprises: EnterpriseProps[];
	handleSetEnterprises: (props: EnterpriseProps[]) => void;
	onToggleModal: () => void;
	showModal: boolean;
	onGetEnterprises: () => Promise<void>;
	onAddPageCount: () => void;
	isLastPage: boolean;
}

interface Response {
	data: EnterpriseProps;
	headers: {
		'x-total-count': string;
	};
}

export const EnterpriseContext = createContext({} as EnterpriseContextProps);

export const EnterpriseProvider = ({ children }: EnterpriseProviderProps) => {
	const [enterprises, setEnterprises] = useState<EnterpriseProps[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLastPage, setIsLastPage] = useState(false);

	const handleSetEnterprises = (enterprises_list: EnterpriseProps[]) => {
		setEnterprises(enterprises_list);
	};

	const handleToggleModal = () => {
		setShowModal(previousShowModal => !previousShowModal);
	};

	const handleAddPageCount = async () => {
		if (page < totalPages) {
			setPage(currentPage => currentPage + 1);
		}
	};

	const handleGetEnterprises = useCallback(async () => {
		try {
			const enterpriseResponse: Response = await api.get(
				`/enterprises/?&_limit=2&_page=${String(page)}`,
			);
			const enterprisesData = enterpriseResponse.data;
			const itemsPerPage = 2;

			const limitPages = Math.ceil(
				Number(enterpriseResponse.headers['x-total-count']) / itemsPerPage,
			);

			setTotalPages(limitPages);

			if (page >= limitPages) setIsLastPage(true);

			const formatEnterprises = enterprises.concat(enterprisesData);

			handleSetEnterprises(formatEnterprises);
		} catch (error) {
			console.log({ error });
		}
	}, [page]);

	useEffect(() => {
		handleGetEnterprises();
	}, [handleGetEnterprises, page]);

	return (
		<EnterpriseContext.Provider
			value={{
				enterprises,
				handleSetEnterprises,
				showModal,
				onToggleModal: handleToggleModal,
				onGetEnterprises: handleGetEnterprises,
				onAddPageCount: handleAddPageCount,
				isLastPage,
			}}
		>
			{children}
		</EnterpriseContext.Provider>
	);
};
