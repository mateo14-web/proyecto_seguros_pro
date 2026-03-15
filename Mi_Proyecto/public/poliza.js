// ====== mostrar y ocultar formularios ======
    document.querySelectorAll('.menu-item').forEach(button => {
    button.addEventListener('click', () => {
        const menuId = button.dataset.menu;
        const submenu = document.getElementById(menuId);

        submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
    });
    });

    document.querySelectorAll('.submenu button').forEach(button => {
    button.addEventListener('click', () => {

        const formId = button.dataset.form;

        document.querySelectorAll('.form-section')
                    .forEach(section => section.style.display = 'none');

        document.getElementById(formId).style.display = 'block';
    });
    })







    
    
    