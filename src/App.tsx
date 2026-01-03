import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataList } from "./components/DataList";
import { MutationList } from "./components/MutationList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
    },
    mutations: {
      // mutation options
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col ">
        <header className="flex flex-wrap justify-start items-center p-4 gap-4 h-fit bg-green-700/20">
          <MutationList />
        </header>
        <section className="flex-1 flex gap-4 p-4">
          <DataList />
        </section>
      </main>
    </QueryClientProvider>
  );
}

export default App;
