/* =========================================================
   Interactive Portfolio Logic
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle (Dark / Light Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    });

    // --- 2. Mobile Navigation Hamburger Menu ---
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- 3. Skills Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillCategories.forEach(cat => {
                if (filter === 'all' || cat.getAttribute('data-cat') === filter) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });

    // --- 4. Interactive REST API Simulator (CricVerse) ---
    const apiSelect = document.getElementById('apiEndpointSelect');
    const runApiBtn = document.getElementById('runApiBtn');
    const apiStatus = document.getElementById('apiStatus');
    const apiOutput = document.getElementById('apiOutput');

    const apiResponses = {
        auth: {
            status: "200 OK",
            body: {
                message: "Authentication successful",
                token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YXJhcHJhc2FkIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDAwMDAwMDB9...",
                expiresIn: 3600,
                user: { id: 101, username: "varaprasad", role: "ADMIN" }
            }
        },
        createMatch: {
            status: "201 Created",
            body: {
                matchId: "MATCH_2026_089",
                teamA: "India ACA U-14",
                teamB: "Tamil Nadu XI",
                format: "T20",
                venue: "SASTRA Cricket Stadium",
                status: "LIVE_INNINGS_1"
            }
        },
        updateScore: {
            status: "200 OK",
            body: {
                matchId: "MATCH_2026_089",
                currentScore: "142/3 (15.4 Overs)",
                striker: "Vara Prasad (64* off 38 balls)",
                nonStriker: "Rahul (32 off 24 balls)",
                runRate: 9.06
            }
        },
        getLeaderboard: {
            status: "200 OK",
            body: [
                { rank: 1, name: "Vara Prasad", runs: 420, average: 52.5, strikeRate: 148.2 },
                { rank: 2, name: "Karthik", runs: 385, average: 42.7, strikeRate: 132.0 }
            ]
        }
    };

    if (runApiBtn) {
        runApiBtn.addEventListener('click', () => {
            const selected = apiSelect.value;
            const res = apiResponses[selected] || apiResponses.auth;
            
            apiStatus.textContent = res.status;
            apiOutput.textContent = JSON.stringify(res.body, null, 2);
        });
    }

    // --- 5. Interactive Stroke Risk Simulator ---
    const simAge = document.getElementById('simAge');
    const simGlucose = document.getElementById('simGlucose');
    const simHypertension = document.getElementById('simHypertension');
    const simHeart = document.getElementById('simHeart');

    const valAge = document.getElementById('valAge');
    const valGlucose = document.getElementById('valGlucose');
    const riskBar = document.getElementById('riskBar');
    const riskPercentage = document.getElementById('riskPercentage');
    const shapExplanation = document.getElementById('shapExplanation');

    function calculateRisk() {
        if (!simAge || !simGlucose) return;

        const age = parseInt(simAge.value);
        const glucose = parseInt(simGlucose.value);
        const hyper = simHypertension.checked ? 15 : 0;
        const heart = simHeart.checked ? 18 : 0;

        valAge.textContent = age;
        valGlucose.textContent = glucose;

        // Formula for demo calculation
        let baseRisk = (age * 0.4) + ((glucose - 70) * 0.25) + hyper + heart;
        let risk = Math.min(Math.max(Math.round(baseRisk), 5), 95);

        riskBar.style.width = `${risk}%`;

        let category = "Low";
        if (risk > 30 && risk <= 60) category = "Moderate";
        if (risk > 60) category = "High Risk";

        riskPercentage.textContent = `${risk}% (${category})`;

        // SHAP explanations generator
        let factors = [];
        if (glucose > 130) factors.push(`High Glucose (+${Math.round((glucose-130)*0.2)}%)`);
        if (age > 45) factors.push(`Age (${age}) (+${Math.round((age-45)*0.3)}%)`);
        if (hyper) factors.push(`Hypertension (+15%)`);
        if (heart) factors.push(`Heart Condition (+18%)`);

        if (factors.length === 0) factors.push(`Normal Vital Biomarkers (Low Risk)`);

        shapExplanation.innerHTML = `<small><i class="fa-solid fa-lightbulb"></i> <strong>SHAP Feature Impact:</strong> ${factors.join(', ')}</small>`;
    }

    if (simAge && simGlucose) {
        simAge.addEventListener('input', calculateRisk);
        simGlucose.addEventListener('input', calculateRisk);
        simHypertension.addEventListener('change', calculateRisk);
        simHeart.addEventListener('change', calculateRisk);
        calculateRisk(); // initial trigger
    }

    // --- 6. Copy to Clipboard Toast Notification ---
    window.showToast = function(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    document.querySelectorAll('.copy-trigger').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = item.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied "${textToCopy}" to clipboard!`);
            });
        });
    });

});
