

// Utility function to calculate the date based on the age in days
function calculateDate(dob, ageInDays) {
    const dobDate = new Date(dob);
    const recommendedDate = new Date(dobDate);
    recommendedDate.setDate(dobDate.getDate() + ageInDays);
    return recommendedDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  }
  
  // Utility function to convert a `recommendedAge` string to days
function ageToDays(recommendedAge) {
    if (recommendedAge === 'Birth') return 0;
  
    const [start, end] = recommendedAge.split('-').map(Number);
    return end ? Math.floor((start + end) / 2) : start;
  }
  
  // Function to get vaccination dates based on DOB
export function getVaccinationDates(dob, predefinedVaccinations) {
    return predefinedVaccinations.map(vaccine => {
        const days = ageToDays(vaccine.recommendedAge);
        return {
            ...vaccine,
            recommendedDate: calculateDate(dob, days)
        };
    });
  }