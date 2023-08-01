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
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLastPage, setIsLastPage] = useState(false);

	const handleSetEnterprises = (enterprises_list: EnterpriseProps[]) => {
		setEnterprises(enterprises_list);
	};

	const handleAddPageCount = () => {
		if (page < totalPages) {
			setPage(currentPage => currentPage + 1);
		}
	};

	const handleGetEnterprises = useCallback(async () => {
		const itemsPerPage = 3;

		try {
			const enterpriseResponse: Response = await api.get(
				`/enterprises/?&_limit=${itemsPerPage}&_page=${String(page)}`,
			);
			const enterprisesData = enterpriseResponse.data;

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
				onGetEnterprises: handleGetEnterprises,
				onAddPageCount: handleAddPageCount,
				isLastPage,
			}}
		>
			{children}
		</EnterpriseContext.Provider>
	);
};
