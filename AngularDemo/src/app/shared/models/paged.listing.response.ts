export interface PagedListingResponse<T> {
  pageNumber: number | null;
  pageSize: number | null;
  totalPages: number;
  totalRecords: number;
  data: T[] | null;
}
