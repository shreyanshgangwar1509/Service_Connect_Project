import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities } from '@/lib/constants/cities';
import { SearchResults } from './SearchResults';

export function SearchSection() {
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
        <Input 
          className="flex-grow bg-white"
          placeholder="What service are you looking for?"
        />
        <Select>
          <SelectTrigger className="w-full md:w-[180px] bg-blue-600 text-white">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={() => setShowResults(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {showResults && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto pt-20">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => setShowResults(false)}
            >
              ← Back to Home
            </Button>
            <SearchResults />
          </div>
        </div>
      )}
    </>
  );
}