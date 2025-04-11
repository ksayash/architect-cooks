
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Modern search with visual feedback
    const searchInput = document.getElementById('search-input');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const recipeGrid = document.querySelector('.recipe-grid');
    
    if (searchInput) {
        // Add clear button
        const searchContainer = document.querySelector('.search-container');
        const clearButton = document.createElement('button');
        clearButton.className = 'search-clear';
        clearButton.innerHTML = '×';
        clearButton.style.display = 'none';
        searchContainer.appendChild(clearButton);
        
        // Focus effect
        searchInput.addEventListener('focus', function() {
            searchContainer.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            if (!this.value) {
                searchContainer.classList.remove('focused');
            }
        });
        
        // Search functionality with animations
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            let matchCount = 0;
            
            // Show/hide clear button
            clearButton.style.display = query ? 'block' : 'none';
            
            recipeCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const matches = title.includes(query) || description.includes(query);
                
                if (matches) {
                    card.style.display = '';
                    card.classList.add('fade-in');
                    setTimeout(() => card.classList.remove('fade-in'), 300);
                    matchCount++;
                } else {
                    card.classList.add('fade-out');
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('fade-out');
                    }, 280);
                }
            });
            
            // Show no results message
            let noResultsMsg = document.querySelector('.no-results');
            if (matchCount === 0 && query) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.innerHTML = '<p>No recipes found. Try a different search term.</p>';
                    recipeGrid.appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
        
        // Clear search
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        });
    }
    
    // Recipe image parallax effect
    const recipeImage = document.querySelector('.recipe-image');
    if (recipeImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const offset = scrollPosition * 0.3;
            if (scrollPosition < 1000) { // Limit effect to top of page
                recipeImage.style.transform = `translateY(${offset}px) scale(${1 + scrollPosition/5000})`;
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
