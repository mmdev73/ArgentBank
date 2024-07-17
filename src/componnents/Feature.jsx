import { features } from "../assets/features"
import FeatureItem from "./FeatureItem"
/**
 * Renders a section of features, each represented by a FeatureItem component.
 *
 * @return {JSX.Element} The rendered section of features.
 */
const Feature = () => {
    return <>
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {
                features && features.map((feature, index) => {
                    return <FeatureItem key={index} datas={feature} />
                })
            }
        </section>
    </>
}

export default Feature