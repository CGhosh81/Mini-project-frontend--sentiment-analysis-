const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check local storage for theme preference and apply it
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀"; // Sun icon for light mode
}

// Event listener for theme toggle button
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update button icon and save preference in local storage
    if (body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀"; // Light mode icon
        localStorage.setItem("dark-mode", "enabled");
    } else {
        themeToggle.textContent = "☀"; // Dark mode icon
        localStorage.setItem("dark-mode", "disabled");
    }
});


//////            loading indicator


















////////////////////////////////////////////////          ALL previous codes





// // // // // // document.addEventListener("DOMContentLoaded", () => {
// // // // // //     const analyzeButton = document.querySelector(".analyze-btn");
// // // // // //     const loadingIndicator = document.getElementById("loading-indicator");

// // // // // //     analyzeButton.addEventListener("click", async () => {
// // // // // //         const productUrl = document.getElementById("input-url").value.trim();
// // // // // //         const productType = document.getElementById("input-type").value;

// // // // // //         if (!productUrl || !productType) {
// // // // // //             alert("Please enter a product URL and select a product type.");
// // // // // //             return;
// // // // // //         }

// // // // // //         if (!isValidURL(productUrl)) {
// // // // // //             alert("Please enter a valid URL.");
// // // // // //             return;
// // // // // //         }

// // // // // //         const apiUrl = "http://localhost:5000/Fetch_Product_reviews";
// // // // // //         const requestUrl = `${apiUrl}?url=${encodeURIComponent(productUrl)}&type=${productType}`;

// // // // // //         // Show loading indicator before starting fetch
// // // // // //         loadingIndicator.style.display = "block";

// // // // // //         try {
// // // // // //             console.log("Fetching data from:", requestUrl);
// // // // // //             const response = await fetch(requestUrl);
// // // // // //             console.log("Response Status:", response.status);

// // // // // //             const text = await response.text();
// // // // // //             console.log("Raw Response:", text);

// // // // // //             const data = JSON.parse(text);
// // // // // //             console.log("Parsed Data:", data);
            
// // // // // //             displayReviews(data);
// // // // // //             drawFinalAnalysis(data);
// // // // // //         } catch (error) {
// // // // // //             console.error("Fetch Error:", error);
// // // // // //             alert(`An error occurred: ${error.message}`);
// // // // // //         } finally {
// // // // // //             // Hide loading indicator once the process is done
// // // // // //             loadingIndicator.style.display = "none";
// // // // // //         }
// // // // // //     });

// // // // // //     function isValidURL(url) {
// // // // // //         try {
// // // // // //             new URL(url);
// // // // // //             return true;
// // // // // //         } catch {
// // // // // //             return false;
// // // // // //         }
// // // // // //     }

// // // // // //     function displayReviews(data) {
// // // // // //         if (!data || !data.reviews || !data.reviews.positive_reviews || !data.reviews.neutral_reviews || !data.reviews.negative_reviews) {
// // // // // //             alert("Invalid data received from API");
// // // // // //             return;
// // // // // //         }

// // // // // //         // Draw reviews in canvas
// // // // // //         drawTextOnCanvas("positive-canvas", data.reviews.positive_reviews);
// // // // // //         drawTextOnCanvas("neutral-canvas", data.reviews.neutral_reviews);
// // // // // //         drawTextOnCanvas("negative-canvas", data.reviews.negative_reviews);

// // // // // //         // Display final score and recommendation
// // // // // //         // document.querySelector(".score").textContent = data.final_score ? `${data.final_score}/10` : "N/A";
// // // // // //         // document.querySelector(".recommendation").textContent = data.recommendation || "No recommendation available.";
// // // // // //     }

// // // // // //     function drawTextOnCanvas(canvasId, textArray) {
// // // // // //         const canvas = document.getElementById(canvasId);
// // // // // //         const ctx = canvas.getContext("2d");
// // // // // //         canvas.width = 500;
// // // // // //         canvas.height = 300;
// // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // //         ctx.font = "14px Arial";
// // // // // //         ctx.fillStyle = "black";
// // // // // //         let y = 20;

