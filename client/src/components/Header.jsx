import React, { useRef } from 'react';
import assets from '../assets/assets'; // default export is fine
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setInput,input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault(); // ✅ fixed typo
    setInput(inputRef.current.value);
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative overflow-hidden">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-2 mb-4 border border-primary/10 bg-primary/10 rounded-full text-primary text-sm">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="star" className="w-2.5" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold leading-tight text-gray-700">
          Your own <span className="text-blue-600">blogging</span> <br /> platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs">
          This is your space to think out loud, to share what matters, and to write without
          filters. Whether it&apos;s one word or a thousand, your story starts right here.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blog"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    <div className="text-center">
  {input && (
    <button
      onClick={() => setInput("")} // ✅ clears search input
      className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer hover:bg-gray-100 transition"
    >
      Clear search
    </button>
  )}
</div>
      <img
        src={assets.gradientBackground}
        alt="background gradient"
        className="absolute -top-40 -z-10 opacity-50" // ✅ fixed z-index
      />
    </div>
  );
};

export default Header;
