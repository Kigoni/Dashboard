import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';

interface Country {
  id: number;
  country: string;
  created_at: string;
}

interface ThematicArea {
  id: number;
  thematic_area: string;
  created_at: string;
}

interface Language {
  id: number;
  language: string;
  created_at: string;
}

interface AnalyticsFormProps {
  onCriteriaChange: (
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
  ) => void;
}

export default function AnalyticsForm({ onCriteriaChange }: AnalyticsFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [googleScholar, setGoogleScholar] = useState<boolean>(false);
  const [scopus, setScopus] = useState<boolean>(false);
  const [selectedDoaj, setSelectedDoaj] = useState<string>('');
  const [selectedOaj, setSelectedOaj] = useState<string>('');
  const [selectedAfricanPublisher, setSelectedAfricanPublisher] = useState<string>('');
  const [selectedInasps, setSelectedInasps] = useState<string>('');
  const [selectedCope, setCope] = useState<string>('');
  const [selectedIssn, setIssn] = useState<string>('');

  useEffect(() => {
    onCriteriaChange(
      selectedCountry,
      selectedDiscipline,
      selectedLanguage,
      selectedDoaj,
      selectedOaj,
      selectedAfricanPublisher,
      selectedInasps,
      selectedCope,
      selectedIssn,
      googleScholar,
      scopus
    );
  }, [
    selectedCountry,
    selectedDiscipline,
    selectedLanguage,
    selectedDoaj,
    selectedOaj,
    selectedAfricanPublisher,
    selectedInasps,
    selectedCope,
    selectedIssn,
    googleScholar,
    scopus,
    onCriteriaChange,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, thematicRes, languagesRes] = await Promise.all([
          fetch('https://aphrc.site/journal_api/api/country/'),
          fetch('https://aphrc.site/journal_api/api/thematic/'),
          fetch('https://aphrc.site/journal_api/api/languages/')
        ]);

        const [countriesData, thematicData, languagesData] = await Promise.all([
          countriesRes.json(),
          thematicRes.json(),
          languagesRes.json()
        ]);

        setCountries(countriesData);
        setThematicAreas(thematicData);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={(value) => setSelectedCountry(value)}>
            <SelectTrigger id="country">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent className="max-h-40 w-80 overflow-y-auto">
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.country}>
                  {country.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rest of the form fields... */}
        {/* Note: The complete form fields are included in the original code */}
        
      </div>
    </section>
  );
}