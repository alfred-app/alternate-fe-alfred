import Contacts from "./Footer/Contacts";
import Copyright from "./Footer/Copyright";
import Links from "./Footer/Links";
import LogoAndSocialMedia from "./Footer/LogoAndSocialMedia";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center gap-5 font-poppins text-white bg-[#1F2131]">
      <div className="w-full max-w-7xl p-5 mt-5 flex flex-col items-center justify-between gap-9 md:flex-row">
        <LogoAndSocialMedia />

        <Links />

        <Contacts />
      </div>

      <Copyright />
    </footer>
  );
}
