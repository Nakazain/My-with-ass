navPrjk.addEventListener("click", function(e) {
  e.preventDefault(); 
  sessionStorage.setItem("goToProject", "true");
  window.location.href = "index.html";
});

    document.getElementById('contact-form').addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.success ? "Pesan terkirim!" : "Gagal mengirim pesan.");
    });