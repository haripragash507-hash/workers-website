document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("serviceType").value;
  const date = document.getElementById("date").value;
  const message = document.getElementById("formMessage");

  if (!name || !phone || !service || !date) {
    message.textContent = "❌ Please fill in all fields correctly.";
    message.style.color = "red";
    return;
  }

  message.textContent = `✅ Thank you ${name}, your ${service} service is booked for ${date}.`;
  message.style.color = "green";
  this.reset();
});
