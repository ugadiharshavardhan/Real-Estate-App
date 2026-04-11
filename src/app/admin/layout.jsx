import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import { checkAdminStatus } from "@/utils/actions/admin";
import AccessDenied from "@/components/admin/AccessDenied";

export const metadata = {
  title: "Admin Dashboard | Ventrivo",
  description:
    "Administrative portal for managing Ventrivo projects and plots.",
};

export default async function AdminLayout({ children }) {
  const { isAdmin } = await checkAdminStatus();

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
