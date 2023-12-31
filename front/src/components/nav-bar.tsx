import React, { ReactNode } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import useAuth from "@/context/auth";
import { classNames } from "@/utils/helperFunctions";
import { useAuthentication } from "@/hooks/checkAuthentication";
import { Button } from "@/components/ui/button";
import useSubmission from "@/context/submission";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { ModeToggle } from "@/components/button-toggle";
import { ProfileMenu } from "@/components/profile-menu";

export function NavBar({ children }: { children: ReactNode }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, balance, logout } = useAuth();
  const router = useRouter();
  const role = user?.role;
  const { toast } = useToast();
  const { setIsModalOpen, isModalOpen } = useSubmission();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          href="/"
          // className="flex hover:text-blue-500 items-center"
          className={`flex ${
            router.pathname === "/" ? "text-blue-500 text-lg" : ""
          } hover:text-blue-500 items-center`}
        >
          Agreement List
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          href="/unpaid-submissions"
          // className="flex hover:text-blue-500 items-center"
          className={`flex ${
            router.pathname === "/unpaid-submissions"
              ? "text-blue-500 text-lg"
              : ""
          } hover:text-blue-500 items-center`}
        >
          Unpaid Submissions
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-green-500"
      >
        Total Balance: ${balance.toFixed(2)}
      </Typography>
      {openNav && (
        <>
          <Typography variant="small" className="p-1 font-normal">
            <Link
              className={` ${
                router.pathname === "/best-professions"
                  ? "text-blue-500 text-lg"
                  : ""
              } hover:text-blue-500 `}
              href={"/best-professions"}
            >
              Best Professions
            </Link>
          </Typography>
          <Typography variant="small" className="p-1 font-normal">
            <Link
              className={` ${
                router.pathname === "/best-buyers"
                  ? "text-blue-500 text-lg"
                  : ""
              } hover:text-blue-500 `}
              href={"/best-professions"}
            >
              Best Professions
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            // className="p-1 font-normal "
            className={`p-1 font-normal ${
              user?.role === "buyer" ? "" : "hidden"
            }`}
          >
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add Funds
            </Button>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <ModeToggle />
          </Typography>
        </>
      )}
      {!openNav && (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <ProfileMenu />
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <div className={classNames("", "max-h-[768px] mt-4 mb-16 ")}>
      <Navbar
        className={classNames(
          `${user ? "sticky" : "hidden"}`,
          "sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4",
        )}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Soluntech Vendors
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {/*<Button*/}
            {/*  variant="gradient"*/}
            {/*  size="sm"*/}
            {/*  className="hidden lg:inline-block"*/}
            {/*>*/}
            {/*  <span>Buy Now</span>*/}
            {/*</Button>*/}
            <IconButton
              variant="text"
              className="flex justify-center h-6 w-6  text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {/*<Button variant="gradient" size="sm" fullWidth className="mb-2">*/}
          {/*  <span>Buy Now</span>*/}
          {/*</Button>*/}
        </Collapse>
      </Navbar>
      <div className="mx-auto  py-12">{children}</div>
    </div>
  );
}
