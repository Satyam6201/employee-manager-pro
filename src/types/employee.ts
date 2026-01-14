export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  salary: number;
  address: string;
  status: 'Active' | 'Inactive';
  createdAt?: string; 
}

export interface EmployeeStats {
  total: number;
  active: number;
  inactive: number;
}

export interface EmployeeResponse {
  employees: Employee[];
  stats: EmployeeStats;
}