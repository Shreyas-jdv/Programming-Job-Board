const featuredJobsData = [ ];


  fetch('jobs-data.json')
  .then(response => response.json())
  .then(data => {
    featuredJobsData.push(...data);
    filterJobs('', ''); 
    // call filterJobs after data has been loaded
  })
  .catch(error => console.error(error));
  

  const featuredJobsList = document.querySelector('#featured-jobs-list');
  const jobFilterForm = document.querySelector('#job-filter-form');
  
  function generateJobHTML(job) {
    return `
      <div class="job-card">
        <h2 class="job-title">${job.title}</h2>
        <p class="job-location">${job.location}</p>
        <p class="job-description">${job.description}</p>
        <a class="apply-button" href="${job.applyUrl}" target="_blank">Apply</a>
      </div>
    `;
  }
  
  function filterJobs(keywords, location) {
    featuredJobsList.innerHTML = '';
  
    featuredJobsData.forEach(job => {
      const jobKeywords = job.keywords.map(keyword => keyword.toLowerCase());
      const jobLocation = job.location.toLowerCase();
  
      if (keywords === '' || jobKeywords.some(keyword => keyword.includes(keywords.toLowerCase()))) {
        if (location === '' || jobLocation.includes(location.toLowerCase())) {
          const jobHTML = generateJobHTML(job);
          featuredJobsList.insertAdjacentHTML('beforeend', jobHTML);
        }
      }
    });
  }
  
  jobFilterForm.addEventListener('submit', event => {
    event.preventDefault();
    const keywords = document.querySelector('#job-keywords').value.trim();
    const location = document.querySelector('#job-location').value.trim();
    filterJobs(keywords, location);
  });
  
  filterJobs('', '');
  
  
