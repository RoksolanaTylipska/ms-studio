import dynamic from "next/dynamic";
import Head from "next/head";

// Client-only: keeps Firebase Auth out of the public pages' bundles
const AdminPanel = dynamic(() => import("@/features/admin"), { ssr: false });

function AdminPage() {
  return (
    <>
      <Head>
        <title>Адмінка | MS STUDIO LASER</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminPanel />
    </>
  );
}

export default AdminPage;
