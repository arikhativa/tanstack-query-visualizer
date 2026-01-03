import { createQueryKeys } from "@lukemorales/query-key-factory";

const residentData = {
  id: "R1",
  houseId: "H1",
};

export const resident = createQueryKeys("resident", {
  all: null,
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => residentData,
  }),
});
