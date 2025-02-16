// Functions to add more entries
function addExperience() {
    const template = document.querySelector('.experience-entry').cloneNode(true);
    clearInputs(template);
    document.getElementById('experienceContainer').appendChild(template);
  }
  
  function addEducation() {
    const template = document.querySelector('.education-entry').cloneNode(true);
    clearInputs(template);
    document.getElementById('educationContainer').appendChild(template);
  }
  
  function addCertification() {
    const template = document.querySelector('.certification-entry').cloneNode(true);
    clearInputs(template);
    document.getElementById('certificationsContainer').appendChild(template);
  }
  
  function addProject() {
    const template = document.querySelector('.project-entry').cloneNode(true);
    clearInputs(template);
    document.getElementById('projectsContainer').appendChild(template);
  }
  
  function clearInputs(template) {
    template.querySelectorAll('input, textarea').forEach(input => input.value = '');
  }
  
  function downloadPDF() {
    const element = document.getElementById('generatedResume');
    const opt = {
      margin: 1,
      filename: `${document.getElementById('fullName').value.replace(/\s+/g, '_')}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }
  
  // Form submission handler
  document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Collect all form data
    const formData = {
      personal: {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        linkedin: document.getElementById('linkedin').value,
        portfolio: document.getElementById('portfolio').value,
        summary: document.getElementById('professionalSummary').value
      },
      experience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
        jobTitle: entry.querySelector('.jobTitleExp').value,
        company: entry.querySelector('.company').value,
        location: entry.querySelector('.exp-location').value,
        duration: entry.querySelector('.workDuration').value,
        responsibilities: entry.querySelector('.responsibilities').value
      })),
      education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
        degree: entry.querySelector('.degree').value,
        university: entry.querySelector('.university').value,
        location: entry.querySelector('.edu-location').value,
        duration: entry.querySelector('.graduationYear').value,
        gpa: entry.querySelector('.gpa').value,
        achievements: entry.querySelector('.achievements').value
      })),
      skills: {
        technical: document.getElementById('technicalSkills').value,
        soft: document.getElementById('softSkills').value,
        languages: document.getElementById('languages').value
      },
      certifications: Array.from(document.querySelectorAll('.certification-entry')).map(entry => ({
        name: entry.querySelector('.certificationName').value,
        issuer: entry.querySelector('.issuingOrganization').value,
        date: entry.querySelector('.certificationDate').value,
        credentialId: entry.querySelector('.credentialId').value
      })),
      projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
        name: entry.querySelector('.projectTitle').value,
        duration: entry.querySelector('.projectDuration').value,
        description: entry.querySelector('.projectDescription').value
      })),
      additional: document.getElementById('additional').value,
      volunteer: document.getElementById('volunteer').value
    };
  
    // Generate resume HTML
    const resumeHTML = `
      <div class="resume-container" id="generatedResume">
        <div class="resume-header">
          <h1>${formData.personal.fullName}</h1>
          <p>${formData.personal.jobTitle}</p>
          <div class="contact-info">
            <span>${formData.personal.email}</span>
            <span>${formData.personal.phone}</span>
            <span>${formData.personal.address}</span>
            ${formData.personal.linkedin ? `<a href="${formData.personal.linkedin}" target="_blank">LinkedIn</a>` : ''}
            ${formData.personal.portfolio ? `<a href="${formData.personal.portfolio}" target="_blank">Portfolio</a>` : ''}
          </div>
        </div>
  
        <div class="resume-section">
          <h2>Professional Summary</h2>
          <p>${formData.personal.summary}</p>
        </div>
  
        <div class="resume-section">
          <h2>Work Experience</h2>
          ${formData.experience.map(exp => `
            <div class="experience-item">
              <h3>${exp.jobTitle} at ${exp.company}</h3>
              <div class="date-location">${exp.duration} | ${exp.location}</div>
              <p>${exp.responsibilities.replace(/\n/g, '<br>')}</p>
            </div>
          `).join('')}
        </div>
  
        <div class="resume-section">
          <h2>Education</h2>
          ${formData.education.map(edu => `
            <div class="education-item">
              <h3>${edu.degree}</h3>
              <div class="date-location">${edu.university} | ${edu.duration}</div>
              <p>${edu.location}</p>
              ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
              ${edu.achievements ? `<p>${edu.achievements.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
          `).join('')}
        </div>
  
        <div class="resume-section">
          <h2>Skills</h2>
          <div class="skills-list">
            ${formData.skills.technical.split(',').map(skill => `<span class="skill-item">${skill.trim()}</span>`).join('')}
          </div>
          ${formData.skills.soft ? `<h3>Soft Skills</h3><p>${formData.skills.soft}</p>` : ''}
          ${formData.skills.languages ? `<h3>Languages</h3><p>${formData.skills.languages}</p>` : ''}
        </div>
  
        ${formData.certifications.some(cert => cert.name) ? `
          <div class="resume-section">
            <h2>Certifications</h2>
            ${formData.certifications.map(cert => cert.name ? `
              <div class="certification-item">
                <h3>${cert.name}</h3>
                <p>${cert.issuer} | ${cert.date}</p>
                ${cert.credentialId ? `<p>Credential ID: ${cert.credentialId}</p>` : ''}
              </div>
            ` : '').join('')}
          </div>
        ` : ''}
  
        ${formData.projects.some(proj => proj.name) ? `
          <div class="resume-section">
            <h2>Projects</h2>
            ${formData.projects.map(proj => proj.name ? `
              <div class="project-item">
                <h3>${proj.name}</h3>
                <div class="date-location">${proj.duration}</div>
                <p>${proj.description.replace(/\n/g, '<br>')}</p>
              </div>
            ` : '').join('')}
          </div>
        ` : ''}
  
        ${formData.additional ? `
          <div class="resume-section">
            <h2>Additional Information</h2>
            <p>${formData.additional.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}
  
        ${formData.volunteer ? `
          <div class="resume-section">
            <h2>Volunteer/Leadership Experience</h2>
            <p>${formData.volunteer.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}
      </div>
      <div class="download-section">
        <button onclick="downloadPDF()" class="download-btn">Download PDF</button>
      </div>
    `;
  
    // Update resume preview section
    let previewSection = document.getElementById('resumePreview');
    previewSection.innerHTML = resumeHTML;
  
    // Scroll to the preview
    previewSection.scrollIntoView({ behavior: 'smooth' });
  });
  