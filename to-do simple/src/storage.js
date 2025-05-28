export async function getFromJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const storage = {
  getData: () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  },
  setData: (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};

