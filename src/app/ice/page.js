import IceEmergencySection from "@/components/IceEmergencySection";

export const metadata = {
  title: "ICE | Medibank",
  description: "Emergency access page for Medibank ICE users.",
};

export default function IcePage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-24 text-[#071f9f] sm:px-6 md:pt-32 lg:px-8">
      <section className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-10 lg:min-h-[calc(100vh-10rem)] lg:justify-center">
        <IceEmergencySection />
      </section>
    </main>
  );
}
