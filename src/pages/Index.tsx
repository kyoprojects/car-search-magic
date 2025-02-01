import { SearchModal } from "@/components/SearchModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-raycast-background p-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-raycast-text text-3xl font-bold mb-4">Car Search</h1>
        <p className="text-raycast-text-secondary mb-8">
          Press <kbd className="px-2 py-1 bg-raycast-card rounded">⌘</kbd> +{" "}
          <kbd className="px-2 py-1 bg-raycast-card rounded">K</kbd> to open search
        </p>
      </div>
      <SearchModal />
    </div>
  );
};

export default Index;