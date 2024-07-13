import { FaChevronUp } from "react-icons/fa";

export function PaymentInfo() {
  return (
    <section className="w-full" >
      <div className="flex flex-col w-full items-center" >
        <span className="text-lightgraytext font-semibold">Prazo de pagamento:</span>
        <p className="font-extrabold text-black">15/12/2021 - 08:17</p>
      </div>

      <section className="w-full" >
        <div className="border-b-2 border-gray w-full flex py-5" >
          <div className="flex flex-col gap-6 border w-8">
            
          </div>
          <div className="w-full flex flex-col items-center gap-4" >
            <div className="w-full flex items-center justify-between" >
              <p className="text-[18px] font-semibold">1ª entrada no Pix</p>
              <span className="text-[18px] font-extrabold" >R$ 15.300,00</span>
            </div>

            <div className="w-full flex items-center justify-between" >
              <p className="text-[18px] font-semibold">2ª no cartão</p>
              <span className="text-[18px] font-extrabold" >R$ 15.300,00</span>
            </div>
          </div>
        </div>

        <div className="border-b-2 border-gray w-full flex items-center justify-between py-5" >
          <p className="text-sm font-semibold" >CET: 0,5%</p>
          <span className="text-[18px] font-semibold" >Total: R$ 30.600,00</span>
        </div>

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