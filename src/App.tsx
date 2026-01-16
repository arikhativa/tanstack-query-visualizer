import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MutationList } from "./components/mutation/MutationList";
import { QueryList } from "./components/query/QueryList";
import { StorageProvider } from "./components/providers/StorageProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";

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

function Section({
  children,
  title,
}: React.ComponentProps<"div"> & { title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-start w-full">
      <h2 className="my-6 text-xl">{title}</h2>
      {children}
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StorageProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="flex flex-col h-screen w-screen bg-linear-to-r from-blue-900 to-orange-900  ">
            <Header />
            <div className="flex-1 flex gap-4 px-4">
              <Section title="Queries">
                <QueryList />
              </Section>
              <Separator className="" orientation="vertical" />
              <Section title="Mutations">
                <MutationList />
              </Section>
            </div>
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </StorageProvider>
    </QueryClientProvider>
  );
}

export default App;
