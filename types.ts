
export type DepartmentId = 'production' | 'qualite' | 'logistique' | 'maintenance' | 'administration' | 'rh' | 'commercial' | 'finance' | 'achats';

export interface Department {
  id: DepartmentId;
  name: string;
}

export type AbsenceStatus = 'justified' | 'unjustified' | 'pending';
export type EmployeeStatus = 'actif' | 'inactif' | 'en_conge' | 'en_formation';

export interface Employee {
  id?: number;
  matricule: string;
  civilite: string;
  nom: string;
  prenom: string;
  department: DepartmentId;
  position: string;
  hireDate: string;
  status: EmployeeStatus;
  email?: string;
  phone?: string;
  adresse?: string;
  photo?: string | null;
}

export interface Absence {
  id?: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  duration: number;
  type: string;
  status: AbsenceStatus;
  notes?: string;
}

export interface AbsenceStats {
  total: number;
  justified: number;
  unjustified: number;
  pending: number;
  mostAffectedDept: string;
  deptStats: Record<string, { count: number; duration: number }>;
  typeStats: Record<string, number>;
  monthlyStats: Record<number, number>;
  filteredAbsences: (Absence & { employeeName: string; departmentName: string; matricule: string })[];
}
