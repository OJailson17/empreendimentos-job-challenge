import { EnterpriseContext } from '@/context/EnterpriseContext';
import { useContext } from 'react';

export const useEnterprise = () => useContext(EnterpriseContext);
