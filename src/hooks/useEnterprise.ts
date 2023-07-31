import { useContext } from 'react';

import { EnterpriseContext } from '@/context/EnterpriseContext';

export const useEnterprise = () => useContext(EnterpriseContext);
