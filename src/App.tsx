import { DataList } from "./components/DataList";
import { MutationList } from "./components/MutationList";

export function App() {
  return (
    <main className="h-screen flex flex-col ">
      <header className="flex  justify-start items-center p-4 gap-4 h-20">
        <MutationList />
      </header>
      <section className="flex-1 flex gap-4 bg-amber-200 p-4">
        <DataList />
      </section>
    </main>
  );
}

export default App;
