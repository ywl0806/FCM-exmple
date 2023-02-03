import { InputMessage } from "./inputMessage";
import { Header } from "./layouts/header";

function App() {
  return (
    <div className="App bg-[#EEEEEE]">
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main className="z-auto flex-grow">
          <div className="mx-auto h-[100rem]">
            <InputMessage />
          </div>
        </main>
        <footer className="mt-[5rem] h-[10rem]  w-full bg-[#393E46] "></footer>
      </div>
    </div>
  );
}

export default App;
