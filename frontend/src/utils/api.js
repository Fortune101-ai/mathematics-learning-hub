import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("auth/me"),
};

const topicsAPI = {
  getAll: () => api.get("/topics"),
  getById: (id) => api.get(`/topics/${id}`),
};

const chaptersAPI = {
  getById: (id) => api.get(`/chapters/${id}`),
};

const quizzesAPI = {
  getById: (id) => api.get(`/quizzes/${id}`),
  submit: (id, data) => api.post(`/quizzes/${id}/submit`, data),
};

const tutorsAPI = {
  getAll: () => api.get("/tutors"),
  getById: (id) => api.get(`/tutors/${id}`),
};

const bookingsAPI = {
  create: (data) => api.post("/bookings", data),
  getAll: () => api.get("/bookings"),
  update: (id, data) => api.patch(`/bookings/${id}`, data),
};

const forumAPI = {
  getAll: (params) => api.get("/forum", { params }),
  getById: (id) => api.get(`/forum/${id}`),
  create: (data) => api.post("/forum", data),
  addReply: (id, data) => api.post(`/forum/${id}/reply`, data),
  vote: (id, vote) => api.patch(`/forum/${id}/vote`, { vote }),
};

const progressAPI = {
  getAll: () => api.get("/progress"),
  getByTopic: (topicId) => api.get(`/progress/topic/${topicId}`),
  update: (data) => api.post("/progress", data),
};

export {
  authAPI,
  topicsAPI,
  chaptersAPI,
  quizzesAPI,
  tutorsAPI,
  bookingsAPI,
  forumAPI,
  progressAPI,
};
export default api;
