import type { Metadata } from "next";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login | KhasCouture",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-800">KhasCouture Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your store</p>
        </div>

        {params.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            Invalid email or password. Please try again.
          </div>
        )}

        <form
          action={async (formData: FormData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                redirectTo: params.callbackUrl
                  ? decodeURIComponent(params.callbackUrl)
                  : "/admin/dashboard",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                redirect(`/admin/login?error=invalid`);
              }
              throw error;
            }
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 text-sm font-medium rounded transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
