import { JobPreferencesForm } from "@/components/preferences/JobPreferencesForm";

export default function Home() {
  return (
    <main className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <JobPreferencesForm />
    </main>
  );
}
