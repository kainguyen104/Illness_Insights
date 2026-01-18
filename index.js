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
    "fever": ["Drink plenty of water and stay hydrated", "Rest and get adequate sleep", "Use fever reducers like paracetamol or ibuprofen as needed", "Monitor your temperature regularly", "Apply cool compresses to your forehead"],
    "cough": ["Stay hydrated with warm water and herbal tea", "Use honey or cough drops to soothe your throat", "Avoid irritants like smoke and cold air", "Consider using a humidifier to add moisture to the air", "Elevate your head while sleeping"],
    "headache": ["Rest in a dark, quiet room", "Apply cold or warm compress to your head or neck", "Stay hydrated and drink plenty of water", "Avoid caffeine and alcohol", "Practice relaxation and breathing exercises"],
    "fatigue": ["Get 7-8 hours of quality sleep every night", "Exercise regularly with moderate activity", "Eat balanced meals with protein and nutrients", "Manage stress through meditation or yoga", "Take short breaks during work"],
    "nausea": ["Eat small, frequent meals instead of large ones", "Avoid heavy, greasy, or spicy foods", "Stay hydrated with ginger tea or lemon water", "Rest and avoid sudden movements", "Breathe fresh air and avoid strong odors"],
    "body ache": ["Gentle stretching and light movement", "Warm baths or showers to relax muscles", "Massage affected areas gently", "Stay active but avoid strenuous exercise", "Use over-the-counter pain relief if needed"],
    "cold": ["Consume vitamin C rich foods like citrus fruits", "Get plenty of rest and sleep", "Use saline nasal drops or spray", "Gargle with salt water for throat relief", "Drink warm liquids like tea and broth"],
    "sore throat": ["Drink warm liquids like tea with honey", "Use throat lozenges or sugar-free candy", "Gargle with salt water 2-3 times daily", "Avoid smoking and secondhand smoke", "Get plenty of rest to help recovery"],
    "stomach ache": ["Eat bland foods like rice and toast", "Avoid dairy, fatty, and spicy foods", "Stay hydrated with water or electrolyte drinks", "Rest and avoid strenuous activity", "Try ginger tea or peppermint to ease digestion"],
    "dizziness": ["Sit or lie down until it passes", "Avoid sudden movements or position changes", "Stay hydrated and drink water", "Avoid heights and operating machinery", "Focus on a fixed point to regain balance"]
};

// Function to check symptoms and show AI suggestions
const checkSymptom = () => {
    const symptomInput = document.getElementById("symptom-input");
    const inputValue = symptomInput.value.trim().toLowerCase();
    const resultsDiv = document.getElementById("symptom-results");
    const noMatchDiv = document.getElementById("no-match-message");
    const symptomTitle = document.getElementById("symptom-title");
    const adviceList = document.getElementById("advice-list");

    // Clear previous results
    resultsDiv.style.display = "none";
    noMatchDiv.style.display = "none";

    if (!inputValue || inputValue.length < 2) {
        noMatchDiv.style.display = "block";
        noMatchDiv.innerHTML = "<p>Please enter a symptom to check.</p>";
        return;
    }

    // Search for matching symptoms
    let foundMatch = false;
    for (const [symptom, advice] of Object.entries(healthSuggestions)) {
        if (symptom.includes(inputValue) || inputValue.includes(symptom)) {
            foundMatch = true;
            // Display results
            symptomTitle.textContent = `Advice for ${symptom.charAt(0).toUpperCase() + symptom.slice(1)}`;
            
            adviceList.innerHTML = "";
            advice.forEach(tip => {
                const li = document.createElement("li");
                li.textContent = tip;
                adviceList.appendChild(li);
            });

            resultsDiv.style.display = "block";
            break;
        }
    }

    if (!foundMatch) {
        noMatchDiv.style.display = "block";
        noMatchDiv.innerHTML = `<p>We don't have specific advice for "<strong>${inputValue}</strong>" yet. Try common symptoms like: fever, cough, headache, fatigue, nausea, body ache, cold, sore throat, stomach ache, or dizziness.</p>`;
    }
};

// Event listener for the check symptom button
document.getElementById("check-symptom-btn").addEventListener("click", checkSymptom);

// Allow Enter key to check symptom
document.getElementById("symptom-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkSymptom();
    }
});

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
