import { features } from "../assets/features"
import FeatureItem from "./FeatureItem"
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