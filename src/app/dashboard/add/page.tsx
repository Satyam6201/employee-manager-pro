"use client";
import EmployeeForm from "@/components/EmployeeForm";
import { useEmployees } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Optional: for a back button
import Link from "next/link";

export default function AddEmployeePage() {
  const { addEmployee } = useEmployees();
  const router = useRouter();

  const handleFormSubmit = (data: any) => {
    // Calling the addEmployee hook
    addEmployee(data, {
      onSuccess: () => {
        // Redirecting to dashboard upon successful creation
        router.push("/dashboard"); 
      },
      onError: (err) => {
        alert("An error occurred while adding the employee. Please check the console for details.");
        console.error("Submission Error:", err);
      }
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add New Employee
          </h1>
          <p className="text-zinc-500 mt-1">
            Fill in the details below to register a new staff member.
          </p>
        </div>
        
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-2xl p-6">
        <EmployeeForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}