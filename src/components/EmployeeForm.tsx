"use client";
import { useForm } from "react-hook-form";
import { Employee } from "@/types/employee";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, Briefcase, Calendar, 
  DollarSign, MapPin, CheckCircle, PlusCircle 
} from "lucide-react";

export default function EmployeeForm({ onSubmit }: { onSubmit: (data: Employee) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Employee>();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)} 
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800"
    >
      {/* Section Title */}
      <div className="md:col-span-2 mb-2">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <PlusCircle className="text-indigo-600" size={24} />
          Primary Employee Information
        </h3>
        <p className="text-sm text-zinc-500">Fill in the official details to register a new team member.</p>
      </div>

      {/* First Name */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <User size={16} className="text-indigo-500" /> First Name
        </label>
        <input 
          {...register("firstName", { required: "First name is required" })} 
          placeholder="e.g. John"
          className={`w-full border p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-zinc-200 dark:border-zinc-700'}`}
        />
        {errors.firstName && <span className="text-red-500 text-xs mt-1 font-medium">{errors.firstName.message}</span>}
      </motion.div>

      {/* Last Name */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <User size={16} className="text-indigo-500" /> Last Name
        </label>
        <input 
          {...register("lastName", { required: "Last name is required" })} 
          placeholder="e.g. Doe"
          className={`w-full border p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-zinc-200 dark:border-zinc-700'}`}
        />
        {errors.lastName && <span className="text-red-500 text-xs mt-1 font-medium">{errors.lastName.message}</span>}
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <Mail size={16} className="text-indigo-500" /> Work Email
        </label>
        <input 
          type="email" 
          {...register("email", { required: "Email is required" })} 
          placeholder="john.doe@company.com"
          className={`w-full border p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-zinc-200 dark:border-zinc-700'}`}
        />
        {errors.email && <span className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</span>}
      </motion.div>

      {/* Phone */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <Phone size={16} className="text-indigo-500" /> Phone Number
        </label>
        <input 
          {...register("phone", { required: "Phone number is required" })} 
          placeholder="+1 (555) 000-0000"
          className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </motion.div>

      {/* Department */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <Briefcase size={16} className="text-indigo-500" /> Department
        </label>
        <select 
          {...register("department", { required: "Please select a department" })} 
          className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
        >
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </motion.div>

      {/* Designation */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <CheckCircle size={16} className="text-indigo-500" /> Job Title / Designation
        </label>
        <input 
          {...register("designation")} 
          placeholder="e.g. Senior Software Engineer"
          className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
        />
      </motion.div>

      {/* Joining Date */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <Calendar size={16} className="text-indigo-500" /> Date of Joining
        </label>
        <input 
          type="date" 
          {...register("dateOfJoining")} 
          className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
        />
      </motion.div>

      {/* Salary */}
      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <DollarSign size={16} className="text-indigo-500" /> Monthly Salary ($)
        </label>
        <input 
          type="number" 
          {...register("salary")} 
          placeholder="5000"
          className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
        />
      </motion.div>

      {/* Address */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <MapPin size={16} className="text-indigo-500" /> Residential Address
        </label>
        <textarea 
          {...register("address")} 
          placeholder="Enter full street address and city..."
          className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
          rows={3} 
        />
      </motion.div>

      {/* Status */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <CheckCircle size={16} className="text-indigo-500" /> Employment Status
        </label>
        <div className="flex gap-4">
          {["Active", "Inactive"].map((status) => (
            <label key={status} className="flex-1">
              <input 
                type="radio" 
                value={status} 
                {...register("status")} 
                className="hidden peer" 
                defaultChecked={status === "Active"}
              />
              <div className="text-center p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                {status}
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit" 
        disabled={isSubmitting}
        className="md:col-span-2 mt-4 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? "Saving Data..." : "Confirm & Save Employee Record"}
      </motion.button>
    </motion.form>
  );
}