// // // // // //         textArray.forEach((text, index) => {
// // // // // //             if (y > canvas.height - 10) return;
// // // // // //             ctx.fillText(`${index + 1}. ${text}`, 10, y);
// // // // // //             y += 20;
// // // // // //         });
// // // // // //     }

// // // // // //     function drawFinalAnalysis(data) {
// // // // // //         const canvas = document.getElementById("final-analysis-summary");
// // // // // //         const ctx = canvas.getContext("2d");
    
// // // // // //         canvas.width = 500;
// // // // // //         canvas.height = 300;
// // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    
// // // // // //         if (!data.percentages) {
// // // // // //             ctx.font = "20px Arial";
// // // // // //             ctx.fillStyle = "red";
// // // // // //             ctx.fillText("No analysis data available", 150, 150);
// // // // // //             return;
// // // // // //         }
    
// // // // // //         const sentimentData = {
// // // // // //             positive: data.percentages.positive_percentage || 0,
// // // // // //             neutral: data.percentages.neutral_percentage || 0,
// // // // // //             negative: data.percentages.negative_percentage || 0,
// // // // // //         };
    
// // // // // //         const total = sentimentData.positive + sentimentData.neutral + sentimentData.negative;
// // // // // //         if (total === 0) {
// // // // // //             ctx.font = "20px Arial";
// // // // // //             ctx.fillStyle = "red";
// // // // // //             ctx.fillText("No sentiment data available", 150, 150);
// // // // // //             return;
// // // // // //         }
    
// // // // // //         // Apply scaling factor to make the bars larger
// // // // // //         const scaleFactor = 1.5; // Increase this for larger bars
// // // // // //         const positiveHeight = (sentimentData.positive / total) * canvas.height * scaleFactor;
// // // // // //         const neutralHeight = (sentimentData.neutral / total) * canvas.height * scaleFactor;
// // // // // //         const negativeHeight = (sentimentData.negative / total) * canvas.height * scaleFactor;
    
// // // // // //         // Ensure the total height does not exceed canvas
// // // // // //         const maxHeight = canvas.height * 0.9;
// // // // // //         const totalHeight = positiveHeight + neutralHeight + negativeHeight;
// // // // // //         const adjustFactor = totalHeight > maxHeight ? maxHeight / totalHeight : 1;
    
// // // // // //         const finalPositiveHeight = positiveHeight * adjustFactor;
// // // // // //         const finalNeutralHeight = neutralHeight * adjustFactor;
// // // // // //         const finalNegativeHeight = negativeHeight * adjustFactor;
    
// // // // // //         let currentY = canvas.height; // Start from the bottom
    
// // // // // //         // Draw positive sentiment
// // // // // //         ctx.fillStyle = "green";
// // // // // //         ctx.fillRect(0, currentY - finalPositiveHeight, canvas.width, finalPositiveHeight);
// // // // // //         currentY -= finalPositiveHeight;
    
// // // // // //         // Draw neutral sentiment
// // // // // //         ctx.fillStyle = "gray";
// // // // // //         ctx.fillRect(0, currentY - finalNeutralHeight, canvas.width, finalNeutralHeight);
// // // // // //         currentY -= finalNeutralHeight;
    
// // // // // //         // Draw negative sentiment
// // // // // //         ctx.fillStyle = "red";
// // // // // //         ctx.fillRect(0, currentY - finalNegativeHeight, canvas.width, finalNegativeHeight);
    
// // // // // //         // Add labels
// // // // // //         ctx.fillStyle = "black";
// // // // // //         ctx.font = "18px Arial"; // Slightly larger font
// // // // // //         ctx.fillText(`Positive: ${sentimentData.positive.toFixed(1)}%`, 20, canvas.height - finalPositiveHeight / 2);
// // // // // //         ctx.fillText(`Neutral: ${sentimentData.neutral.toFixed(1)}%`, 20, canvas.height - finalPositiveHeight - finalNeutralHeight / 2);
// // // // // //         ctx.fillText(`Negative: ${sentimentData.negative.toFixed(1)}%`, 20, canvas.height - finalPositiveHeight - finalNeutralHeight - finalNegativeHeight / 2);
// // // // // //     }
    
