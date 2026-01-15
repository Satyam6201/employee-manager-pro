"use client";
import { useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { useEmployees } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Save, Loader2, ClipboardCheck, 
  Mail, Phone, User, Briefcase, Calendar, 
  IndianRupee, MapPin, Building2, Activity 
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const router = useRouter();
  const { updateEmployee } = useEmployees();

  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axios.get(`/api/employees/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (employee) reset(employee);
  }, [employee, reset]);

  const onSubmit = (data: any) => {
    const formattedData = { ...data, salary: parseInt(data.salary.toString()) };

    updateEmployee({ id: id, data: formattedData }, {
      onSuccess: () => {
        router.push("/dashboard");
        router.refresh();
      },
      onError: () => alert("Update failed. Please check your connection.")
    });
  };

  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={40} className="text-indigo-600" />
      </motion.div>
      <span className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Syncing data... 🔄</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 py-12 px-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-all font-medium bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back
          </button>
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800/50">
            <ClipboardCheck size={18} />
            <span className="text-sm font-bold uppercase tracking-wider text-[10px] md:text-sm">Editing Mode </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 dark:shadow-none p-6 md:p-12 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          
          <div className="relative mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              Update Profile 👤
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 ml-1">Refine employee details and role settings.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "First Name", id: "firstName", type: "text", placeholder: "e.g. Rahul", icon: <User size={18} /> },
                { label: "Last Name", id: "lastName", type: "text", placeholder: "e.g. Kumar", icon: <User size={18} />},
                { label: "Email Address", id: "email", type: "email", placeholder: "rahul@company.com", icon: <Mail size={18} />},
                { label: "Phone Number", id: "phone", type: "text", placeholder: "+91 0000000000", icon: <Phone size={18} /> },
                { label: "Designation", id: "designation", type: "text", placeholder: "Software Engineer", icon: <Briefcase size={18} /> },
                { label: "Joining Date", id: "dateOfJoining", type: "date", placeholder: "", icon: <Calendar size={18} /> },
                { label: "Annual Salary", id: "salary", type: "number", placeholder: "Amount in ₹", icon: <IndianRupee size={18} /> },
              ].map((field) => (
                <motion.div variants={itemVariants} key={field.id} className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    {field.icon} {field.label} {field.emoji}
                  </label>
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id, { required: `${field.label} is required` })} 
                    className={`p-4 border-2 border-gray-50 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all ${errors[field.id] ? 'border-red-400 focus:ring-red-500/10 focus:border-red-400' : ''}`} 
                  />
                  <AnimatePresence>
                    {errors[field.id] && (
                      <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-medium ml-1">
                        ⚠️ {errors[field.id]?.message as string}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Department & Status */}
              {[
                { id: "department", label: "Department", icon: <Building2 size={18} /> },
                { id: "status", label: "Employment Status", icon: <Activity size={18} /> }
              ].map((selectField) => (
                <motion.div variants={itemVariants} key={selectField.id} className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    {selectField.icon} {selectField.label} {selectField.emoji}
                  </label>
                  <select 
                    {...register(selectField.id)} 
                    className="p-4 border-2 border-gray-50 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    {selectField.id === "department" ? (
                      ["Engineering", "Human Resources", "Sales", "Marketing", "Finance", "Operations"].map(opt => <option key={opt} value={opt}>{opt}</option>)
                    ) : (
                      ["Active", "Inactive"].map(opt => <option key={opt} value={opt}>{opt}</option>)
                    )}
                  </select>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin size={18} /> Residential Address
                </label>
                <textarea 
                  {...register("address")} 
                  rows={3} 
                  placeholder="Enter current residential address..."
                  className="p-4 border-2 border-gray-50 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none" 
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-lg py-5 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.97]"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={22} className="group-hover:scale-110 transition-transform" />}
                Save Changes & Sync ✨
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}