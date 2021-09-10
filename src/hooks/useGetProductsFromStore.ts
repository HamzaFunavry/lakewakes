import { useQuery, UseQueryOptions } from "react-query";
import { http } from "../utils/axiosConfig";
import RNIap, { Product } from "react-native-iap";

function getProductsFromStore(itemSkus: string[]) {
  return RNIap.getProducts(itemSkus);
}

export function useGetProductsFromStore(
  itemSkus: string[],
  options?: UseQueryOptions<Product[], Error, Product[]>
) {
  return useQuery(itemSkus, () => getProductsFromStore(itemSkus), {
    staleTime: Infinity,
    ...options,
  });
}
