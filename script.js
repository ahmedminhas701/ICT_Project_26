// Keys used to save and read user selections in browser localStorage
const STORAGE_SKILLS_KEY = "skillpath_selected_skills";
const STORAGE_INTERESTS_KEY = "skillpath_selected_interests";

// Creates checkbox items inside a container element
function renderCheckboxes(items, containerId, inputName, savedItems) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const itemText = items[i];

    // Create <label class="checkbox-item">
    const label = document.createElement("label");
    label.className = "checkbox-item";

    // Create <input type="checkbox">
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = inputName;
    checkbox.value = itemText;

    // If the user previously selected this item, keep it checked
    if (savedItems.includes(itemText)) {
      checkbox.checked = true;
    }

    // Create text span next to checkbox
    const span = document.createElement("span");
    span.textContent = itemText;

    label.appendChild(checkbox);
    label.appendChild(span);
    container.appendChild(label);
  }
}

// Returns an array of all checked values for a checkbox group
function getCheckedValues(inputName) {
  const checkboxes = document.querySelectorAll(
    'input[name="' + inputName + '"]:checked'
  );
  const selected = [];

  for (let i = 0; i < checkboxes.length; i++) {
    selected.push(checkboxes[i].value);
  }

  return selected;
}

// Reads a saved array from localStorage
function loadSavedArray(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

// Page 2: Assessment page logic
function setupAssessmentPage() {
  const form = document.getElementById("assessmentForm");
  if (!form) return; // Stop if we are not on assessment.html

  const savedSkills = loadSavedArray(STORAGE_SKILLS_KEY);
  const savedInterests = loadSavedArray(STORAGE_INTERESTS_KEY);

  // Display skill and interest checkboxes from data.js
  renderCheckboxes(skillsList, "skillsContainer", "skills", savedSkills);
  renderCheckboxes(
    interestsList,
    "interestsContainer",
    "interests",
    savedInterests
  );

  const errorBox = document.getElementById("errorBox");
  const clearBtn = document.getElementById("clearBtn");

  // Handle "Find My Career Path" submit button
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    const selectedSkills = getCheckedValues("skills");
    const selectedInterests = getCheckedValues("interests");

    // Simple validation: require at least 1 skill or interest
    if (selectedSkills.length === 0 && selectedInterests.length === 0) {
      errorBox.style.display = "block";
      errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    errorBox.style.display = "none";

    // Save selections in localStorage so results.html can read them
    localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(selectedSkills));
    localStorage.setItem(
      STORAGE_INTERESTS_KEY,
      JSON.stringify(selectedInterests)
    );

    // Go to Page 3 (Career Recommendations)
    window.location.href = "results.html";
  });

  // Handle "Clear All" button
  clearBtn.addEventListener("click", function () {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < allCheckboxes.length; i++) {
      allCheckboxes[i].checked = false;
    }
    localStorage.removeItem(STORAGE_SKILLS_KEY);
    localStorage.removeItem(STORAGE_INTERESTS_KEY);
    errorBox.style.display = "none";
  });
}

// Page 3: Calculates career match scores (+2 skill, +1 interest) and sorts results
function calculateCareerMatches(selectedSkills, selectedInterests) {
  const results = [];

  for (let i = 0; i < careersData.length; i++) {
    const career = careersData[i];

    // Find which of the career's required skills the user has
    const matchedSkills = career.requiredSkills.filter(function (skill) {
      return selectedSkills.includes(skill);
    });

    // Find which of the career's related interests the user has
    const matchedInterests = career.relatedInterests.filter(function (
      interest
    ) {
      return selectedInterests.includes(interest);
    });

    // Find required skills the user does not have yet
    const missingRequiredSkills = career.requiredSkills.filter(function (
      skill
    ) {
      return !selectedSkills.includes(skill);
    });

    // Calculate score and percentage
    const score = matchedSkills.length * 2 + matchedInterests.length;
    const maxScore =
      career.requiredSkills.length * 2 + career.relatedInterests.length;
    const matchPercent = Math.round((score / maxScore) * 100);

    // Combine missing foundational skills + next skills to suggest what to learn next
    const suggestedToLearn = missingRequiredSkills.concat(career.nextSkills);

    results.push({
      career: career,
      matchedSkills: matchedSkills,
      matchedInterests: matchedInterests,
      suggestedToLearn: suggestedToLearn,
      score: score,
      matchPercent: matchPercent
    });
  }

  // Sort careers from highest match percentage to lowest
  results.sort(function (a, b) {
    return b.matchPercent - a.matchPercent;
  });

  return results;
}

