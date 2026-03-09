'use client';

import toast from 'react-hot-toast';

interface Props {
  productName: string;
}

export default function AddToEnquiryButton({ productName }: Props) {
  const handleClick = () => {
    toast.success(`${productName} added to your enquiry list.`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold text-sm transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Add to Enquiry
    </button>
  );
}
