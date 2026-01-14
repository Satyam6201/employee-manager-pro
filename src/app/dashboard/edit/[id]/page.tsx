"use client";
import { useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { useEmployees } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const router = useRouter();
  const { updateEmployee } = useEmployees();

  // Fetching the employee data
  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axios.get(`/api/employees/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Populate the form when data is loaded
  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee, reset]);

  const onSubmit = (data: any) => {
    // Ensure numeric fields are correctly typed
    const formattedData = {
      ...data,
      salary: parseInt(data.salary.toString()),
    };

    updateEmployee({ id: id, data: formattedData }, {
      onSuccess: () => {
        router.push("/dashboard");
        router.refresh();
      },
      onError: (error) => {
        alert("Failed to update employee. Please try again.");
      }
    });
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center gap-2 text-indigo-600 font-medium bg-white dark:bg-gray-950">
      <Loader2 className="animate-spin" /> <span className="dark:text-white">Loading employee data...</span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-10 max-w-4xl mx-auto min-h-screen"
    >
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Back to Directory
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 transition-colors">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Update Employee Records</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Dynamic Input Fields */}
          {[
            { label: "First Name", id: "firstName", type: "text" },
            { label: "Last Name", id: "lastName", type: "text" },
            { label: "Email Address", id: "email", type: "email" },
            { label: "Phone Number", id: "phone", type: "text" },
            { label: "Designation", id: "designation", type: "text" },
            { label: "Date of Joining", id: "dateOfJoining", type: "date" },
            { label: "Salary", id: "salary", type: "number" },
          ].map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{field.label}</label>
              <input 
                type={field.type}
                {...register(field.id, { required: `${field.label} is required` })} 
                className={`p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors[field.id] ? 'border-red-500' : ''}`} 
              />
              {errors[field.id] && <span className="text-xs text-red-500">{errors[field.id]?.message as string}</span>}
            </div>
          ))}

          {/* Department Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Department</label>
            <select 
              {...register("department", { required: "Department is required" })} 
              className="p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
            >
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Employment Status</label>
            <select 
              {...register("status")} 
              className="p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Address Textarea */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Residential Address</label>
            <textarea 
              {...register("address")} 
              rows={3} 
              className="p-3 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            />
          </div>

          <div className="md:col-span-2 mt-6">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-[0.98]"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}