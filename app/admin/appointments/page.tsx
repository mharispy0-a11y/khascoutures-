export const dynamic = "force-dynamic";

import { getServerClient } from "@/lib/supabase";
import type { Appointment } from "@/lib/supabase";
import AppointmentsTable from "./AppointmentsTable";

async function getAppointments(): Promise<Appointment[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Appointment[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AppointmentsPage() {
  const appointments = await getAppointments();
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <span className="text-sm text-gray-500">{appointments.length} total</span>
      </div>
      <AppointmentsTable initialData={appointments} />
    </div>
  );
}
