import { Card } from '@/components/ui/card';

export const LoadingSpinner = () => {
  return (
    <Card className="p-8 text-center">
      <div className="inline-flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-4 text-muted-foreground">Loading profile data...</p>
    </Card>
  );
};