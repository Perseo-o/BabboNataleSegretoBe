const apiUrl = "https://METTERE-QUI-IL-LINK.trycloudflare.com";

const nameSelect = document.getElementById("nameSelect") as HTMLSelectElement;
const drawBtn = document.getElementById("drawBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

async function loadParticipants() {
  try {
    const res = await fetch(`${apiUrl}/draw/participants`);
    if (!res.ok) throw new Error("Errore caricamento partecipanti");

    const participants = await res.json();

    nameSelect.innerHTML = `<option value="">-- Seleziona il tuo nome --</option>`;

    participants.forEach((p: string) => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      nameSelect.appendChild(opt);
    });
  } catch (err) {
    console.error(err);
    nameSelect.innerHTML = `<option value="">Errore nel caricamento</option>`;
  }
}

drawBtn.addEventListener("click", async () => {
  const selectedName = nameSelect.value;

  if (!selectedName) {
    resultDiv.textContent = "Seleziona un nome.";
    return;
  }

  try {
    const res = await fetch(
      `${apiUrl}/draw?name=${encodeURIComponent(selectedName)}`
    );
    if (!res.ok) throw new Error("Errore nell'estrazione");

    const data = await res.json();
    resultDiv.textContent = `Hai estratto: ${data.target}`;
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Errore durante l'estrazione.";
  }
});

loadParticipants();