// // // // // // });
// // // // // // document.addEventListener("DOMContentLoaded", () => {
// // // // // //     const analyzeButton = document.querySelector(".analyze-btn");
// // // // // //     const loadingIndicator = document.getElementById("loading-indicator");
// // // // // //     const loadingPercent = document.getElementById("loading-percent");

// // // // // //     analyzeButton.addEventListener("click", async () => {
// // // // // //         const productUrl = document.getElementById("input-url").value.trim();
// // // // // //         const productType = document.getElementById("input-type").value;

// // // // // //         if (!productUrl || !productType) {
// // // // // //             alert("Please enter a product URL and select a product type.");
// // // // // //             return;
// // // // // //         }

// // // // // //         if (!isValidURL(productUrl)) {
// // // // // //             alert("Please enter a valid URL.");
// // // // // //             return;
// // // // // //         }

// // // // // //         const apiUrl = "http://localhost:5000/Fetch_Product_reviews";
// // // // // //         const requestUrl = `${apiUrl}?url=${encodeURIComponent(productUrl)}&type=${productType}`;

// // // // // //         // Show loading indicator and start percentage
// // // // // //         loadingIndicator.style.display = "flex";
        
        
// // // // // //         let percent = 0;
// // // // // //         const interval = setInterval(() => {
// // // // // //             if (percent < 90) {
// // // // // //                 percent += Math.random() * 5 + 2; // Increase by 2% to 7% randomly
// // // // // //                 loadingPercent.textContent = `${Math.min(Math.round(percent), 90)}%`;
// // // // // //             }
// // // // // //         }, 500);

// // // // // //         try {
// // // // // //             console.log("Fetching data from:", requestUrl);
// // // // // //             const response = await fetch(requestUrl);
// // // // // //             console.log("Response Status:", response.status);

// // // // // //             const text = await response.text();
// // // // // //             console.log("Raw Response:", text);

// // // // // //             const data = JSON.parse(text);
// // // // // //             console.log("Parsed Data:", data);

// // // // // //             displayReviews(data);
// // // // // //             drawFinalAnalysis(data);

// // // // // //             // Set to 100% when complete
// // // // // //             loadingPercent.textContent = "100%";
// // // // // //         } catch (error) {
// // // // // //             console.error("Fetch Error:", error);
// // // // // //             alert(`An error occurred: ${error.message}`);
// // // // // //         } finally {
// // // // // //             clearInterval(interval);
// // // // // //             setTimeout(() => {
// // // // // //                 loadingIndicator.style.display = "none";
// // // // // //             }, 500);
// // // // // //         }
// // // // // //     });

// // // // // //     function isValidURL(url) {
// // // // // //         try {
// // // // // //             new URL(url);
// // // // // //             return true;
// // // // // //         } catch {
// // // // // //             return false;
// // // // // //         }
// // // // // //     }

// // // // // //     function displayReviews(data) {
// // // // // //         if (!data || !data.reviews || !data.reviews.positive_reviews || !data.reviews.neutral_reviews || !data.reviews.negative_reviews) {
// // // // // //             alert("Invalid data received from API");
// // // // // //             return;
// // // // // //         }

// // // // // //         drawTextOnCanvas("positive-canvas", data.reviews.positive_reviews);
// // // // // //         drawTextOnCanvas("neutral-canvas", data.reviews.neutral_reviews);
// // // // // //         drawTextOnCanvas("negative-canvas", data.reviews.negative_reviews);
// // // // // //     }

// // // // // //     function drawTextOnCanvas(canvasId, textArray) {
// // // // // //         const canvas = document.getElementById(canvasId);
// // // // // //         const ctx = canvas.getContext("2d");
// // // // // //         canvas.width = 500;
// // // // // //         canvas.height = 300;
// // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // //         ctx.font = "16px Arial";
// // // // // //         ctx.fillStyle = "black";
// // // // // //         let y = 30;

