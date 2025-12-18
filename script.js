// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // ----- SMOOTH SCROLL FUNCTION -----
    window.scrollToForm = function () {
        const formSection = document.getElementById("enquiry");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // ----- FORM SUBMISSION -----
    const form = document.getElementById("enquiryForm");
    const responseMessage = document.getElementById("responseMessage");

    if (!form) {
        console.error("❌ enquiryForm not found");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch(
                "https://backkend-schl.onrender.com/api/enquiry",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            responseMessage.style.color = "green";
            responseMessage.innerText = result.message || "✅ Enquiry submitted successfully";

            form.reset();

        } catch (error) {
            console.error(error);
            responseMessage.style.color = "red";
            responseMessage.innerText = "❌ Backend not connected";
        }
    });
});
