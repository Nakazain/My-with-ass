import { dom } from "./domElements.js";

setTimeout(() => {
  dom.loading.classList.add("done");
}, 200);

function goToProject() {
  dom.loading.classList.remove("done");
  sessionStorage.setItem("goToProject", "true");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
}

function goToHome() {
  dom.loading.classList.remove("done");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
}

function showBtn() {
  if (dom.showBtn.classList.contains("more")) {
    dom.moreContact.forEach((el, index) => {
      el.classList.remove("hidden");
    });
    dom.showBtn.classList.remove("more");
    dom.showBtn.textContent = "Show Less";
  } else {
    dom.moreContact.forEach((el, index) => {
      el.classList.add("hidden");
    });
    dom.showBtn.classList.add("more");
    dom.showBtn.textContent = "Show More";
  }
}

dom.messageForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const button = form.querySelector("button");
  const originalText = button.textContent;

  button.textContent = "Sending...";
  button.disabled = true;

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const API_ENDPOINT = window.API_ENDPOINT || "/api/telegram";
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result;
    try {
      result = await response.json();
    } catch (err) {
      console.error("Response not JSON:", err);
      alert("Gagal membaca respon dari server.");
      return;
    }

    alert(result.success ? "Pesan terkirim!" : "Gagal mengirim pesan.");
    if (result.success) form.reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengirim pesan.");
  } finally {
    button.textContent = originalText;
    button.disabled = false;
  }
});

dom.showBtn.addEventListener("click", showBtn)
dom.navPrjk.addEventListener("click", goToProject);
dom.navHome.addEventListener("click", goToHome);
