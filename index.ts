export interface Agent {
  id: string;
  name: string;
  monthlyTargetLimit: number;
  monthlyTargetCustomers: number;
  supervisorId: string | null;
  areaSalesManagerId: string | null;
  regionalSalesManagerId: string | null;
}

export interface Achievement {
  id: string;
  agentId: string;
  customersCount: number;
  limit: number;
  month: string;
  year: number;
}

export interface Manager {
  id: string;
  name: string;
  role: 'SUPERVISOR' | 'AREA_SALES_MANAGER' | 'REGIONAL_SALES_MANAGER';
  target: number;
}

export interface Alert {
  id: string;
  agentId: string;
  message: string;
  type: 'WARNING' | 'CRITICAL';
  createdAt: string;
}