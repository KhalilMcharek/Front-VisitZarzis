// src/components/ActivityCard.jsx
import { Card } from "antd";
import { Link } from "react-router-dom";
import styles from "../styles/ActivityCard.module.css";

const { Meta } = Card;

const ActivityCard = ({ activity }) => {
  return (
    <Link to={`/activities/${activity._id}`} className={styles.cardLink}>
      <Card
        hoverable
        cover={
          <img
            alt={activity.title}
            src={activity.mainImage}
            className={styles.image}
          />
        }
        className={styles.card}
      >
        <Meta
          title={activity.title}
          description={`Organisé par : ${activity.manager?.name || "—"}`}
        />
      </Card>
    </Link>
  );
};

export default ActivityCard;
