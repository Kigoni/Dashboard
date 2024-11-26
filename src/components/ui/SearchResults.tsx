import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ReactNode } from 'react';

interface SearchResult {
  id: number;
  title: string;
  abstract: string;
  citations?: number;
}

interface SearchResultsProps {
  results: SearchResult[]; // Accepts a results prop of type SearchResult[]
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="space-y-4 mb-8">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-600 hover:text-blue-800">
              <a href="#">{result.title}</a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{result.abstract}</p>
            {result.citations && (
              <p className="mt-2 text-sm text-gray-500">
                Citations: {result.citations}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Example usage of the updated SearchResults component
export default function App() {
  const mockResults: SearchResult[] = [
    {
      id: 1,
      title: "Efficacy and safety of laparoscopic distal D2 radical gastrectomy for advanced gastric cancer patients",
      abstract: "No abstract available...",
    },
    {
      id: 2,
      title: "Is Class Changing? A Work-Life History Perspective on the Salariat",
      abstract: "Has the massive transformation of the class structure over the twentieth century changed the consequences of class? In particular...",
      citations: 13,
    },
    // Add more mock results as needed
  ];

  return <SearchResults results={mockResults} />;
}
