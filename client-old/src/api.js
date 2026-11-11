const form = document.getElementById('form');
const list = document.getElementById('list');
const nameInput = document.getElementById('name');

const API_URL = `http://${window.location.hostname}:8089/people`;

const loadPeople = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = '';
    data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        list.appendChild(li);
    });
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    nameInput.value = '';
    await loadPeople();
});

loadPeople();

