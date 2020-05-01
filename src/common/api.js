export const uploadFiles = async (reqObj) => {
  try {
    const response = await fetch('http://localhost:8000/api/file/upload', {
      method: 'post',
      body: reqObj
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}