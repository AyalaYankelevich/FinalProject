import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api";

// Thunk כללי לטיפול בבקשות API
export const fetchByController = createAsyncThunk(
  "api/fetchByController",
  async ({ controller, action = "", params = {}, method = "get" }, thunkAPI) => {
    try {
      return await fetchData(controller, action, params, method);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.response?.data?.message || 'An unknown error occurred');
    }
  }
);


// --- 1. ת'אנק ספציפי להתחברות לקוח (login) ---
export const loginClient = createAsyncThunk(
  "client/login", // השם המקורי שציינת
  async (id, { rejectWithValue }) => {
    try {
const client = await fetchData('Client', 'get', { id }, 'get');
      return client; // מחזיר רק את אובייקט הלקוח
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'לקוח לא נמצא.';
      return rejectWithValue({ message: errorMessage }); 
    }
  }
);

// --- 2. ת'אנק ספציפי להתחברות מטפל (loginAttendant) ---
export const loginAttendant = createAsyncThunk(
  "attendant/login", // שם ספציפי לפעולת ה-login attendant
  async (id, { rejectWithValue }) => {
    try {
      const attendant = await fetchData('ClinicAppointment', 'getByAttendentId', { id }, 'get'); 
      return attendant; // מחזיר רק את אובייקט המטפל
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'מטפל לא נמצא.';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// --- 3. ת'אנק ספציפי ליצירת לקוח (sign up / register) ---
export const createClient = createAsyncThunk(
  "client/create", 
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await fetchData('Client', 'create', clientData, 'post');
      return response; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'ההרשמה נכשלה.';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// --- 4. ת'אנק ספציפי לאחזור כל הלקוחות (אם נדרש) ---
export const fetchAllClients = createAsyncThunk(
  "client/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchData('Client', 'getAll', {}, 'get');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'אחזור לקוחות נכשל.';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const fetchClientById = createAsyncThunk(
  "client/fetchClientById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Client/getById?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAttendantById = createAsyncThunk(
  "attendant/fetchAttendantById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Attendant/getById?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);