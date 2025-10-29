import Card from "./Card";

export default function SkeletonCard({
  title,
  lines = 3,
}: {
  title?: string;
  lines?: number;
}) {
  return (
    <Card>
      {title ? (
        <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      ) : null}

      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </Card>
  );
}
