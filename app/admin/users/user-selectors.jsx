"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";

export default function UserSelectors() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchTerm = searchParams.get("query") || "";

  const [immediateSearchTerm, setImmediateSearchTerm] = useState(searchTerm);
  const [roleFilter, setRoleFilter] = useState("all");
  // const deferredSearchTerm = useDeferredValue(immediateSearchTerm);

  const isFirstRender = useRef(true);
  const [debouncedSearchTerm] = useDebounce(immediateSearchTerm, 1000);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) {
      newSearchParams.set("query", debouncedSearchTerm);
    } else {
      newSearchParams.delete("query");
    }

    if (searchTerm !== debouncedSearchTerm) {
      replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [pathname, debouncedSearchTerm, replace, searchParams, searchTerm]);

  // const handleMovieSearch = (term) => setImmediateSearchTerm(term);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center space-x-2 md:w-1/2">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={immediateSearchTerm}
          onChange={(e) => setImmediateSearchTerm(e.target.value)}
          className="h-9"
        />
      </div>
      <div className="flex items-center gap-2">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9">
          <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}
