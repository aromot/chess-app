import Image from "next/image";
import LogoOutline from "../../../public/logo-outline.svg";

const HomepageTitle = () => {
  return (
    <div className="flex gap-3 xl:gap-5">
      <div className="w-[50px] xl:w-[70px]">
        <Image
          src={LogoOutline}
          alt="Billie Chess"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div>
        <div className="text-5xl xl:text-7xl">Billie Chess</div>
        <div className="ml-2 tracking-widest">Prepare your openings</div>
      </div>
    </div>
  );
};

export default HomepageTitle;
