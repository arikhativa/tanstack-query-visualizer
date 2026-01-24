import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MutationList } from "./components/mutation/MutationList";
import { QueryList } from "./components/query/QueryList";
import { StorageProvider } from "./components/providers/StorageProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import Silk from "@/components/Silk";

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
  rgb,
  rotation,
  speed,
  title,
}: React.ComponentProps<"div"> & {
  title: string;
  rgb: string;
  rotation: number;
  speed: number;
}) {
  return (
    <div className=" relative flex-1 flex flex-col items-center justify-start w-full">
      {/* BG */}
      <div className="absolute top-0 left-0 w-full h-full -z-50 ">
        <Silk
          speed={speed}
          scale={0.6}
          color={rgb}
          noiseIntensity={0.8}
          rotation={rotation}
        />
      </div>

      {/* Overlay */}
      <div
        className=" absolute w-full h-full -z-40"
        style={{
          background:
            "radial-gradient(circle,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1)  70%)",
        }}
      />

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
          <main className="flex flex-col h-screen w-screen">
            <Header />
            <div className="flex-1 flex gap-4 px-4">
              <Section speed={5} rotation={2.1} rgb="#1c71d8" title="Queries">
                <QueryList />
              </Section>
              <Separator className="" orientation="vertical" />
              <Section rotation={2.6} speed={4} rgb="#a51d2d" title="Mutations">
                <MutationList />
              </Section>
            </div>
          </main>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </StorageProvider>
    </QueryClientProvider>
  );
}

export default App;
