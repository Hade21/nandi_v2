import MapPin from "@/components/animated-icon/mappin";

export default function Home() {
  return (
    <div>
      <main className="w-full h-screen flex justify-center items-center">
        <div className="title">
          <h1 className="text-5xl font-bold flex justify-center gap-3 items-center relative -translate-x-3">
            Welcome to{" "}
            <span className="font-[family-name:var(--font-rubik-moonrocks)] text-blue-500">
              Nandi
            </span>
            <span className="absolute top-0 -right-3 translate-x-full -translate-y-1/3">
              <MapPin size={78} />
            </span>
          </h1>
        </div>
      </main>
    </div>
  );
}
