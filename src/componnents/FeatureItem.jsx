

/**
 * Renders a feature item component.
 *
 * @param {Object} datas - Data for the feature item.
 * @return {JSX.Element} The feature item component.
 */
const FeatureItem = ({ datas }) => {

    return <>
        <div className="feature__item">
            <img src={datas.icon} alt={datas.iconAlt} className="feature__item__icon" />
            <h3 className="feature__item__title">{datas.title}</h3>
            <p className="feature__item__text">{datas.description}</p>
        </div>
    </>
}

export default FeatureItem