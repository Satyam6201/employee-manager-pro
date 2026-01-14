import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Employee } from "@/types/employee";

export function useEmployees() {
  const queryClient = useQueryClient();

  // 1. Fetch Employees & Statistics (READ)
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axios.get("/api/employees");
      // res.data structure: { employees: [...], stats: { total: 0, active: 0, inactive: 0 } }
      return res.data;
    },
  });

  // 2. Add New Employee (CREATE)
  const addEmployee = useMutation({
    mutationFn: (newEmp: Employee) => axios.post("/api/employees", newEmp),
    onSuccess: () => {
      // Refresh the list after a successful addition
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // 3. Remove Employee (DELETE)
  const deleteEmployee = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/employees/${id}`),
    onSuccess: () => {
      // Refresh the list after a successful deletion
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // 4. Update Existing Employee (UPDATE)
  const updateEmployee = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Employee> }) => 
      axios.patch(`/api/employees/${id}`, data),
    onSuccess: () => {
      // Refresh the list after a successful update
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return { 
    // Providing default values to prevent "undefined" errors during rendering
    employees: data?.employees || [], 
    stats: data?.stats || { total: 0, active: 0, inactive: 0 }, 
    isLoading, 
    addEmployee: addEmployee.mutate,
    deleteEmployee: deleteEmployee.mutate,
    updateEmployee: updateEmployee.mutate 
  }; 
}