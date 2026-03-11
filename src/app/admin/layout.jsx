import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin Dashboard | Ventrivo",
  description:
    "Administrative portal for managing Ventrivo projects and plots.",
};

export default function AdminLayout({ children }) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
