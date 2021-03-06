import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, title, children }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      {isOpen ? (
        <>
          <div className="flex fixed top-2/4 left-2/4 justify-center items-center w-screen h-screen -translate-x-1/2 -translate-y-1/2 bg-black/60">
            <div className="bg-white z-10 rounded-xl shadow-md p-8 min-h-[33%] max-w-sm mx-4 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-bold">{title}</h3>
              </div>
              {children}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
