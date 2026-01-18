// Dark mode toggle
let themeButton = document.getElementById("theme-button");

// Toggle dark mode function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};

// Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);

// AI Suggestions Database
const healthSuggestions = {
    "fever": ["Drink plenty of water", "Rest and get adequate sleep", "Use fever reducers like paracetamol", "Monitor your temperature regularly"],
    "cough": ["Stay hydrated", "Use honey or cough drops", "Avoid irritants like smoke", "Consider a humidifier"],
    "headache": ["Rest in a dark room", "Apply cold or warm compress", "Stay hydrated", "Avoid caffeine"],
    "fatigue": ["Get 7-8 hours of sleep", "Exercise regularly", "Eat balanced meals", "Manage stress levels"],
    "nausea": ["Eat small, frequent meals", "Avoid heavy foods", "Stay hydrated with ginger tea", "Rest and relax"],
    "body ache": ["Gentle stretching", "Warm baths", "Massage affected areas", "Stay active but avoid strenuous exercise"],
    "cold": ["Consume vitamin C rich foods", "Get plenty of rest", "Use saline nasal drops", "Gargle with salt water"],
    "sore throat": ["Drink warm liquids", "Use throat lozenges", "Gargle with salt water", "Avoid smoking and polluted air"]
};

// Function to provide AI suggestions based on user input
const getAISuggestions = (inputText) => {
    const suggestionsContainer = document.getElementById("suggestions-container");
    const suggestionsList = document.getElementById("suggestions-list");
    
    if (!inputText || inputText.trim().length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    const lowerInput = inputText.toLowerCase();
    let matchedSuggestions = [];

    // Search for matching keywords in the suggestions database
    for (const [keyword, suggestions] of Object.entries(healthSuggestions)) {
        if (keyword.includes(lowerInput) || lowerInput.includes(keyword)) {
            matchedSuggestions = suggestions;
            break;
        }
    }

    if (matchedSuggestions.length > 0) {
        suggestionsList.innerHTML = "";
        matchedSuggestions.forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = "✓ " + suggestion;
            suggestionsList.appendChild(li);
        });
        suggestionsContainer.style.display = "block";
    } else {
        suggestionsContainer.style.display = "none";
    }
};

// Add event listeners to form inputs for real-time suggestions
const nameInput = document.getElementById("name");
const hometownInput = document.getElementById("hometown");
const emailInput = document.getElementById("email");

nameInput.addEventListener("input", (e) => getAISuggestions(e.target.value));
hometownInput.addEventListener("input", (e) => getAISuggestions(e.target.value));
emailInput.addEventListener("input", (e) => getAISuggestions(e.target.value));

// Signature count
let count = 3; // Starting count of signatures

// Add signature function
// Updated addSignature function to use toggleModal
const addSignature = () => {
    const name = document.getElementById("name").value.trim();
    const hometown = document.getElementById("hometown").value.trim();

    const newSignature = document.createElement("p");
    newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

    const signaturesContainer = document.querySelector(".signatures");
    const counter = document.getElementById("counter");
    signaturesContainer.insertBefore(newSignature, counter);

    count++;
    counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    // Call the modal with the user's details
    toggleModal(name, hometown);
};

// Validate form inputs
const validateForm = () => {
    let containsErrors = false;

    const petitionInputs = document.getElementById("sign-petition").elements;

    for (let input of petitionInputs) {
        if (input.type !== "submit") {
            if (input.value.trim().length < 2) {
                input.classList.add("error");
                containsErrors = true;
            } else {
                input.classList.remove("error");
            }
        }
    }

    const email = document.getElementById("email");
    if (email.value && !email.value.includes("@gmail.com")) {
        email.classList.add("error");
        containsErrors = true;
    } else {
        email.classList.remove("error");
    }

    if (!containsErrors) {
        addSignature();
        clearForm();
    }
};

// Clear form fields
const clearForm = () => {
    const petitionInputs = document.getElementById("sign-petition").elements;
    for (let input of petitionInputs) {
        input.value = "";
    }
};

// Event listener for the "Sign Now" button
document.getElementById("sign-now-button").addEventListener("click", (e) => {
    e.preventDefault();
    validateForm();
});

// Animation settings for revealable content
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: "2s",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
};

const revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
    let windowHeight = window.innerHeight;

    for (let container of revealableContainers) {
        let topOfContainer = container.getBoundingClientRect().top;

        if (topOfContainer < windowHeight - 100) {
            container.classList.add("active");
        } else {
            container.classList.remove("active");
        }
    }
};

// Attach the reveal function to the scroll event
window.addEventListener("scroll", reveal);

// Reduce Motion Button
let reduceMotionButton = document.getElementById("reduce-motion-button");

const reduceMotion = () => {
    document.body.classList.toggle("reduce-motion");
};

// Event listener for the Reduce Motion button
reduceMotionButton.addEventListener("click", reduceMotion);

// Toggle modal function
const toggleModal = (personName, personHometown) => {
    // Select modal elements
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-content-modal");

    // Ensure modal elements exist
    if (!modal || !modalContent) {
        console.error("Modal or modal content not found in the DOM.");
        return;
    }

    // Update modal text with user details or defaults
    modalContent.textContent = `Thank you so much ${
        personName || "our valued supporter"
    }! ${personHometown || "your hometown"} represent!`;

    // Display the modal
    modal.style.display = "flex";

    // Call the scaleImage function every 500ms to animate the scaling
    let intervalId = setInterval(scaleImage, 500);

    // Hide the modal and stop scaling animation after 4 seconds
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 10000);
};

// Scale image function
let scaleFactor = 1; // Initial scale factor
const modalImage = document.querySelector("#thanks-modal img"); // Select the modal image

const scaleImage = () => {
    // Toggle scaleFactor between 1 and 0.8
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  
    // Apply the scale transformation to the image
    modalImage.style.transform = `scale(${scaleFactor})`;
};
// Selecting the new button
const scaleImageButton = document.getElementById("scale-image-button");

// Event listener to scale the image when the button is clicked
scaleImageButton.addEventListener("click", () => {
    scaleImage(); // This will call the scaleImage function you defined earlier
});
// Select the button that will close the modal
const closeModalButton = document.getElementById("close-modal-button");

// Function to hide the modal
const closeModal = () => {
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none"; // Set modal display to none
};

// Add the closeModal function as a click event listener to the button
closeModalButton.addEventListener("click", closeModal);
