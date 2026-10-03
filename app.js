/* ==========================================================================
   DR. NAVEEN’S NEURO-SPINE CENTRE - APPLICATION JAVASCRIPT
   Interactivity, Modals, Dynamic Guidance, Form Validation & State
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndMobileNav();
  initTreatmentFilters();
  initSymptomChecker();
  initAppointmentForm();
  initModals();
  initMinDatePicker();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Effect & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeaderAndMobileNav() {
  const header = document.querySelector('.main-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   2. Treatment Category Filtering
   -------------------------------------------------------------------------- */
function initTreatmentFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const treatmentCards = document.querySelectorAll('.treatment-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      treatmentCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else if (card.classList.contains(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Symptom Self-Check & Guidance Tool
   -------------------------------------------------------------------------- */
const symptomGuidanceData = {
  headache: {
    title: "Persistent or Severe Unexplained Headaches",
    guidance: "Headaches that are unusually severe, progressive, waking you up from sleep, or accompanied by nausea/vomiting or visual changes warrant a comprehensive neurological evaluation. While many headaches are benign, persistent new patterns should be investigated.",
    recommendation: "Recommended Action: Schedule a neurosurgical evaluation with clinical examination and imaging review (MRI/CT)."
  },
  seizures: {
    title: "New-Onset Seizures or Convulsions",
    guidance: "First-time seizures or unprovoked seizure episodes require prompt medical assessment to identify potential underlying brain structural causes, such as lesions, vascular abnormalities, or tissue irritation.",
    recommendation: "Recommended Action: Prompt neurosurgical and neurological assessment."
  },
  sciatica: {
    title: "Sciatica & Radiating Leg Pain",
    guidance: "Sharp, shooting pain down the buttock, thigh, and leg—often accompanied by numbness or tingling—is commonly caused by lumbar nerve root compression from a herniated disc or spinal stenosis.",
    recommendation: "Recommended Action: Minimal access spine evaluation to assess nerve decompression options."
  },
  neckpain: {
    title: "Neck Pain & Arm Numbness / Weakness",
    guidance: "Cervical spine disc protrusion or spondylosis can compress spinal nerves or the spinal cord, leading to neck stiffness, shoulder radiation, or weakness in arm/hand grip.",
    recommendation: "Recommended Action: Comprehensive cervical spine clinical review."
  },
  balance: {
    title: "Balance Loss, Dizziness or Gait Difficulty",
    guidance: "Difficulty walking, clumsiness, or unexplained imbalance can arise from brain coordination centers (cerebellum) or spinal cord compression (myelopathy).",
    recommendation: "Recommended Action: Specialist neurological assessment to pinpoint structural vs vestibular causes."
  },
  weakness: {
    title: "Focal Weakness in Face, Arm, or Leg",
    guidance: "Sudden onset of weakness requires emergency medical evaluation immediately. Persistent or progressive focal weakness over days or weeks warrants expert neurosurgical diagnostic imaging.",
    recommendation: "Recommended Action: Diagnostic evaluation for brain or spinal cord pathway lesions."
  }
};

function initSymptomChecker() {
  const optionBtns = document.querySelectorAll('.symptom-option-btn');
  const resultBox = document.getElementById('symptomResultBox');

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optionBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const key = btn.getAttribute('data-symptom');
      const data = symptomGuidanceData[key];

      if (data && resultBox) {
        resultBox.innerHTML = `
          <h4>${data.title}</h4>
          <p>${data.guidance}</p>
          <div style="background: rgba(9,84,101,0.08); padding: 0.85rem 1rem; border-radius: 6px; font-weight: 600; color: #095465;">
            ${data.recommendation}
          </div>
          <div style="margin-top: 1.25rem;">
            <button onclick="openAppointmentModalWithReason('${data.title}')" class="btn btn-gold btn-sm">Book Consultation for This Symptom</button>
          </div>
        `;
        resultBox.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Treatment Details & Article Modals
   -------------------------------------------------------------------------- */
const treatmentDetails = {
  'brain-tumours': {
    title: 'Brain Tumours Evaluation & Care',
    category: 'Brain Care',
    content: `
      <p>A brain tumour is an abnormal growth of cells within or around the structural tissue of the brain. They can be classified as benign (non-cancerous) or malignant (cancerous), and primary (originating in the brain) or secondary (metastatic).</p>
      <h4>Key Symptoms & Presentation:</h4>
      <ul>
        <li>Persistent, progressive headaches often worse in the early morning</li>
        <li>New-onset seizures or focal tremors</li>
        <li>Unexplained nausea and projectile vomiting</li>
        <li>Focal neurological deficits (weakness on one side, speech difficulty, visual field loss)</li>
      </ul>
      <h4>Neurosurgical Management:</h4>
      <p>At Dr. Naveen’s Neuro-Spine Centre, treatment planning is personalized after meticulous imaging evaluation (high-resolution MRI, Contrast CT). Options include minimal access microsurgical resection, stereotactic guidance, endoscopic skull base procedures, or conservative monitoring depending on tumour type, size, and location.</p>
    `
  },
  'head-injury': {
    title: 'Head Injury & Neuro-Trauma Care',
    category: 'Brain Care',
    content: `
      <p>Head injuries range from mild concussions to severe traumatic brain injuries (TBI) involving skull fractures, intracranial hematomas, or diffuse axonal injury.</p>
      <h4>Neurosurgical Evaluation:</h4>
      <p>Immediate clinical examination (Glasgow Coma Scale) and urgent CT imaging determine whether surgical intervention (evacuation of hematoma, decompressive craniectomy) or intensive conservative neuro-monitoring is required.</p>
    `
  },
  'hydrocephalus': {
    title: 'Hydrocephalus Diagnosis & Treatment',
    category: 'Brain Care',
    content: `
      <p>Hydrocephalus is an accumulation of excess cerebrospinal fluid (CSF) within the brain ventricles, leading to increased intracranial pressure.</p>
      <h4>Treatment Approaches:</h4>
      <ul>
        <li>Ventriculoperitoneal (VP) Shunt Placement</li>
        <li>Endoscopic Third Ventriculostomy (ETV) - A minimal access endoscopic technique to restore natural CSF flow without permanent implants where clinically indicated.</li>
      </ul>
    `
  },
  'brain-haemorrhage': {
    title: 'Brain Haemorrhage (Intracranial Bleeding)',
    category: 'Brain Care',
    content: `
      <p>Intracranial haemorrhage includes hypertensive intracerebral bleeds, subarachnoid haemorrhage (often aneurysm-related), epidural, and subdural hematomas.</p>
      <h4>Specialist Assessment:</h4>
      <p>Rapid assessment, blood pressure control, and decision on microsurgical evacuation or minimal access keyhole clot evacuation when clinically necessary to relieve brain tissue compression.</p>
    `
  },
  'epilepsy-eval': {
    title: 'Epilepsy & Seizure Neurosurgical Evaluation',
    category: 'Brain Care',
    content: `
      <p>For patients with medically refractory epilepsy (seizures not controlled by medications), neurosurgical evaluation aims to identify underlying structural lesions such as focal cortical dysplasia, cavernomas, or hippocampal sclerosis.</p>
    `
  },
  'slipped-disc': {
    title: 'Disc Problems (Herniated & Degenerative Disc)',
    category: 'Spine Care',
    content: `
      <p>Intervertebral discs act as shock absorbers between spinal vertebrae. When a disc herniates (slips) or degenerates, it can impinge on spinal nerves, causing severe localized back pain or sharp radiating leg pain (sciatica).</p>
      <h4>Minimal Access Interventions:</h4>
      <p>When conservative physiotherapy and medical management fail, Microdiscectomy or Endoscopic Spine Surgery allows precise removal of the herniated fragment through tiny incisions, preserving spinal muscle structure.</p>
    `
  },
  'sciatica': {
    title: 'Sciatica Evaluation & Targeted Care',
    category: 'Spine Care',
    content: `
      <p>Sciatica refers to symptom pain that radiates along the path of the sciatic nerve—from the lower back, through hips and buttocks, and down each leg.</p>
      <h4>Diagnostic & Care Path:</h4>
      <p>Clinical nerve stretch tests, Lumbar MRI, targeted epidural injections, and minimal access decompression if conservative therapy does not yield relief.</p>
    `
  },
  'neck-pain': {
    title: 'Neck Pain & Cervical Spondylosis',
    category: 'Spine Care',
    content: `
      <p>Cervical spine wear and tear can result in radiculopathy (arm pain/numbness) or cervical myelopathy (spinal cord compression causing hand clumsiness and gait stiffness).</p>
    `
  },
  'back-pain': {
    title: 'Comprehensive Back Pain Assessment',
    category: 'Spine Care',
    content: `
      <p>Lower back pain is one of the most common medical complaints. Accurate diagnosis distinguishes mechanical posture strain from disc herniation, facet joint arthropathy, or spinal stenosis.</p>
    `
  },
  'spinal-stenosis': {
    title: 'Spinal Stenosis (Narrowing of Spinal Canal)',
    category: 'Spine Care',
    content: `
      <p>Spinal stenosis occurs when the spaces within the spine narrow, putting pressure on the nerve roots or spinal cord. Symptoms typically include leg heaviness or cramping while walking (neurogenic claudication).</p>
    `
  },
  'spine-tumours': {
    title: 'Spine Tumours & Lesions',
    category: 'Spine Care',
    content: `
      <p>Spinal tumours can be extradural, intradural-extramedullary, or intramedullary. Specialized microsurgical excision under intraoperative neural monitoring helps preserve motor and sensory function.</p>
    `
  },
  'spinal-injuries': {
    title: 'Spinal Injuries & Trauma',
    category: 'Spine Care',
    content: `
      <p>Fractures, dislocations, or traumatic spinal cord compression require urgent stabilization, precise imaging, and minimal access spinal instrumentation when indicated.</p>
    `
  }
};

const articleDetails = {
  'art-1': {
    title: 'Brain Tumour: Symptoms You Should Know',
    category: 'Brain Health Awareness',
    content: `
      <p>Recognizing the early warning signs of a brain tumour is vital for timely diagnosis and management. While headaches are common, headaches associated with a brain tumour often have distinct characteristics.</p>
      <h4>Warning Signs to Watch For:</h4>
      <ul>
        <li>Headaches that are persistent, worsening over weeks, or accompanied by morning nausea</li>
        <li>Unexplained first-time seizures in an adult</li>
        <li>Progressive weakness or loss of sensation on one side of the body</li>
        <li>Changes in speech clarity, vision, or spatial balance</li>
      </ul>
      <p><em>Medical Disclaimer: These symptoms can stem from various non-serious conditions. However, persistent or concerning symptoms should always be evaluated by a neuro specialist.</em></p>
    `
  },
  'art-2': {
    title: 'When Does Back Pain Need a Specialist?',
    category: 'Spine Health',
    content: `
      <p>Most back pain improves within a few weeks with rest and physical therapy. However, certain "red flag" symptoms indicate that a specialist neurosurgical spine evaluation is warranted.</p>
      <h4>Consult a Spine Specialist If You Experience:</h4>
      <ul>
        <li>Pain radiating down past your knees into your legs or feet</li>
        <li>Numbness, tingling, or progressive weakness in your legs</li>
        <li>Changes in bowel or bladder control (emergency)</li>
        <li>Back pain accompanied by unexplained weight loss or fever</li>
      </ul>
    `
  },
  'art-3': {
    title: 'Understanding Sciatica: Causes & Modern Care',
    category: 'Spine Education',
    content: `
      <p>Sciatica is a symptom rather than a diagnosis itself. It describes radiating nerve pain originating from nerve root irritation in the lumbar spine.</p>
      <p>Modern minimal access spine techniques allow targeted nerve decompression through keyhole incisions, helping patients return to daily activity faster.</p>
    `
  },
  'art-4': {
    title: 'What Is Minimally Invasive Spine Surgery?',
    category: 'Surgical Innovations',
    content: `
      <p>Minimally invasive spine surgery (MISS) utilizes specialized tubular retractors and endoscopes to reach the spine through micro-incisions without detaching major spinal muscles.</p>
      <h4>Key Patient Advantages:</h4>
      <ul>
        <li>Significantly smaller skin incisions</li>
        <li>Reduced postoperative pain and lower reliance on pain medications</li>
        <li>Shorter hospital stay and faster recovery back to work</li>
      </ul>
    `
  },
  'art-5': {
    title: 'Common Causes of Cervical Neck Pain',
    category: 'Spine Wellness',
    content: `
      <p>Modern lifestyle habits, prolonged screen time, and age-related disc degeneration are leading causes of cervical spine strain and nerve compression.</p>
    `
  },
  'art-6': {
    title: 'When Should You See a Neurosurgeon?',
    category: 'Patient Guidance',
    content: `
      <p>A neurosurgeon is a medical specialist trained in both non-surgical and surgical management of conditions affecting the central and peripheral nervous system (brain, spine, and nerves).</p>
      <p>Seeing a neurosurgeon does not mean you will automatically have surgery. In fact, a significant portion of spine and neurological conditions are managed conservatively with medication, therapy, and targeted monitoring.</p>
    `
  }
};

function initModals() {
  const modalOverlay = document.getElementById('globalModalOverlay');
  const modalContainer = document.getElementById('globalModalContent');
  const closeBtn = document.getElementById('modalCloseBtn');

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.openTreatmentModal = function(id) {
    const data = treatmentDetails[id];
    if (!data) return;

    modalContainer.innerHTML = `
      <span class="section-tag" style="margin-bottom:0.75rem;">${data.category}</span>
      <h3>${data.title}</h3>
      <div style="line-height:1.75; color:#334155;">
        ${data.content}
      </div>
      <div style="margin-top:2rem; padding-top:1.25rem; border-top:1px solid #cbd5e1; display:flex; justify-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <span style="font-size:0.825rem; color:#64748b;">Dr. Naveen’s Neuro-Spine Centre, Bengaluru</span>
        <button onclick="closeModal(); openAppointmentModalWithReason('${data.title}')" class="btn btn-gold btn-sm">Request Consultation</button>
      </div>
    `;
    openModal();
  };

  window.openArticleModal = function(id) {
    const data = articleDetails[id];
    if (!data) return;

    modalContainer.innerHTML = `
      <span class="section-tag tag-gold" style="margin-bottom:0.75rem;">${data.category}</span>
      <h3>${data.title}</h3>
      <div style="line-height:1.75; color:#334155;">
        ${data.content}
      </div>
      <div style="margin-top:2rem; padding-top:1.25rem; border-top:1px solid #cbd5e1; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.825rem; color:#64748b;">Patient Education Series</span>
        <button onclick="closeModal()" class="btn btn-outline-navy btn-sm">Close Article</button>
      </div>
    `;
    openModal();
  };

  window.openDoctorModal = function() {
    modalContainer.innerHTML = `
      <span class="section-tag tag-gold" style="margin-bottom:0.75rem;">Medical Director Profile</span>
      <h3>Dr. Naveen Mandya Appajigowda</h3>
      <p style="font-weight:700; color:#095465; margin-bottom:1rem;">Senior Consultant Neurosurgeon | Brain & Spine Specialist</p>
      
      <div style="background:#fef3c7; padding:1rem; border-radius:8px; border:1px solid #f59e0b; margin-bottom:1.25rem;">
        <h4 style="color:#92400e; margin-bottom:0.25rem; font-size:1rem;">🏆 Times Business Awards 2026 Winner</h4>
        <p style="color:#78350f; font-size:0.875rem;">Awarded <strong>Certificate of Excellence for Service Excellence in Neurosurgery</strong> by <em>The Times of India / Optimal Media Solution</em>.</p>
      </div>

      <div style="background:#f8fafc; padding:1.25rem; border-radius:8px; border:1px solid #e2e8f0; margin-bottom:1.5rem;">
        <h4 style="color:#0b1e36; margin-bottom:0.5rem;">Academic & International Qualifications:</h4>
        <ul style="margin-left:1.25rem; color:#334155; font-size:0.925rem;">
          <li><strong>MS</strong> - Master of Surgery</li>
          <li><strong>MCh (Neuro)</strong> - Magister Chirurgiae in Neurosurgery</li>
          <li><strong>FMAS</strong> - Fellow in Minimal Access Surgery</li>
          <li><strong>FMISS (Seoul)</strong> - Fellow in Minimally Invasive Spine Surgery (Seoul, South Korea)</li>
          <li><strong>FASS (USA)</strong> - Fellow of Association of Spine Surgeons (USA)</li>
          <li><strong>Visiting Fellow</strong> - Skull Base Endoscopy (UPMC, USA)</li>
        </ul>
      </div>

      <h4 style="color:#0b1e36; margin-bottom:0.5rem;">Senior Consultant & Academic Leadership:</h4>
      <p style="color:#475569; line-height:1.6; font-size:0.925rem; margin-bottom:0.5rem;">
        Senior Consultant - Spine & Neurosurgery at <strong>Gleneagles BGS Hospital</strong> (A Part of Fortis Healthcare Network), Kengeri, Bengaluru.
      </p>
      <p style="color:#475569; line-height:1.6; font-size:0.925rem; margin-bottom:1rem;">
        Keynote Speaker & International Delegate at the <strong>8th SENSP Annual Neurosurgical Conference</strong>.
      </p>

      <h4 style="color:#0b1e36; margin-bottom:0.5rem;">Clinical Focus & Philosophy:</h4>
      <p style="color:#475569; line-height:1.6; font-size:0.925rem; margin-bottom:1rem;">
        Dr. Naveen is dedicated to providing patient-centered, evidence-based neurosurgical care. Specializing in minimal access brain and spine techniques, his focus is on achieving optimal clinical outcomes while minimizing surgical trauma and recovery time.
      </p>

      <div style="font-size:0.8rem; color:#64748b; font-style:italic; border-top:1px solid #e2e8f0; padding-top:0.75rem;">
        Medical Council Registration and formal credentials are on official record at the clinic.
      </div>
    `;
    openModal();
  };

  window.openLegalModal = function(type) {
    let title = '';
    let body = '';

    if (type === 'disclaimer') {
      title = 'Medical Disclaimer';
      body = `
        <p>The information provided on this website is for general educational and awareness purposes only and does not constitute medical advice, diagnosis, or treatment planning.</p>
        <p>Submitting an online appointment request does not constitute a doctor-patient relationship or a confirmed appointment until reviewed and acknowledged by the clinic staff.</p>
        <p>If you believe you are experiencing a medical emergency, please visit the nearest hospital emergency department immediately.</p>
      `;
    } else if (type === 'privacy') {
      title = 'Privacy Policy';
      body = `
        <p>Dr. Naveen’s Neuro-Spine Centre respects patient privacy. Information submitted through our online appointment request form (such as name, contact number, and message) is used solely by our clinic team to contact you and schedule consultations.</p>
        <p>We do not sell, rent, or share personal contact details with third-party marketers.</p>
      `;
    } else {
      title = 'Terms & Conditions';
      body = `
        <p>By using this website, you agree to use the content for informative purposes. Consultation appointments are subject to clinic scheduling availability.</p>
      `;
    }

    modalContainer.innerHTML = `
      <h3>${title}</h3>
      <div style="line-height:1.75; color:#334155; font-size:0.95rem; margin-top:1rem;">
        ${body}
      </div>
      <div style="margin-top:2rem; text-align:right;">
        <button onclick="closeModal()" class="btn btn-navy btn-sm">Close</button>
      </div>
    `;
    openModal();
  };

  function openModal() {
    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.closeModal = closeModal;
}

window.openAppointmentModalWithReason = function(reason) {
  const reasonSelect = document.getElementById('appReason');
  if (reasonSelect) {
    if (reason.toLowerCase().includes('brain')) {
      reasonSelect.value = 'brain';
    } else if (reason.toLowerCase().includes('spine') || reason.toLowerCase().includes('sciatica')) {
      reasonSelect.value = 'spine';
    } else {
      reasonSelect.value = 'other';
    }
  }
  const formElement = document.getElementById('appointmentFormSection');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};

/* --------------------------------------------------------------------------
   5. Appointment Form Backend-Ready Interactive Logic
   -------------------------------------------------------------------------- */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const successBox = document.getElementById('formSuccessState');
  const refCodeSpan = document.getElementById('appRefCode');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('appName');
    const phoneInput = document.getElementById('appPhone');
    const dateInput = document.getElementById('appDate');

    // Simple validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
      showError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    if (!dateInput.value) {
      showError(dateInput, 'Please select a preferred date');
      isValid = false;
    } else {
      clearError(dateInput);
    }

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" style="width:20px; height:20px; animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2 a 10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Processing...
      `;

      setTimeout(() => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const refCode = `DNS-2026-${randomNum}`;

        if (refCodeSpan) refCodeSpan.innerText = refCode;

        form.style.display = 'none';
        if (successBox) successBox.classList.add('active');

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    }
  });

  function showError(input, msg) {
    input.classList.add('error');
    let parent = input.parentElement;
    let err = parent.querySelector('.form-error-text');
    if (!err) {
      err = document.createElement('div');
      err.className = 'form-error-text';
      parent.appendChild(err);
    }
    err.innerText = msg;
  }

  function clearError(input) {
    input.classList.remove('error');
    let parent = input.parentElement;
    let err = parent.querySelector('.form-error-text');
    if (err) err.remove();
  }
}

function initMinDatePicker() {
  const dateInput = document.getElementById('appDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

// Add CSS keyframe for spinner in script
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
