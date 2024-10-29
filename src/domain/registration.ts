export type Status = "REVIEW" | "APPROVED" | "REPROVED";

export interface Registration {
  id: string;
  cpf: string;
  employeeName: string;
  email: string;
  admissionDate: string;
  status: Status;
}

export type RegistrationsByStatus = {
  [k in Status]: Registration[];
};

export function groupRegistrationsByStatus(
  data: Registration[]
): RegistrationsByStatus {
  const normalizedData: RegistrationsByStatus = {
    APPROVED: [],
    REPROVED: [],
    REVIEW: [],
  };

  for (const item of data) {
    normalizedData[item.status].push(item);
  }

  return normalizedData;
}
