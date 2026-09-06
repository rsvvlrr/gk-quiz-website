const destinations = [

    {
        id: 1,
        name: "Goa",
        location: "Beaches & nightlife",
        duration: 3,
        budget: "medium",
        price: "₹7,500",
        description:
            "Relax on beautiful beaches, enjoy sunsets and experience Goa's vibrant weekend atmosphere.",
        image:
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 2,
        name: "Manali",
        location: "Mountains & adventure",
        duration: 3,
        budget: "medium",
        price: "₹8,500",
        description:
            "A perfect mountain escape filled with scenic views, cafés, adventure and peaceful valleys.",
        image:
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 3,
        name: "Jaipur",
        location: "Royal heritage",
        duration: 2,
        budget: "low",
        price: "₹4,500",
        description:
            "Explore royal palaces, colourful markets and the rich cultural heritage of the Pink City.",
        image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 4,
        name: "Udaipur",
        location: "Lakes & palaces",
        duration: 2,
        budget: "medium",
        price: "₹6,500",
        description:
            "Experience romantic lakes, magnificent palaces and beautiful sunsets in the City of Lakes.",
        image:
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 5,
        name: "Rishikesh",
        location: "River & adventure",
        duration: 2,
        budget: "low",
        price: "₹4,000",
        description:
            "Enjoy riverside views, peaceful surroundings, cafés and exciting adventure activities.",
        image:
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 6,
        name: "Shimla",
        location: "Hills & nature",
        duration: 4,
        budget: "high",
        price: "₹12,000",
        description:
            "Escape into the hills with beautiful landscapes, cool weather and charming mountain streets.",
        image:
            "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1000&q=85"
    }

];
const destinationGrid =
    document.getElementById("destinationGrid");

const searchInput =
    document.getElementById("search");

const durationSelect =
    document.getElementById("duration");

const budgetSelect =
    document.getElementById("budget");

const favoriteList =
    document.getElementById("favoriteList");

const resultCount =
    document.getElementById("resultCount");

const resetBtn =
    document.getElementById("resetBtn");

const exploreBtn =
    document.getElementById("exploreBtn");

const randomBtn =
    document.getElementById("randomBtn");

const navPlanBtn =
    document.getElementById("navPlanBtn");

const tripModal =
    document.getElementById("tripModal");

const modalContent =
    document.getElementById("modalContent");

const closeModal =
    document.getElementById("closeModal");
let favorites =
    JSON.parse(
        localStorage.getItem("escapeFavorites")
    ) || [];

function displayDestinations(list) {

    destinationGrid.innerHTML = "";

    resultCount.textContent =
        `${list.length} destination${list.length !== 1 ? "s" : ""}`;


    if (list.length === 0) {

        destinationGrid.innerHTML = `

            <div class="no-results">

                <h3>
                    No escapes found 🌿
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;
    }


    list.forEach(destination => {

        const isFavorite =
            favorites.includes(destination.id);


        const card =
            document.createElement("article");


        card.className =
            "destination-card";


        card.innerHTML = `

            <img
                src="${destination.image}"
                alt="${destination.name}"
                class="destination-image"
            >


            <div class="card-content">

                <div class="card-top">

                    <h3>
                        ${destination.name}
                    </h3>


                    <button
                        class="favorite-btn"
                        onclick="toggleFavorite(${destination.id})"
                        aria-label="Add to favorites"
                    >
                        ${isFavorite ? "❤️" : "♡"}
                    </button>

                </div>


                <p>
                    ${destination.location}
                </p>


                <div class="card-info">

                    <span>
                        🗓 ${destination.duration} Days
                    </span>

                    <span class="price">
                        ${destination.price}
                    </span>

                </div>


                <button
                    class="details-btn"
                    onclick="showDetails(${destination.id})"
                >
                    View Trip Details →
                </button>

            </div>

        `;


        destinationGrid.appendChild(card);

    });

}
function filterDestinations() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const duration =
        durationSelect.value;


    const budget =
        budgetSelect.value;


    const filtered =
        destinations.filter(destination => {


            const matchesSearch =
                destination.name
                    .toLowerCase()
                    .includes(search) ||

                destination.location
                    .toLowerCase()
                    .includes(search);


            const matchesDuration =
                duration === "all" ||

                destination.duration ===
                Number(duration);


            const matchesBudget =
                budget === "all" ||

                destination.budget ===
                budget;


            return (
                matchesSearch &&
                matchesDuration &&
                matchesBudget
            );

        });


    displayDestinations(filtered);
}
function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "escapeFavorites",
        JSON.stringify(favorites)
    );


    filterDestinations();

    displayFavorites();
}
function displayFavorites() {

    if (favorites.length === 0) {

        favoriteList.innerHTML = `

            <div class="empty-message">

                <span>♡</span>

                <div>

                    <strong>
                        No favorites yet
                    </strong>

                    <p>
                        Save destinations you want to visit.
                    </p>

                </div>

            </div>

        `;

        return;
    }


    favoriteList.innerHTML =
        favorites.map(id => {

            const destination =
                destinations.find(
                    item => item.id === id
                );


            return `

                <div class="empty-message">

                    <span>❤️</span>

                    <div>

                        <strong>
                            ${destination.name}
                        </strong>

                        <p>
                            ${destination.location}
                            · ${destination.price}
                        </p>

                    </div>

                </div>

            `;

        }).join("");

}
function showDetails(id) {

    const destination =
        destinations.find(
            item => item.id === id
        );


    modalContent.innerHTML = `

        <img
            src="${destination.image}"
            class="modal-image"
            alt="${destination.name}"
        >


        <h2>
            ${destination.name}
        </h2>


        <p>
            ${destination.description}
        </p>


        <p>
            🗓 <strong>${destination.duration} Days</strong>
            &nbsp; · &nbsp;
            💰 <strong>${destination.price}</strong>
        </p>


        <button
            class="modal-plan"
            onclick="planTrip('${destination.name}')"
        >
            Plan My Weekend ✈️
        </button>

    `;


    tripModal.classList.add("active");

}
function planTrip(destination) {

    alert(
        `✨ Great choice!\n\nYour ${destination} weekend escape is ready to plan!`
    );

    closeTripModal();

}
function closeTripModal() {

    tripModal.classList.remove("active");

}


closeModal.addEventListener(
    "click",
    closeTripModal
);


tripModal.addEventListener(
    "click",
    event => {

        if (event.target === tripModal) {

            closeTripModal();

        }

    }
);
exploreBtn.addEventListener(
    "click",
    () => {

        document
            .getElementById("destinations")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);
navPlanBtn.addEventListener(
    "click",
    () => {

        document
            .getElementById("planner")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

randomBtn.addEventListener(
    "click",
    () => {

        const randomIndex =
            Math.floor(
                Math.random() *
                destinations.length
            );


        const randomDestination =
            destinations[randomIndex];


        showDetails(
            randomDestination.id
        );

    }
);

resetBtn.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        durationSelect.value = "all";

        budgetSelect.value = "all";

        displayDestinations(
            destinations
        );

    }
);

searchInput.addEventListener(
    "input",
    filterDestinations
);


durationSelect.addEventListener(
    "change",
    filterDestinations
);


budgetSelect.addEventListener(
    "change",
    filterDestinations
);


displayDestinations(
    destinations
);

displayFavorites();