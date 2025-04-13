import { Link } from "react-router-dom";
import styles from "../styles/ActivityCard.module.css";

const ActivityCard = ({ activity }) => {
    console.log("Activity reçue :", activity);
  return (
    <Link to={`/activities/${activity._id}`} className={styles.card}>
      <img
        src={activity.mainImage}
        alt={activity.title}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3>{activity.title}</h3>
        <p>Organisé par : {activity.manager?.name || "—"}</p>
      </div>
    </Link>
  );
};


export default ActivityCard;
