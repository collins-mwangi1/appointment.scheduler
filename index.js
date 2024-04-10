document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");
  const appointmentsContainer = document.getElementById("appointments");
  let editingId = null; // Track the ID of the appointment being edited

  // Function to fetch all appointments
  function getAppointments() {
    fetch("http://localhost:3000/appointments")
      .then((response) => response.json())
      .then((appointments) => {
        appointmentsContainer.innerHTML = "";
        appointments.forEach((appointment) => {
          const appointmentElement = document.createElement("div");
          appointmentElement.classList.add("mb-3", "border", "p-3");
          appointmentElement.innerHTML = `
              <h3>${appointment.clientName}</h3>
              <p><strong>Date:</strong> ${appointment.date}</p>
              <p><strong>Time:</strong> ${appointment.time}</p>
              <p><strong>Purpose:</strong> ${appointment.purpose}</p>
              <button class="btn btn-danger me-2" onclick="deleteAppointment('${appointment.id}')">Delete</button>`;
          appointmentsContainer.appendChild(appointmentElement);
        });
      });
  }
// function for popup form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

  // Fetch appointments when the page loads
  getAppointments();

  // Function to delete an appointment
  function deleteAppointment(id) {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      fetch(`http://localhost:3000/appointments/${id}`, {
        method: "DELETE",
      }).then(() => {
        getAppointments();
      });
    }
  }

  // Function to delete an appointment
  function deleteAppointment(id) {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      fetch(`http://localhost:3000/appointments/${id}`, {
        method: "DELETE",
      }).then(() => {
        getAppointments();
      });
    }
  }

  // Function to edit an appointment
  function editAppointment(id) {
    editingId = id;
    document.getElementById("clientName").value = id;
    document.getElementById("date").value = id;
    document.getElementById("time").value = id;
    document.getElementById("purpose").value = id;
  }

  // Function to cancel editing an appointment

  // Function to handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const clientName = document.getElementById("clientName").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const purpose = document.getElementById("purpose").value;

    if (editingId) {
      // If editing, update the appointment
      fetch(`http://localhost:3000/appointments/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          date,
          time,
          purpose,
        }),
      }).then(() => {
        getAppointments();
        form.reset();
        editingId = null;
      });
    } else {
      // If not editing, create a new appointment
      fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          date,
          time,
          purpose,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          getAppointments();
          form.reset();
        });
    }
  });
});


function deleteAppointment(id) {
  console.log(id);
  fetch(`http://localhost:3000/appointments/${id}`, {
    method: "DELETE",
  })
}
