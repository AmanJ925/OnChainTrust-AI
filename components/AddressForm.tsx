"use client";

import React, { useState } from "react";

interface AddressFormProps {
  onSubmit: (address: string) => void;
  loading: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, loading }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (e.target.value.trim() !== "") setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim() === "") {
      setError("Contract address is required.");
      return;
    }
    setError("");
    onSubmit(address.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md flex flex-col gap-4 border border-zinc-100 dark:border-zinc-800"
      autoComplete="off"
    >
      <label className="text-zinc-700 dark:text-zinc-200 font-medium mb-1" htmlFor="eth-address">
        Ethereum Contract Address
      </label>
      <input
        id="eth-address"
        name="address"
        type="text"
        value={address}
        disabled={loading}
        onChange={handleInputChange}
        className={`px-4 py-2 rounded-md border outline-none focus:ring-2
          dark:bg-zinc-800 dark:text-zinc-50
          border-zinc-300 dark:border-zinc-700
          focus:border-indigo-500 dark:focus:border-indigo-400
          focus:ring-indigo-200 dark:focus:ring-indigo-800
          transition duration-150
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
        placeholder="e.g. 0x1234...abcd"
      />
      {error && (
        <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
      )}
      <button
        type="submit"
        disabled={loading}
        className={`mt-2 w-full py-2 px-4 bg-indigo-600 dark:bg-indigo-500 text-white dark:text-zinc-50 rounded-md font-semibold shadow hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300 transition duration-150
        ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddressForm;