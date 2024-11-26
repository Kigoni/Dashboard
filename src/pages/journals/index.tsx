import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AnalyticsForm from '@/components/ui/AnalyticsForm';
// import SearchResults from '@/components/ui/SearchResults';
import Pagination from '@/components/ui/Pgination';
import axios from 'axios';
import { ReactNode } from 'react';

interface FilterCriteria {
  country: string;
  thematicArea: string;
  language: string;
  doaj: string;
  oaj: string;
  ap: string;
  inasps: string;
  cope: string;
  issn: string;
  googleScholar: boolean;
  scopus: boolean;
}

interface Article {
  excerpt: ReactNode;
  id: number;
  title: string;
  // Add other fields as necessary
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    country: '',
    thematicArea: '',
    language: '',
    doaj: '',
    oaj: '',
    ap: '',
    inasps: '',
    cope: '',
    issn: '',
    googleScholar: false,
    scopus: false
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleCriteriaChange = (
    country: string,
    thematicArea: string,
    language: string,
    doaj: string,
    oaj: string,
    ap: string,
    inasps: string,
    cope: string,
    issn: string,
    googleScholar: boolean,
    scopus: boolean
  ) => {
    setFilterCriteria({
      country,
      thematicArea,
      language,
      doaj,
      oaj,
      ap,
      inasps,
      cope,
      issn,
      googleScholar,
      scopus
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://aphrc.site/journal_api/api/article/', {
          params: {
            page: currentPage,
            per_page: itemsPerPage,
            ...filterCriteria
          }
        });
        setArticles(response.data.results);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [currentPage, itemsPerPage, filterCriteria]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="relative flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg space-y-4 overflow-auto max-h-[80vh] p-6">
            <AnalyticsForm onCriteriaChange={handleCriteriaChange} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Print
          </Button>
          <Button variant="outline" size="sm">
            CSV
          </Button>
          <Button variant="outline" size="sm">
            PDF
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="p-4 border rounded-lg">
            <h3 className="font-medium">{article.title}</h3>
            <p className="text-gray-600">{article.excerpt}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
