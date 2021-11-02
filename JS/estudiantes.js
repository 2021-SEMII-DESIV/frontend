(() => {
    const form = document.getElementById('student-form');
    const students = {};
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const output = document.querySelector('.student-output');
        const name = document.getElementById('name').value;
        const id = document.getElementById('id').value;
        if(students[id]){
            alert('El estudiante ya existe en la lista.');
            return;
        }
        students[id] = true;
        const html = `<div class="card"><h3>${name}</h3><p>${id}</p></div>`;
        output.innerHTML += html;
    };
    form.addEventListener('submit', formSubmitHandler);
})();