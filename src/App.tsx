import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MutationList } from "./components/mutation/MutationList";
import { QueryList } from "./components/query/QueryList";
import { StorageProvider } from "./components/providers/StorageProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: () => {
        return "";
      },
    },
    mutations: {
      // mutation options
    },
  },
});

function Section({ children }: React.ComponentProps<"div">) {
  return <div className="flex-1">{children}</div>;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StorageProvider>
        <main className="flex">
          <Section>
            <QueryList />
          </Section>
          <Section>
            <MutationList />
          </Section>
        </main>
      </StorageProvider>
    </QueryClientProvider>
  );
}

export default App;
