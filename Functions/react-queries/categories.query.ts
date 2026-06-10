import { categoryList } from "@/api/hooks/categories/categories.api";
import { useQuery } from "@tanstack/react-query";
import { allkeys } from "./allKeys";

export const useCategoryList = () => {
  return useQuery({
    queryKey: [allkeys.CATEGORY_LIST],
    queryFn: categoryList,
  });
};
