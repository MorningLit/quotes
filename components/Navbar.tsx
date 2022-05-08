import { useAutoplay, useAutoplayUpdate } from "./AutoplayContext";

const Navbar = () => {
  const autoplay = useAutoplay();
  const toggleAutoplay = useAutoplayUpdate();
  return (
    <div className="w-full p-8">
      <button
        className="border-2 border-slate-600 rounded-full px-6 pb-1.5 text-4xl bg-slate-200"
        onClick={toggleAutoplay}
      >
        {autoplay ? "▶️" : "️♾️"}
      </button>
    </div>
  );
};

export default Navbar;
