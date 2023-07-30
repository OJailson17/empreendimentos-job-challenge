/* eslint-disable react-hooks/exhaustive-deps */
import { EnterpriseProps } from '@/@types/Enterprise';
import { api } from '@/lib/axios';
import { AxiosRequestHeaders, AxiosResponseHeaders } from 'axios';
import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react';

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
	const [totalPages, setTotalPages] = useState('1');
	const [isLastPage, setIsLastPage] = useState(false);

	const handleSetEnterprises = (enterprises_list: EnterpriseProps[]) => {
		setEnterprises(enterprises_list);
	};

	const handleToggleModal = () => {
		setShowModal(previousShowModal => !previousShowModal);
	};

	const handleAddPageCount = async () => {
		console.log(totalPages);

		if (page === Number(totalPages)) {
			setIsLastPage(true);
			return;
		}

		// if (page <= Number(totalPages)) {
		setPage(currentPage => currentPage + 1);
		// }
	};

	const handleGetEnterprises = useCallback(async () => {
		try {
			const enterpriseResponse: Response = await api.get(
				`/enterprises/?&_limit=5&_page=${String(page)}`,
			);
			const enterprisesData = enterpriseResponse.data;
			const itemsPerPage = 5;

			const limitPages = Math.ceil(
				Number(enterpriseResponse.headers['x-total-count']) / itemsPerPage,
			);
			setTotalPages(String(limitPages));

			const formatEnterprises = enterprises.concat(enterprisesData);

			handleSetEnterprises(formatEnterprises);
			console.log({ formatEnterprises });
		} catch (error) {
			console.log({ error });
		}
	}, [page]);

	useEffect(() => {
		if (page > 1) {
			handleGetEnterprises();
		}
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
