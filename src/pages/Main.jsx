import Feature from "../componnents/Feature"

/**
 * Renders the main component of the application.('/' route)
 *
 * @return {JSX.Element} The main component JSX element.
 */
const Main = () => {
    return <div className="content__container main">
                <div className="hero">
                    <section className="hero__content">
                      <h2 className="sr-only">Promoted Content</h2>
                      <p className="hero__content__subtitle">No fees.</p>
                      <p className="hero__content__subtitle">No minimum deposit.</p>
                      <p className="hero__content__subtitle">High interest rates.</p>
                      <p className="hero__content__text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <Feature />
            </div>
}

export default Main