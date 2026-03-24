import { Suspense } from "react";
import Link from "next/link";
import AdminLoading from "@/components/admin/AdminLoading";
import SiteInfoForm from "@/components/admin/SiteInfoForm";
import { getSiteInfo, checkAdminStatus } from "@/utils/actions/admin";

export default async function SiteInfo() {
  const { isAdmin } = await checkAdminStatus();
  if (!isAdmin) return null;
  const siteInfo = await getSiteInfo();

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <Link
          href="/admin"
          className="hover:text-gray-600 transition-colors"
        >
          Dashboard
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-bold">
          Configuration
        </span>
      </div>

      {/* Main Content */}
      <Suspense fallback={<AdminLoading />}>
        <SiteInfoForm initialData={siteInfo} />
      </Suspense>
    </div>
  );
}
