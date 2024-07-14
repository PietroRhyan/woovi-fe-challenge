import { FaChevronUp } from "react-icons/fa";

export function PaymentInfo({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full" >
      <div className="flex flex-col w-full items-center" >
        <span className="text-lightgraytext font-semibold">Prazo de pagamento:</span>
        <p className="font-extrabold text-black">15/12/2021 - 08:17</p>
      </div>

      <section className="w-full" >
        {children}

        <div className="border-b-2 border-gray w-full flex items-center justify-between py-5" >
          <p className="font-extrabold" >Como funciona?</p>
          <FaChevronUp size={14} className="text-black" />
        </div>

        <div className="w-full flex flex-col items-center py-5" >
          <span className="text-sm font-semibold">Como funciona?</span>
          <p className="text-sm font-extrabold" >
            2c1b951f356c4680b13ba1c9fc889c47
          </p>
        </div>
      </section>
    </section>
  )
}