// Builds a row of tag pills
function createTagGroup(labelText, items, tagClass) {
  const row = document.createElement("div");
  row.className = "career-detail-row";

  const label = document.createElement("span");
  label.className = "career-detail-label";
  label.textContent = labelText;
  row.appendChild(label);

  const tagsWrapper = document.createElement("div");
  tagsWrapper.className = "summary-tags";

  for (let i = 0; i < items.length; i++) {
    const tag = document.createElement("span");
    tag.className = "tag " + tagClass;
    tag.textContent = items[i];
    tagsWrapper.appendChild(tag);
  }

  row.appendChild(tagsWrapper);
  return row;
}

// Builds a single career recommendation card
function createCareerCard(item, hasUserInput) {
  const career = item.career;

  const card = document.createElement("div");
  card.className = "career-card";

  // Top row: Category, Title, and Match Percentage badge
  const topRow = document.createElement("div");
  topRow.className = "career-card-top";

  const titleGroup = document.createElement("div");
  const category = document.createElement("div");
  category.className = "career-category";
  category.textContent = career.category;

  const title = document.createElement("h2");
  title.className = "career-title";
  title.textContent = career.title;

  titleGroup.appendChild(category);
  titleGroup.appendChild(title);
  topRow.appendChild(titleGroup);

  if (hasUserInput) {
    const badge = document.createElement("span");
    badge.className = "match-badge";
    badge.textContent = item.matchPercent + "% Match";
    topRow.appendChild(badge);
  }

  card.appendChild(topRow);

  // Short explanation of the career
  const desc = document.createElement("p");
  desc.className = "career-desc";
  desc.textContent = career.description;
  card.appendChild(desc);

  // Why it matches (only if the user selected skills/interests)
  if (hasUserInput) {
    if (item.matchedSkills.length > 0) {
      card.appendChild(
        createTagGroup(
          "Your Matching Skills:",
          item.matchedSkills,
          "tag-skill"
        )
      );
    }
    if (item.matchedInterests.length > 0) {
      card.appendChild(
        createTagGroup(
          "Your Matching Interests:",
          item.matchedInterests,
          "tag-interest"
        )
      );
    }
  } else {
    card.appendChild(
      createTagGroup(
        "Core Skills for This Field:",
        career.requiredSkills,
        "tag-skill"
      )
    );
  }

  // Suggested skills to learn next
  card.appendChild(
    createTagGroup(
      "Suggested Skills to Learn Next:",
      item.suggestedToLearn,
      "tag-next"
    )
  );

  return card;
}

function setupResultsPage() {
  const resultsContainer = document.getElementById("resultsContainer");
  if (!resultsContainer) return; // Stop if we are not on results.html

  const summaryBanner = document.getElementById("summaryBanner");
  const selectedSkills = loadSavedArray(STORAGE_SKILLS_KEY);
  const selectedInterests = loadSavedArray(STORAGE_INTERESTS_KEY);
  const hasUserInput =
    selectedSkills.length > 0 || selectedInterests.length > 0;

  // Show summary of what the user selected
  if (hasUserInput) {
    summaryBanner.innerHTML = "";
    const heading = document.createElement("h3");
    heading.textContent = "Based on your assessment selections:";
    summaryBanner.appendChild(heading);

    if (selectedSkills.length > 0) {
      summaryBanner.appendChild(
        createTagGroup("Selected Skills:", selectedSkills, "tag-skill")
      );
    }
    if (selectedInterests.length > 0) {
      summaryBanner.appendChild(
        createTagGroup("Selected Interests:", selectedInterests, "tag-interest")
      );
    }
  } else {
    summaryBanner.innerHTML =
      "<h3>No Assessment Completed Yet</h3>" +
      "<p>Showing all available career fields below. Take the assessment to get personalized match scores!</p>";
  }

  // Calculate matches
  const allMatches = calculateCareerMatches(selectedSkills, selectedInterests);

  // If user took the assessment, show careers with score > 0; otherwise show all
  const careersToShow = hasUserInput
    ? allMatches.filter(function (item) {
        return item.score > 0;
      })
    : allMatches;

  resultsContainer.innerHTML = "";

  for (let i = 0; i < careersToShow.length; i++) {
    const card = createCareerCard(careersToShow[i], hasUserInput);
    resultsContainer.appendChild(card);
  }
}

// Run the appropriate setup function once the page finishes loading
document.addEventListener("DOMContentLoaded", function () {
  setupAssessmentPage();
  setupResultsPage();
});
