import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ButtonToggle";
import useSubmission from "@/context/submission";
import useAuth from "@/context/auth";
import Link from "next/link";

export function ProfileMenu() {
  const { setIsModalOpen, isModalOpen } = useSubmission();
  const { user, balance, logout } = useAuth();

  return (
    <Menu>
      <MenuHandler>
        <Button>Profile</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <Typography
            onClick={() => {
              setIsModalOpen(true);
            }}
            variant="small"
            className={`font-normal text-lg ${
              user?.role === "buyer" ? "" : "hidden"
            }`}
          >
            Add Funds
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Typography variant="small" className="font-normal text-lg">
            <Link href={"/best-professions"}>Best Professions</Link>
          </Typography>
        </MenuItem>
        <MenuItem className="flex mt-2 items-center gap-2">
          <ModeToggle />
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
          <Typography
            onClick={() => {
              logout();
            }}
            variant="small"
            className="font-normal text-lg"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
