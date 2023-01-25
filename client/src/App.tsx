import { DevicePermissionSafe } from "./deviceSafe";
import { Notification } from "./notification";
function App() {
  return (
    <div className="App bg-[#EEEEEE]">
      <div className="flex flex-col min-h-screen justify-between">
        <header className="h-[5rem] bg-[#222831] w-full mb-[2rem]"></header>
        <main className="flex-grow">
          <DevicePermissionSafe>
            <Notification />
          </DevicePermissionSafe>
        </main>
        <footer className="mt-[5rem] bg-[#393E46]  w-full h-[10rem] "></footer>
      </div>
    </div>
  );
}

export default App;
