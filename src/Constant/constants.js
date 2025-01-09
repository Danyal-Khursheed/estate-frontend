export let isProd = true;

export const baseURl = "http://localhost:3000";
const prodBaseURL = "https://estate-backend-production.up.railway.app";

export const apiBaseURL = isProd ? prodBaseURL : baseURl;
