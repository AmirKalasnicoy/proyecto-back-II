const form = document.getElementById('registerForm');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const dataForm = new FormData(form);
    const obj = {};

    dataForm.forEach((value, key) => {
        obj[key] = value;
    });

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert("✅ Usuario registrado con éxito!");
            window.location.replace('/users/login');
        } else if (response.status === 400) {
            alert("⚠️ El usuario ya existe");
        } else {
            alert("❌ Error al crear el usuario.");
        }

    } catch (error) {
        console.error("Error en el registro:", error);
        alert("❌ Error inesperado en el registro.");
    }
});
