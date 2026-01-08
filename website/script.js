
        document.addEventListener('DOMContentLoaded', () => {
            const servicesContainer = document.getElementById('services-container');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            // Use a dynamic card width calculation for better responsiveness
            const updateCardWidth = () => {
                const firstCard = servicesContainer.querySelector('.service-card');
                if (firstCard) {
                    const style = window.getComputedStyle(firstCard);
                    const width = parseFloat(style.width);
                    const gap = parseFloat(window.getComputedStyle(servicesContainer).getPropertyValue('gap'));
                    return width + gap;
                }
                return 324; // Fallback value
            };

            // Scroll to the next set of cards
            nextBtn.addEventListener('click', () => {
                const cardWidth = updateCardWidth();
                servicesContainer.scrollBy({
                    left: cardWidth * 2,
                    behavior: 'smooth'
                });
            });

            // Scroll to the previous set of cards
            prevBtn.addEventListener('click', () => {
                const cardWidth = updateCardWidth();
                servicesContainer.scrollBy({
                    left: -cardWidth * 2,
                    behavior: 'smooth'
                });
            });
        });
