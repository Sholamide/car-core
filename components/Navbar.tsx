import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex items-center justify-center">
          <Image
            className="object-contain"
            width={118}
            height={18}
            src="/logo.svg"
            alt="car core logo"
          />
        </Link>

        <CustomButton
          containerStyles="text-primary-blue min-w-[130px] bg-white rounded-full"
          title="Sign In"
        />
      </nav>
    </header>
  );
};

export default Navbar;
