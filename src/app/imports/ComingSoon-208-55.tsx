import img99Logo1 from "../../assets/logo.webp";

function InstagramPost() {
  return (
    <div className="absolute bg-[#151515] h-[1350px] left-0 overflow-clip top-0 w-[1080px]" data-name="Instagram post - 1">
      <div className="absolute h-[700px] left-[238px] top-[-59px] w-[604px]" data-name="99-logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img99Logo1} />
      </div>
      <p className="absolute font-['Bebas_Neue:Regular',sans-serif] h-[260px] leading-[normal] left-[182px] not-italic text-[300px] text-white top-[490px] w-[716px]">COMING</p>
      <p className="absolute font-['Bebas_Neue:Regular',sans-serif] h-[260px] leading-[normal] left-[540px] not-italic text-[#ff9d56] text-[300px] text-center top-[821px] translate-x-[-50%] w-[716px]">SOON</p>
    </div>
  );
}

export default function ComingSoon() {
  return (
    <div className="relative size-full" data-name="coming soon">
      <InstagramPost />
    </div>
  );
}
