const API_BASE_URL = "http://127.0.0.1:8000";

interface ApiOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  requireAuth?: boolean;
}

export async function apiRequest<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, requireAuth = false } = options;

  // Build headers with auth token if required
  let headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (requireAuth) {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Authentication required");
    }
    headers = {
      ...headers,
      Authorization: `Bearer ${access_token}`,
    };
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body && method !== "GET") {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, requestOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (response.status === 401 && requireAuth) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    throw {
      status: response.status,
      message: errorData.detail || "Server Error",
      errors: errorData,
    };
  }

  return response.json().catch(() => ({})) as Promise<T>;
}

interface BussinessData {
  yesterday_revenue?: number;
  yesterday_cost?: number;
  yesterday_customer?: number;
  today_revenue?: number;
  today_cost?: number;
  today_customer?: number;
}

interface BussinessDataAnalyzeResult {
  profit: number;
  alerts: string[];
  recommendations: string[];
}

export const analyzeBusinessData = (
  data: BussinessData
): Promise<BussinessDataAnalyzeResult> => {
  return apiRequest("/analyze/", {
    method: "POST",
    body: {
      today: {
        revenue: data.today_revenue,
        cost: data.today_cost,
        customers: data.today_customer,
      },
      yesterday: {
        revenue: data.yesterday_revenue,
        cost: data.yesterday_cost,
        customers: data.yesterday_customer,
      },
    },
    requireAuth: false,
  });
};

interface UserData {
  results: Result[];
  info: Info;
}

interface Result {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Street {
  number: number;
  name: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface Dob {
  date: string;
  age: number;
}

interface Registered {
  date: string;
  age: number;
}

interface Id {
  name: string;
  value: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export const login = async (): Promise<UserData> => {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  const data = await res.json();
  return data;
};
