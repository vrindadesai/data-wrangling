(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const isHome = page === 'index.html' || page === '';
  const isSyllabus = page === 'syllabus.html';

  document.querySelector('.sidebar').innerHTML = `
    <div class="sidebar-header">
      <a href="index.html">
        <div>
          <div class="site-title">Data Wrangling</div>
          <div class="site-sub">
            <a href="https://www.ncssm.edu/summer/summer-accelerator" target="_blank" class="sidebar-sub-link">NCSSM Summer Accelerator 2026</a>
          </div>
        </div>
      </a>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Course</div>
      <a href="index.html"${isHome ? ' class="active"' : ''}>🏠 Home</a>
      <a href="index.html#schedule">📆 Schedule</a>
      <a href="syllabus.html"${isSyllabus ? ' class="active"' : ''}>📖 Syllabus</a>
      <a href="https://www.gradescope.com/courses/1326648" target="_blank">🏆 Gradescope</a>
      <a href="https://campuswire.com/c/GA4196760/feed" target="_blank">💬 Campuswire</a>
    </nav>
  `;
})();
