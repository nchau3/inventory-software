import LogoHeader from "./logo-header"

export default function TopNav() {
  return (
    // <header className="h-10 w-screen bg-gray-400 flex justify-end items-center fixed top-0 p-2">
    <header className="flex items-center justify-between p-2">
      <LogoHeader />
      <span>
        <label htmlFor="temp" className="mr-2">
          INPUT:
        </label>
        <input
          name="temp"
          placeholder="This does nothing."
          className="h-6"
        ></input>
      </span>
    </header>
  );
}
