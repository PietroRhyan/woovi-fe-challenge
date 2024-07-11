import Image from "next/image";

import shieldCheck from '/public/assets/shield-check.svg'
import grayLogo from '/public/gray-logo.svg'

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center px-4 pt-5 pb-[27px]">
      <div className="text-lightgraytext flex items-center justify-center gap-1.5" >
        <Image src={shieldCheck} alt="" width={16} height={18} />
        <span className="text-sm font-semibold">Pagamento 100% seguro via:</span>

        <div className="pb-1" >
          <Image src={grayLogo} alt="Woovi logo" width={58} height={17} color="#131313" className="fill-lightgraytext" />
        </div>
      </div>
    </footer>
  )
}