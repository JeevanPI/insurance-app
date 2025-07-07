// src/components/Modal.tsx
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full relative">
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}
