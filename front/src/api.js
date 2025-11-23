const API_URL = "https://localhost:5029/api/projet"; 

export async function fetchProjects() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addProject(project) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function updateProject(id, project) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function deleteProject(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
