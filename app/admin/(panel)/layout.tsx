import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NavClient from "./NavClient";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }
  return <NavClient>{children}</NavClient>;
}
