document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const analyzeButton = document.querySelector(".analyze-btn");
    const loadingOverlay = document.getElementById("loading-overlay");
    const loadingIndicator = document.getElementById("loading-indicator");
    const loadingPercent = document.getElementById("loading-percent");
    const finalAnalysisDiv = document.querySelector(".final-analysis");
    let progressInterval;

    // ======================
    // LOADING INDICATOR FUNCTIONS
    // ======================
    
    function showLoading() {
        // Reset loading state
        loadingOverlay.style.display = 'flex';
        loadingIndicator.style.display = 'block';
        loadingPercent.textContent = '0%';
        loadingPercent.style.color = '#333';
        document.body.style.overflow = 'hidden';
        
        // Animate progress from 0-90% while waiting
        let progress = 0;
        progressInterval = setInterval(() => {
            // Slow down as we approach 90%
            if (progress < 70) {
                progress += Math.random() * 1.5;
            } else if (progress < 90) {
                progress += Math.random() * 3;
            } else {
                progress += 0.5;
            }
            progress = Math.min(progress, 90);
            loadingPercent.textContent = Math.floor(progress) + '%';
        }, 300);
    }

    function completeLoading() {
        // Finish the progress animation
        clearInterval(progressInterval);
        loadingPercent.textContent = '100%';
        
        // Smooth fade out
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            loadingIndicator.style.display = 'none';
            document.body.style.overflow = '';
        }, 800);
    }

    function handleLoadingError(error) {
        // Show error state
        clearInterval(progressInterval);
        loadingPercent.textContent = 'Error';
        loadingPercent.style.color = '#ff4444';
        
        // Hide after delay
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            loadingIndicator.style.display = 'none';
            document.body.style.overflow = '';
        }, 1500);
        
        throw error; // Re-throw for error handling
    }

    // ======================
    // MAIN ANALYSIS FUNCTION
    // ======================
    
    analyzeButton.addEventListener("click", async () => {
        // Get input values
        const productUrl = document.getElementById("input-url").value.trim();
        const productType = document.getElementById("input-type").value;

        // Validate inputs
        if (!productUrl || !productType) {
            alert("Please enter a product URL and select a product type.");
            return;
        }

        if (!isValidURL(productUrl)) {
            alert("Please enter a valid URL.");
            return;
        }

        // Prepare API request
        const apiUrl = "http://localhost:5000/Fetch_Product_reviews";
        const requestUrl = `${apiUrl}?url=${encodeURIComponent(productUrl)}&type=${productType}`;

        try {
            // Show loading indicator
            showLoading();
            
            // Make API request
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Process response
            const data = await response.json();
            displayReviews(data);
            drawFinalAnalysis(data);
            
            // Show results
            finalAnalysisDiv.style.display = "block";
            
            // Complete loading
            completeLoading();
            
        } catch (error) {
            // Handle errors
            handleLoadingError(error);
            console.error("Analysis Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    });

    // ======================
    // HELPER FUNCTIONS
    // ======================
    
    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function displayReviews(data) {
        if (!data?.reviews) {
            throw new Error("Invalid data received from API");
        }

        setScrollableReviews("positive-reviews", data.reviews.positive_reviews || []);
        setScrollableReviews("neutral-reviews", data.reviews.neutral_reviews || []);
        setScrollableReviews("negative-reviews", data.reviews.negative_reviews || []);
    }

    function setScrollableReviews(containerId, textArray) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        textArray.forEach((text, index) => {
            const p = document.createElement("p");
            p.textContent = `${index + 1}. ${text}`;
            container.appendChild(p);
        });
    }

    function drawFinalAnalysis(data) {
        const canvas = document.getElementById("final-analysis-summary");
        const ctx = canvas.getContext("2d");

        // Setup canvas
        canvas.width = 600;
        canvas.height = 400;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Check for valid data
        if (!data?.percentages) {
            drawErrorText(ctx, "No analysis data available");
            return;
        }

        const sentimentData = {
            positive: data.percentages.positive_percentage || 0,
            neutral: data.percentages.neutral_percentage || 0,
            negative: data.percentages.negative_percentage || 0,
        };

        const total = sentimentData.positive + sentimentData.neutral + sentimentData.negative;
        if (total === 0) {
            drawErrorText(ctx, "No sentiment data available");
            return;
        }

        // Draw pie chart
        drawPieChart(ctx, sentimentData, total);
        
        // Draw legend
        drawLegend(ctx, sentimentData);
    }

    function drawErrorText(ctx, message) {
        ctx.font = "24px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(message, 200, 200);
    }

    function drawPieChart(ctx, data, total) {
        const colors = ["#90EE90", "gray", "red"];
        const cx = 350, cy = 200, radius = 135;
        let startAngle = 0;

        for (let i = 0; i < 3; i++) {
            const value = [data.positive, data.neutral, data.negative][i];
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            
            startAngle += sliceAngle;
        }
    }

    function drawLegend(ctx, data) {
        const colors = ["#90EE90", "gray", "red"];
        const labels = ["Positive", "Neutral", "Negative"];
        const values = [data.positive, data.neutral, data.negative];

        ctx.font = "20px Arial";
        let labelY = 100;
        
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(50, labelY - 10, 20, 20);
            
            ctx.fillStyle = "black";
            ctx.fillText(`${labels[i]}: ${values[i].toFixed(1)}%`, 80, labelY);
            
            labelY += 40;
        }
    }
});