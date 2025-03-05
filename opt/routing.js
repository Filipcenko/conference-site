document.addEventListener('DOMContentLoaded', () => {
    // Список всех страниц
    const pages = ['home', 'about', 'features', 'contacts', 'sitemap', 'error-404'];
    
    // Функция для скрытия всех страниц
    function hideAllPages() {
        const allPages = document.querySelectorAll('.page');
        allPages.forEach(page => {
            page.classList.remove('active');
        });
    }

    // Функция для показа страницы
    function showPage(pageId) {
        const page = document.getElementById(pageId);
        if (page) {
            hideAllPages();
            page.classList.add('active');
            window.history.pushState(null, '', `#${pageId}`);
        } else {
            // Если страница не найдена, показываем 404
            showPage('error-404');
        }
    }

    // Обработчик навигации
    function navigateTo(pageId) {
        // Проверяем существование страницы
        if (pages.includes(pageId)) {
            showPage(pageId);
        } else {
            showPage('error-404');
        }
    }

    // Инициализация начальной страницы
    function initializeNavigation() {
        const hash = window.location.hash.substring(1);
        navigateTo(hash || 'home');
    }

    // Обработка клика по ссылкам навигации
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            navigateTo(pageId);
        });
    });

    // Обработка кнопок возврата на главную
    const homeButtons = document.querySelectorAll('a[href="#home"]');
    homeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    });

    // Обработка изменения хеша в URL
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        navigateTo(hash || 'home');
    });

    // Первоначальная инициализация
    initializeNavigation();
});