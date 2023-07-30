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

	const handleSetEnterprises = (enterprises_list: EnterpriseProps[]) => {
		setEnterprises(enterprises_list);
	};

	const handleToggleModal = () => {
		console.log('hello');
		setShowModal(previousShowModal => !previousShowModal);
	};

	// const handleGetEnterprises = async () => {
	// 	try {
	// 		const response: { data: EnterpriseProps[] } = await api.get(
	// 			'/enterprises?_limit=2&_page=1',
	// 		);
	// 		setEnterprises(response.data);
	// 	} catch (error) {
	// 		console.log({ error });
	// 	}
	// };

	const handleAddPageCount = async () => {
		console.log(totalPages);
		if (page <= Number(totalPages)) {
			setPage(currentPage => currentPage + 1);
		}
	};

	const handleGetEnterprises = useCallback(async () => {
		try {
			const enterpriseResponse: Response = await api.get(
				`/enterprises/?&_limit=2&_page=${String(page)}`,
			);
			const enterprisesData = enterpriseResponse.data;

			const limitPages =
				Number(enterpriseResponse.headers['x-total-count']) / 2;
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
	}, [page]);

	return (
		<EnterpriseContext.Provider
			value={{
				enterprises,
				handleSetEnterprises,
				showModal,
				onToggleModal: handleToggleModal,
				onGetEnterprises: handleGetEnterprises,
				onAddPageCount: handleAddPageCount,
			}}
		>
			{children}
		</EnterpriseContext.Provider>
	);
};
