
const button = document.querySelectorAll("button.delete-message");

if (button.length) {
    button.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (!confirm("Are you sure you want to delete this message?")) {
                e.preventDefault()
            };
        })
    })
}

