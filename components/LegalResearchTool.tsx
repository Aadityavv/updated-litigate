"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function LegalResearchTool() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch results from the API
  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummy-backend-15jt.onrender.com/research/legal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          categories: selectedCategories,
          sort: sortOption,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results.");
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults();
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    fetchResults();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    fetchResults();
  };

  return (
    <div className="p-0 sm:p-6 bg-gray-0">
      <Toaster position="top-right" />
      <Card className="shadow-lg max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Legal Research Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="search"
                placeholder="Search legal materials..."
                className="flex-grow px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            {/* Filters Sidebar */}
            <div
              className={`mb-8 lg:mb-0 lg:w-1/4 transition-all duration-300 ${
                isFiltersVisible ? "block" : "hidden"
              }`}
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Filters
                  </h2>
                </div>
                <div className="space-y-6">
                  {/* Categories Filter */}
                  <div>
                    <Label className="text-lg font-medium text-gray-700">
                      Categories
                    </Label>
                    <div className="mt-2 space-y-2">
                      {["Law", "Case Study", "Article", "Statute"].map(
                        (category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() =>
                                handleCategoryChange(category)
                              }
                            />
                            <label
                              htmlFor={category}
                              className="text-sm font-medium text-gray-600"
                            >
                              {category}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* <div>
                    <Label className="text-lg font-medium text-gray-700">
                      Categories
                    </Label>
                    <div className="mt-2 space-y-2">
                      {["Law", "Case Study", "Article", "Statute"].map(
                        (category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() =>
                                handleCategoryChange(category)
                              }
                            />
                            <label
                              htmlFor={category}
                              className="text-sm font-medium text-gray-600"
                            >
                              {category}
                            </label>
                          </div>
                        )
                      )}
                    </div> */}
                  {/* </div> */}

                  <div>
                    <Label className="text-lg font-medium text-gray-700">
                      Jurisdiction
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="federal">Federal</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="international">
                          International
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-lg font-medium text-gray-700">
                      Practice Area
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select practice area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate Law</SelectItem>
                        <SelectItem value="criminal">Criminal Law</SelectItem>
                        <SelectItem value="family">Family Law</SelectItem>
                        <SelectItem value="intellectual">
                          Intellectual Property
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </div>
            </div>

            {/* Search Results Area */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Search Results
                </h2>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm text-gray-600">Sort by:</Label>
                  <Select
                    onValueChange={handleSortChange}
                    value={sortOption}
                  >
                    <SelectTrigger className="w-36 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="recency">Recency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-6">
                {loading ? (
                  <p>Loading...</p>

                ) : results.length > 0 ? (
                  results.map((result, index) => (
                    
                    <div
                      key={index}
                      className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                    >
                      
                      
                      <h3 className="font-semibold text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {result.title}
                        </a>
                      </h3>
                      <div className="flex items-center space-x-3 my-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 px-2 py-1"
                        >
                          {result.type}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(result.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        {result.snippet}
                      </p>
                      <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                        onClick={() => window.open(result.link, "_blank")}
                      >
                        <span>View Full Document</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No results found. Please refine your search.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
