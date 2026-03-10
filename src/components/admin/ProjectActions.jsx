"use client";

import { useState, useTransition } from "react";
import { deleteProject } from "@/utils/actions/admin";
import { Edit3, Trash2, Plus, Loader2 } from "lucide-react";
import ProjectForm from "./ProjectForm";
import ConfirmModal from "./ConfirmModal";

export function ProjectHeader() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
            Projects
          </h1>
          <p className="text-gray-500 font-inter">
            Manage your real estate ventures and listings.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 bg-[#1B4332] text-white rounded-xl text-sm font-bold hover:bg-[#133024] transition-all flex items-center gap-2 font-inter shadow-lg shadow-[#1B4332]/20"
        >
          <Plus size={18} />
          New Venture
        </button>
      </div>
      {showForm && <ProjectForm onClose={() => setShowForm(false)} />}
    </>
  );
}
export function ProjectActions({ project }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteProject(project._id);
      if (!res.success) alert("Failed to delete: " + res.error);
      setShowConfirmDelete(false);
    });
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setShowEditForm(true)}
          className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={() => setShowConfirmDelete(true)}
          disabled={isDeleting}
          className="p-2.5 bg-red-50 text-red-200 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>
      {showEditForm && (
        <ProjectForm project={project} onClose={() => setShowEditForm(false)} />
      )}
      <ConfirmModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}"? This action cannot be undone and will delete all associated plots.`}
        confirmText="Delete Project"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </>
  );
}
