const apiUrl = "http://localhost:3000";
const STORAGE_KEY = "secret-santa-token";

const drawBtn = document.getElementById("drawBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

function getTokenFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const queryToken = params.get("token");
  if (queryToken) {
    return queryToken;
  }

  const match = window.location.pathname.match(/\/draw\/(.+)$/);
  if (match) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

function saveToken(token: string) {
  localStorage.setItem(STORAGE_KEY, token);
}

async function getToken(): Promise<string> {
  const urlToken = getTokenFromUrl();
  if (urlToken) {
    saveToken(urlToken);
    return urlToken;
  }

  const storedToken = getStoredToken();
  if (storedToken) {
    return storedToken;
  }

  throw new Error("Token mancante. Usa un URL con ?token=<token> o /draw/<token>.");
}

async function drawWithToken(token: string) {
  const res = await fetch(`${apiUrl}/draw/${encodeURIComponent(token)}`);
  if (!res.ok) throw new Error("Errore nell'estrazione");
  const data = await res.json();
  resultDiv.textContent = `Hai estratto: ${data.target}`;
}

drawBtn.addEventListener("click", async () => {
  resultDiv.textContent = "Sto estraendo...";

  try {
    const token = await getToken();
    await drawWithToken(token);
  } catch (err) {
    console.error(err);
    resultDiv.textContent =
      err instanceof Error ? err.message : "Errore durante l'estrazione.";
  }
});
