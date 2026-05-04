import axios from 'axios';

const API_BASE_URL =  'http://127.0.0.1:8000';

export const assessRisk = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/assess_risk`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Error assessing risk:", error);
    throw error;
  }
};

export const chatWithAI = async (message, context) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`,
      { message, context });
    return response.data;
  } catch (error) {
    console.error("Error chatting with AI:", error);
    throw error;
  }
};
