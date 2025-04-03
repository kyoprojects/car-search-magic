
import { SearchModal } from "@/components/SearchModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-raycast-background p-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-raycast-text text-3xl font-bold mb-4">Car Search</h1>
        <p className="text-raycast-text-secondary mb-8">
          Select a car to configure
        </p>
      </div>
      <SearchModal />
    </div>
  );
};

export default Index;
