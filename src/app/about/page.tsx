const About = () => {
  return (
    <>
      <header>
        <h1></h1>
      </header>

      <section>
        <div className="container">
          <div className="bg-theme-light px-7 py-20 dark:bg-darkmode-theme-light text-center rounded-md">
            <h2>Reasons to shop with us</h2>
            <div className="row justify-center gap-6 mt-14">
              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <svg className="icon icon-headset" width="48" height="48">
                    <use href="#headset"></use>
                  </svg>
                </div>
                <h3 className="md:h4 mt-6 mb-4">24/7 Friendly Support</h3>
                <p>Our support team always ready for you to 7 days a week</p>
              </div>
              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <svg className="icon icon-box" width="48" height="48">
                    <use href="#box"></use>
                  </svg>
                </div>
                <h3 className="md:h4 mt-6 mb-4">7 Days Easy Return</h3>
                <p>
                  Product any fault within 7 days for an immediately exchange.
                </p>
              </div>
              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <svg
                    className="icon icon-check-circle"
                    width="48"
                    height="48"
                  >
                    <use href="#check-circle"></use>
                  </svg>
                </div>
                <h3 className="md:h4 mt-6 mb-4">Quality Guaranteed</h3>
                <p>
                  If your product are not perfect, return them for a full refund
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
