"use client";
import type { AxiosInstance } from "axios";
import { stringify } from "query-string";
import type { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "@refinedev/simple-rest";
import Cookies from "js-cookie";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

const API_URL = "https://xigc25n7ga.execute-api.us-east-2.amazonaws.com/Krishi";

const farmWorkDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany" | "getMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const resources = meta?.resources ?? resource;
    const url = `${apiUrl}/${resources}`;

    const { current = 1, pageSize = 10, mode = "client" } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query._start = (current - 1) * pageSize;
      query._end = current * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const combinedQuery = { ...query, ...queryFilters };
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;

    const { data, headers } = await httpClient[requestMethod](urlWithQuery, {
      headers: headersFromMeta,
    });

    const total = +headers["x-total-count"];

    console.log(data);

    return {
      data,
      total: total || data.length,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const auth = Cookies.get("auth") ?? "";
    const user = JSON.parse(auth);

    const params = {
      ...variables,
    };

    if (meta?.includeUserEmail && user?.email) {
      params["userEmail"] = user.email;
    }

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await httpClient[requestMethod](url, {}, {
      headers,
      params,
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const idName = meta?.idName;
    const url = `${apiUrl}/${resource}?${idName}=${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const auth = Cookies.get("auth") ?? "";
    const user = JSON.parse(auth);

    const params = {   
      ...variables,
    };

    if (meta?.includeUserEmail && user?.email) {
      params["userEmail"] = user.email;
    }
    
    const { data } = await httpClient[requestMethod](url, {}, {
      headers,
      params,
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const idName = meta?.idName;
    const url = `${apiUrl}/${resource}?${idName}=${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](url, { headers });
    console.log(data);

    if (data?.length > 0) {
      return {
        data: data[0],
      };
    } else {
      return {
        data: {}
      }
    }
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const idName = meta?.idName;
    const auth = Cookies.get("auth") ?? "";
    const user = JSON.parse(auth);

    const url = `${apiUrl}/${resource}?${idName}=${id}&userEmail=${user.email}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});

// import dataProviderSimpleRest from "@refinedev/simple-rest";

//const API_URL = "https://api.fake-rest.refine.dev";
export const dataProvider = farmWorkDataProvider(API_URL);