// // // // // //         textArray.forEach((text, index) => {
// // // // // //             if (y > canvas.height - 10) return;
// // // // // //             ctx.fillText(`${index + 1}. ${text}`, 10, y);
// // // // // //             y += 25;
// // // // // //         });
// // // // // //     }

// // // // // //     function drawFinalAnalysis(data) {
// // // // // //         const canvas = document.getElementById("final-analysis-summary");
// // // // // //         const ctx = canvas.getContext("2d");
// // // // // //         canvas.width = 500;
// // // // // //         canvas.height = 300;
// // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);

// // // // // //         if (!data.percentages) {
// // // // // //             ctx.font = "20px Arial";
// // // // // //             ctx.fillStyle = "red";
// // // // // //             ctx.fillText("No analysis data available", 150, 150);
// // // // // //             return;
// // // // // //         }

// // // // // //         const sentimentData = {
// // // // // //             positive: data.percentages.positive_percentage || 0,
// // // // // //             neutral: data.percentages.neutral_percentage || 0,
// // // // // //             negative: data.percentages.negative_percentage || 0,
// // // // // //         };

// // // // // //         const total = sentimentData.positive + sentimentData.neutral + sentimentData.negative;
// // // // // //         if (total === 0) {
// // // // // //             ctx.font = "20px Arial";
// // // // // //             ctx.fillStyle = "red";
// // // // // //             ctx.fillText("No sentiment data available", 150, 150);
// // // // // //             return;
// // // // // //         }

// // // // // //         const scaleFactor = 1.5;
// // // // // //         const positiveHeight = (sentimentData.positive / total) * canvas.height * scaleFactor;
// // // // // //         const neutralHeight = (sentimentData.neutral / total) * canvas.height * scaleFactor;
// // // // // //         const negativeHeight = (sentimentData.negative / total) * canvas.height * scaleFactor;

// // // // // //         const maxHeight = canvas.height * 0.9;
// // // // // //         const totalHeight = positiveHeight + neutralHeight + negativeHeight;
// // // // // //         const adjustFactor = totalHeight > maxHeight ? maxHeight / totalHeight : 1;

// // // // // //         const finalPositiveHeight = positiveHeight * adjustFactor;
// // // // // //         const finalNeutralHeight = neutralHeight * adjustFactor;
// // // // // //         const finalNegativeHeight = negativeHeight * adjustFactor;

// // // // // //         let currentY = canvas.height;

// // // // // //         ctx.fillStyle = "green";
// // // // // //         ctx.fillRect(0, currentY - finalPositiveHeight, canvas.width, finalPositiveHeight);
// // // // // //         currentY -= finalPositiveHeight;

// // // // // //         ctx.fillStyle = "gray";
// // // // // //         ctx.fillRect(0, currentY - finalNeutralHeight, canvas.width, finalNeutralHeight);
// // // // // //         currentY -= finalNeutralHeight;

// // // // // //         ctx.fillStyle = "red";
// // // // // //         ctx.fillRect(0, currentY - finalNegativeHeight, canvas.width, finalNegativeHeight);

// // // // // //         ctx.fillStyle = "black";
// // // // // //         ctx.font = "18px Arial";
// // // // // //         ctx.fillText(`Positive: ${sentimentData.positive.toFixed(1)}%`, 20, canvas.height - finalPositiveHeight / 2);
// // // // // //         ctx.fillText(`Neutral: ${sentimentData.neutral.toFixed(1)}%`, 20, canvas.height - finalPositiveHeight - finalNeutralHeight / 2);
// // // // // //         ctx.fillText(`Negative: ${sentimentData.negative.toFixed(1)}%`, 20, canvas.height - finalPositiveHeight - finalNeutralHeight - finalNegativeHeight / 2);
// // // // // //     }
// // // // // // });
