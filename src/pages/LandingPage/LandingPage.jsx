import "./LandingPage.css";

const LandingPage = ({ onLogin, onSignup }) => {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}
      <header className="landing-navbar">
        <div className="landing-container navbar-inner">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="brand-mark">T</span>
            <span className="brand-name">TaskFlow</span>
          </button>

          <nav className="navbar-actions">
            <button className="nav-login" onClick={onLogin}>
              Login
            </button>

            <button className="nav-signup" onClick={onSignup}>
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main>

        <section className="hero-section">
          <div className="landing-container hero-content">

            <div className="hero-badge">
              <span className="badge-dot"></span>
              Simple productivity for focused work
            </div>

            <h1>
              Organize your work.
              <br />
              <span>Focus on what matters.</span>
            </h1>

            <p className="hero-description">
              TaskFlow helps you organize tasks, manage projects,
              track deadlines, and understand your progress —
              all in one simple workspace.
            </p>

            <div className="hero-actions">
              <button className="hero-primary" onClick={onSignup}>
                Get Started
                <span>→</span>
              </button>

              <button
                className="hero-secondary"
                onClick={() =>
                  document
                    .getElementById("product-preview")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works
              </button>
            </div>

          </div>
        </section>


        {/* ================= WHAT IS TASKFLOW ================= */}
        <section className="intro-section">
          <div className="landing-container">

            <div className="section-heading centered">
              <span className="section-label">TASKFLOW</span>

              <h2>
                Everything you need to
                <br />
                <span>stay organized.</span>
              </h2>

              <p>
                A simple workspace designed to help you turn
                your plans into completed work.
              </p>
            </div>


            <div className="feature-grid">

              <article className="feature-item">
                <div className="feature-number">01</div>
                <h3>Tasks</h3>
                <p>
                  Create and manage your daily tasks with
                  priorities, due dates, and completion status.
                </p>
              </article>

              <article className="feature-item">
                <div className="feature-number">02</div>
                <h3>Projects</h3>
                <p>
                  Group related tasks into projects so your
                  larger goals stay organized.
                </p>
              </article>

              <article className="feature-item">
                <div className="feature-number">03</div>
                <h3>Deadlines</h3>
                <p>
                  Keep track of upcoming deadlines and
                  understand what needs your attention today.
                </p>
              </article>

              <article className="feature-item">
                <div className="feature-number">04</div>
                <h3>Progress</h3>
                <p>
                  See your completed work and project progress
                  so you always know where you stand.
                </p>
              </article>

            </div>
          </div>
        </section>


        {/* ================= PRODUCT PREVIEW ================= */}
        <section className="product-section" id="product-preview">

          <div className="landing-container">

            <div className="section-heading centered product-heading">
              <span className="section-label">SEE TASKFLOW IN ACTION</span>

              <h2>
                Your work,
                <br />
                <span>all in one place.</span>
              </h2>

              <p>
                Explore the main areas of TaskFlow and see how
                each part helps you manage your work.
              </p>
            </div>


            {/* DASHBOARD */}
            <div className="product-row">

              <div className="product-image-wrapper">
                <div className="screenshot-frame">
                  <div className="browser-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <img
                    src="/screenshots/dashboard.png"
                    alt="TaskFlow Dashboard"
                  />
                </div>
              </div>

              <div className="product-copy">

                <span className="product-number">01</span>

                <h3>
                  Understand your work
                  <br />
                  at a glance.
                </h3>

                <p>
                  The Dashboard gives you a clear overview of
                  your tasks, projects, progress, and upcoming
                  work without making you search through different
                  screens.
                </p>

                <ul>
                  <li>Overview of your tasks</li>
                  <li>Project progress</li>
                  <li>Pending and completed work</li>
                  <li>Quick access to important actions</li>
                </ul>

              </div>
            </div>


            {/* TODAY */}
            <div className="product-row reverse">

              <div className="product-image-wrapper">
                <div className="screenshot-frame">
                  <div className="browser-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <img
                    src="/screenshots/today.png"
                    alt="TaskFlow Today page"
                  />
                </div>
              </div>

              <div className="product-copy">

                <span className="product-number">02</span>

                <h3>
                  Know what needs
                  <br />
                  your attention today.
                </h3>

                <p>
                  The Today page focuses only on the work
                  that matters right now. See today's tasks,
                  completion progress, and what is still left.
                </p>

                <ul>
                  <li>Today's tasks</li>
                  <li>Completed work</li>
                  <li>Remaining tasks</li>
                  <li>Daily progress</li>
                </ul>

              </div>
            </div>


            {/* PROJECTS */}
            <div className="product-row">

              <div className="product-image-wrapper">
                <div className="screenshot-frame">
                  <div className="browser-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <img
                    src="/screenshots/projects.png"
                    alt="TaskFlow Projects page"
                  />
                </div>
              </div>

              <div className="product-copy">

                <span className="product-number">03</span>

                <h3>
                  Keep related work
                  <br />
                  together.
                </h3>

                <p>
                  Projects help you organize multiple related
                  tasks under one goal. You can see how much
                  work is completed and what still needs to be done.
                </p>

                <ul>
                  <li>Create projects for larger goals</li>
                  <li>Add related tasks</li>
                  <li>Track project completion</li>
                  <li>Edit or manage projects anytime</li>
                </ul>

              </div>
            </div>


            {/* CALENDAR */}
            <div className="product-row reverse">

              <div className="product-image-wrapper">
                <div className="screenshot-frame">
                  <div className="browser-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <img
                    src="/screenshots/calendar.png"
                    alt="TaskFlow Calendar page"
                  />
                </div>
              </div>

              <div className="product-copy">

                <span className="product-number">04</span>

                <h3>
                  See your deadlines
                  <br />
                  visually.
                </h3>

                <p>
                  The Calendar gives you a timeline of your
                  tasks so you can understand what is coming
                  next and plan your work more effectively.
                </p>

                <ul>
                  <li>View tasks by date</li>
                  <li>Understand upcoming deadlines</li>
                  <li>Track scheduled work</li>
                  <li>Plan your workload</li>
                </ul>

              </div>
            </div>

          </div>
        </section>


        {/* ================= PROJECT EXPLANATION ================= */}
        <section className="project-explanation">

          <div className="landing-container">

            <div className="section-heading centered">
              <span className="section-label">PROJECTS & TASKS</span>

              <h2>
                Not every task needs
                <br />
                <span>a project.</span>
              </h2>

              <p>
                TaskFlow keeps the relationship between
                projects and tasks simple.
              </p>
            </div>


            <div className="project-explanation-grid">

              <div className="relationship-card">
                <span className="relationship-icon">01</span>

                <h3>Project</h3>

                <p>
                  Use a project when several tasks belong
                  to the same goal or piece of work.
                </p>

                <div className="relationship-example">
                  <strong>Website Project</strong>
                  <span>→ Design homepage</span>
                  <span>→ Build login page</span>
                  <span>→ Write documentation</span>
                </div>
              </div>


              <div className="relationship-card">
                <span className="relationship-icon">02</span>

                <h3>No Project</h3>

                <p>
                  Independent tasks don't need to belong
                  to a project. You can simply create them.
                </p>

                <div className="relationship-example">
                  <strong>Personal Task</strong>
                  <span>→ Update resume</span>
                  <span>→ Read documentation</span>
                  <span>→ Check emails</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ================= HOW TO GET STARTED ================= */}
        <section className="steps-section">

          <div className="landing-container">

            <div className="section-heading centered">
              <span className="section-label">GET STARTED</span>

              <h2>
                Start organizing
                <br />
                <span>in a few simple steps.</span>
              </h2>

              <p>
                You don't need to learn a complicated system.
                Just create your account and start working.
              </p>
            </div>


            <div className="steps-grid">

              <div className="step">
                <span className="step-number">01</span>
                <h3>Sign Up</h3>
                <p>
                  Create your TaskFlow account in a few moments.
                </p>
              </div>

              <div className="step">
                <span className="step-number">02</span>
                <h3>Create a Project</h3>
                <p>
                  Optional — create a project when your work
                  contains multiple related tasks.
                </p>
              </div>

              <div className="step">
                <span className="step-number">03</span>
                <h3>Add Tasks</h3>
                <p>
                  Add tasks, priorities, due dates, and project
                  information.
                </p>
              </div>

              <div className="step">
                <span className="step-number">04</span>
                <h3>Track Progress</h3>
                <p>
                  Complete tasks and use TaskFlow to understand
                  your progress.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ================= FINAL CTA ================= */}
        <section className="final-cta-section">

          <div className="landing-container">

            <div className="final-cta">

              <span className="section-label">READY?</span>

              <h2>
                Organize your work.
                <br />
                <span>Get things done.</span>
              </h2>

              <p>
                Start using TaskFlow and bring your tasks,
                projects, and deadlines together.
              </p>

              <button
                className="final-cta-button"
                onClick={onSignup}
              >
                Create Account
                <span>→</span>
              </button>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">

        <div className="landing-container footer-inner">

          <div className="footer-brand">
            <span className="brand-mark">T</span>
            <span>TaskFlow</span>
          </div>

          <p>
            Simple task and project management.
          </p>

          <span className="footer-copy">
            © {new Date().getFullYear()} TaskFlow
          </span>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;