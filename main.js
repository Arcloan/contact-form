function showError(control) {
    if (control.nodeName == "TEXTAREA") {
        let container = control.closest("div");
        container.querySelector("textarea").classList.add("error");
        container.querySelector("p").classList.remove("hidden");
    }
    else if (!["radio", "checkbox"].includes(control.type)) {
        let container = control.closest("div");
        container.querySelector("input").classList.add("error");
        container.querySelector("p").classList.remove("hidden");
    }
    else {
        if (control.type == "radio") {
            let container = control.closest("fieldset");
            container.querySelector("p").classList.remove("hidden");
        }
        else {
            let container = control.closest("div");
            container.querySelector("p").classList.remove("hidden");
        }
    }
}

function clearError(e) {
    let control = e.target;
    if (control.nodeName == "TEXTAREA") {
        let container = control.closest("div");
        container.querySelector("textarea").classList.remove("error");
        container.querySelector("p").classList.add("hidden");
    }
    else if (!["radio", "checkbox"].includes(control.type)) {
        let container = control.closest("div");
        container.querySelector("input").classList.remove("error");
        container.querySelector("p").classList.add("hidden");
    }
    else {
        if (control.type == "radio") {
            let container = control.closest("fieldset");
            container.querySelector("p").classList.add("hidden");
        }
        else {
            let container = control.closest("div");
            container.querySelector("p").classList.add("hidden");
        }
    }
}

function clearFields() {
    document.querySelectorAll("input").forEach(control => {
        if (!["radio", "checkbox"].includes(control.type)) {
            control.value = "";
        }
        else {
            control.checked = false;
        }
    });
    document.querySelector("textarea").value = "";
    document.querySelector('[checked]').removeAttribute("checked");
}

document.querySelectorAll("input").forEach(control => {
    control.addEventListener("focus", clearError);
})

document.querySelector("textarea").addEventListener("focus", clearError);

document.querySelector("button").addEventListener("click", (e) => {
    let form = document.querySelector("form");
    e.preventDefault();
    let countedErrors = 0;
    for (let control of form.elements) {
        let validity = control.validity.valid;
        if (validity) {
            continue;
        }
        showError(control);
        countedErrors++;
    }
    if (!countedErrors) {
        clearFields();
        document.querySelector(".success").classList.remove("hidden");
        setTimeout(() => document.querySelector(".success").classList.add("hidden"), 3000);
    }
});

document.querySelectorAll('input[type="radio"]').forEach(control => {
    control.addEventListener("click", e => {
        let selected = e.target.nextElementSibling.textContent;
        let container = e.target.closest("fieldset");
        container.querySelectorAll('label').forEach(radioValue => {
            if (radioValue.textContent == selected) {
                radioValue.previousElementSibling.setAttribute("checked", true);
            }
            else {
                radioValue.previousElementSibling.removeAttribute("checked");
            }
        })
    })
})