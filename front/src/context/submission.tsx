import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import value = ThemeProvider.propTypes.value;

interface SubmissionProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const SubmissionContext = createContext<SubmissionProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export function SubmissionProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <SubmissionContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </SubmissionContext.Provider>
  );
}

export default function useSubmission() {
  return useContext(SubmissionContext);
}
