"use client";
import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, User, Briefcase, TrendingUp, Users, UserCheck, UserMinus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { employees, stats, isLoading, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Logic
  const filteredEmployees = employees.filter((emp: any) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Employee <span className="text-indigo-600">Insights</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Efficiently monitor and manage your global workforce.</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            href="/dashboard/add" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20"
          >
            <Plus size={20} /> Add New Member
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[
          { label: "Total Workforce", value: stats.total, icon: Users, color: "indigo" },
          { label: "Active Talents", value: stats.active, icon: UserCheck, color: "emerald" },
          { label: "Off-boarded", value: stats.inactive, icon: UserMinus, color: "rose" },
        ].map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <s.icon size={80} />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">{s.label}</p>
            <div className="flex items-end gap-2 mt-4">
              <h2 className="text-5xl font-black text-zinc-900 dark:text-white leading-none">{s.value}</h2>
              <TrendingUp size={20} className="text-indigo-500 mb-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search employees by name or email..." 
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <select 
              className="pl-12 pr-10 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer font-medium"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
              <tr>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-zinc-400">Team Member</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-zinc-400">Department</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-zinc-400">Availability</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-zinc-400 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <AnimatePresence>
                {filteredEmployees.map((emp: any) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={emp.id} 
                    className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black text-lg">
                          {emp.firstName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">{emp.firstName} {emp.lastName}</p>
                          <p className="text-xs text-zinc-500 font-medium">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-zinc-400" />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{emp.department}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        emp.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' 
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/dashboard/edit/${emp.id}`} 
                          className="p-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white dark:text-zinc-400 rounded-xl transition-all"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => { if(confirm("Permanently remove this employee?")) deleteEmployee(emp.id) }}
                          className="p-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-600 hover:text-white dark:text-zinc-400 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-zinc-500 font-medium italic">No employees matching your criteria were found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}