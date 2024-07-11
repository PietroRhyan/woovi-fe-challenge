import { PaymentMethods } from "@/components/payment-methods";

export default function Home() {
  return (
    <main className="px-4 w-full mb-5 space-y-8" >
      <h2 className="text-center font-extrabold text-2xl" >João, como você quer pagar?</h2>

      <PaymentMethods />
    </main>
  );
}
