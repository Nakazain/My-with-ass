import { dom } from "./domElements.js";

dom.navPrjk.addEventListener("click", function(e) {
  e.preventDefault(); 
  sessionStorage.setItem("goToProject", "true");
  window.location.href = "index.html";
});

dom.moreBtn.addEventListener("click", function(e) {
  dom.moreContact.forEach((el, index) => {
    el.classList.remove("hidden")
  });
  dom.moreBtn.id = "less";
  dom.moreBtn.textContent = "Show Less"
});

dom.massafeForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const button = form.querySelector('button');
  const originalText = button.textContent;

  button.textContent = 'Sending...';
  button.disabled = true;

  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    let result;
    try {
      result = await response.json();
    } catch (err) {
      console.error('Response not JSON:', err);
      alert('Gagal membaca respon dari server.');
      return;
    }

    alert(result.success ? 'Pesan terkirim!' : 'Gagal mengirim pesan.');
    if (result.success) form.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat mengirim pesan.');
  } finally {

    button.textContent = originalText;
    button.disabled = false;
  }
});
