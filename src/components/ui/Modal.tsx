import { type ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

ReactModal.setAppElement("#root");

export default function Modal({ title, isOpen, onClose, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 w-96 mx-auto my-20 shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black/50"
    >
      <h2 className="text-xl font-bold text-violet-600 mb-4">{title}</h2>
      {children}
    </ReactModal>
  );
}
