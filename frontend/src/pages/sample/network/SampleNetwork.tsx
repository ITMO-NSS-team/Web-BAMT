import { useAppSelector } from "../../../hooks/redux";
import SampleNetworkItem from "./item/SampleNetworkItem";
import scss from "./sampleNetwork.module.scss";

const SampleNetwork = () => {
  const { networks } = useAppSelector((state) => state.sample);

  return (
    <section>
      <h2 className={scss.title}>Network</h2>
      <ul className={scss.list}>
        {networks.map((_, index) => (
          <li key={index} className={scss.item}>
            <SampleNetworkItem index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SampleNetwork;
