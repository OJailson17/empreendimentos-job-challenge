import { EnterpriseProps } from '@/@types/Enterprise';
import { ReactNode, createContext, useState } from 'react';

interface EnterpriseProviderProps {
	children: ReactNode;
}

interface EnterpriseContextProps {
	enterprises: EnterpriseProps[];
	handleSetEnterprises: (props: EnterpriseProps[]) => void;
}

export const EnterpriseContext = createContext({} as EnterpriseContextProps);

export const EnterpriseProvider = ({ children }: EnterpriseProviderProps) => {
	const [enterprises, setEnterprises] = useState<EnterpriseProps[]>([]);

	const handleSetEnterprises = (enterprises_list: EnterpriseProps[]) => {
		setEnterprises(enterprises_list);
	};

	return (
		<EnterpriseContext.Provider value={{ enterprises, handleSetEnterprises }}>
			{children}
		</EnterpriseContext.Provider>
	);
};
