import { isNumber } from 'class-validator';

export const calculatorQueryParams = (payload: {
  page?: number | string;
  limit?: number | string;
}) => {
  const limit =
    payload?.limit && isNumber(payload?.limit) ? payload?.limit : 25;
  const page = payload?.page && Number(payload?.page) > 0 ? +payload?.page : 1;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export function calculatorPagination<T>(res: [T[], number], limit: number) {
  const data = res[0];
  const count = res[0]?.length;
  const total = res[1];
  const pageCount = Math.ceil(res[1] / limit);

  return { data, count, total, pageCount };
}
