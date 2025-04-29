interface HelperProps {
  onClick: () => void;
}

export default function Helper({ onClick }: HelperProps) {
  return (
    <section
      className="z-[99] fixed top-0 left-0 fill bg-black opacity-90"
      onClick={onClick}
    >
      <div className="h-screen w-full flex justify-center items-center">
        <div className="text-neutral-100 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>?</div>
            <div>Toggle Helper</div>
            <div>Escape</div>
            <div>Close Helper</div>
            <div>Space</div>
            <div>Play / Pause</div>
            <div>Arrow Up/Down</div>
            <div>Change Channel</div>
            <div>M</div>
            <div>Toggle Mute</div>
          </div>
          <div className="text-center">
            Crafted with love by{" "}
            <a
              href="https://github.com/momozahara"
              className="font-bold hover:underline underline-offset-4"
            >
              Pream Pinbut
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
