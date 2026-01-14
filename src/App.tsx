import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MutationList } from "./components/mutation/MutationList";
import { QueryList } from "./components/query/QueryList";
import { StorageProvider } from "./components/providers/StorageProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: () => {
        return "";
      },
    },
    mutations: {
      mutationFn: async () => {
        return "";
      },
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="flex">
            <Section>
              <QueryList />
            </Section>
            <Section>
              <MutationList />
            </Section>
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </StorageProvider>
    </QueryClientProvider>
  );
}

export default App;
