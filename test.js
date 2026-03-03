const quizCards = document.querySelectorAll('.quiz-card');
const progressBar = document.getElementById('progressBar');
const questionCounter = document.getElementById('questionCounter');
const questionPercent = document.getElementById('questionPercent');
const quizResult = document.getElementById('quizResult');
const totalQuestions = quizCards.length;

let currentQuestion = 0;
let score = 0;
let affectedAreas = [];

// Map each question to a coaching benefit
const coachingHelp = {
  'Loss of Control':       'developing structure and boundaries around your behaviour',
  'Difficulty Stopping':   'building a practical, step-by-step plan to reduce and stop',
  'Time & Energy':         'reclaiming your time and redirecting your energy positively',
  'Responsibilities':      'getting back on top of your daily responsibilities with a clear routine',
  'Physical & Mental Health': 'understanding the impact on your health and building healthier habits',
  'Cravings':              'learning proven techniques to manage and reduce cravings',
  'Withdrawal':            'safely navigating withdrawal with the right support and guidance',
  'Emotional Coping':      'developing healthier emotional coping strategies that actually work',
  'Secrecy':               'breaking free from the isolation and shame that comes with hiding',
  'Relationships':         'repairing and rebuilding the relationships that matter most to you',
  'Enjoyment of Life':     'rediscovering joy and meaning in everyday life beyond the addiction',
  'Self-Care':             'rebuilding a foundation of sleep, nutrition, and self-care',
  'Guilt & Shame':         'releasing guilt and shame and learning to treat yourself with compassion'
};

// Show first question
quizCards[0].classList.add('active');

quizCards.forEach((card, index) => {
  const buttons = card.querySelectorAll('.answer-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = parseInt(btn.dataset.value);
      const area = card.dataset.area;

      if (value === 1) {
        score++;
        affectedAreas.push(area);
      }

      // Hide current
      card.classList.remove('active');
      currentQuestion++;

      // Update progress
      const percent = Math.round((currentQuestion / totalQuestions) * 100);
      progressBar.style.width = percent + '%';

      if (questionCounter) {
        questionCounter.textContent = currentQuestion < totalQuestions
          ? `Question ${currentQuestion + 1} of ${totalQuestions}`
          : `Complete`;
      }
      if (questionPercent) {
        questionPercent.textContent = percent + '% complete';
      }

      if (currentQuestion < totalQuestions) {
        quizCards[currentQuestion].classList.add('active');
      } else {
        showResult();
      }
    });
  });
});

function showResult() {
  // Hide the form
  document.getElementById('quizForm').style.display = 'none';

  // Show results section
  quizResult.style.display = 'block';

  // --- Result level ---
  let level, levelClass, headline, intro;

  if (score >= 10) {
    level = 'Significant Impact';
    levelClass = 'result-level--high';
    headline = "Your results suggest your habits are significantly affecting your life.";
    intro = "First — thank you for your honesty. That takes real courage. Your answers show that this is touching many areas of your life right now, and that can feel overwhelming. But you don't have to figure this out alone. The fact that you're here, taking this test, is already a meaningful step forward.";
  } else if (score >= 6) {
    level = 'Moderate Impact';
    levelClass = 'result-level--moderate';
    headline = "Your results suggest your habits are having a noticeable impact on your wellbeing.";
    intro = "Thank you for being honest with yourself — that's not easy. Your answers suggest that while things may not feel completely out of control, there are some real patterns worth paying attention to. With the right support, these patterns can absolutely be changed.";
  } else if (score >= 3) {
    level = 'Mild Impact';
    levelClass = 'result-level--mild';
    headline = "Your results suggest your habits are beginning to affect some areas of your life.";
    intro = "It's great that you're checking in with yourself. Your answers suggest some early patterns that, left unaddressed, can grow over time. The good news is that catching things early makes change so much easier — and gentler.";
  } else {
    level = 'Low Impact';
    levelClass = 'result-level--low';
    headline = "Your results suggest you have a healthy level of control over your habits right now.";
    intro = "That's genuinely positive. Your answers don't suggest significant concern at this time. If something still doesn't feel right or you'd simply like some guidance, we're always here for a conversation — no problem is too small.";
  }

  // Render result header
  document.getElementById('resultHeader').innerHTML = `
    <div class="result-level ${levelClass}">${level}</div>
    <h2>${headline}</h2>
    <p class="result-intro">${intro}</p>
  `;

  // --- Affected areas ---
  const areasEl = document.getElementById('resultAreas');

  if (affectedAreas.length > 0) {
    const areaItems = affectedAreas.map(area => `
      <div class="result-area-tag">
        <span class="result-area-dot"></span>
        ${area}
      </div>
    `).join('');

    areasEl.innerHTML = `
      <div class="result-areas-box">
        <h3>Areas your answers highlighted</h3>
        <p>Based on your responses, your habits may be affecting you in the following areas:</p>
        <div class="result-area-tags">${areaItems}</div>
      </div>
    `;
  } else {
    areasEl.innerHTML = '';
  }

  // --- How coaching can help ---
  const coachingEl = document.getElementById('resultCoaching');

  if (affectedAreas.length > 0) {
    const helpItems = affectedAreas.map(area => {
      const help = coachingHelp[area];
      return help ? `<li>→ ${help}</li>` : '';
    }).join('');

    coachingEl.innerHTML = `
      <div class="result-coaching-box">
        <h3>How Gentle Steps coaching can help you</h3>
        <p>Based on what you've shared, working with a Gentle Steps coach could support you in:</p>
        <ul class="result-coaching-list">${helpItems}</ul>
        <p class="result-coaching-close">Every session is private, personalised, and built around you — not a programme, not a script. Just real, human support.</p>
      </div>
    `;
  } else {
    coachingEl.innerHTML = `
      <div class="result-coaching-box">
        <h3>You're in a good place — let's keep it that way</h3>
        <p>Even without significant concerns right now, coaching can be a powerful tool for building resilience, self-awareness, and long-term wellbeing. We're here whenever you need us.</p>
      </div>
    `;
  }

  // Scroll to results
  quizResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
}