import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import ActivityCard from "./ActivityCard";
import AddActivity from "./AddActivity";
import { fetchActivities } from "../redux/slices/activitiesSlice";
import api from "../utils/api";

const { Title } = Typography;

const ActivitiesList = ({ showControls = true }) => {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector((state) => state.activities);
  const [showAddModal, setShowAddModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Supprimer cette activité ?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/activities/${id}`);
      dispatch(fetchActivities());
    } catch (err) {
      console.error("Erreur de suppression :", err);
      alert("Échec de la suppression.");
    }
  };

  return (
    <div>
      {showControls && (
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>Mes Activités</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 border-none px-4 py-1.5 rounded-md shadow-md"
          >
            Ajouter
          </Button>
        </div>
      )}

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {showAddModal && (
        <AddActivity
          onClose={() => setShowAddModal(false)}
          onCreated={() => dispatch(fetchActivities())}
        />
      )}

      <Row gutter={[24, 24]}>
        {activities.map((activity) => (
          <Col key={activity._id} xs={24} sm={12} md={8} lg={6}>
            <div style={{ position: "relative" }}>
              <ActivityCard activity={activity} />
              {showControls &&
                (user?.role === "admin" || user?.id === activity.manager?._id) && (
                  <div className="absolute top-2 right-2">
                    <Button
                      danger
                      onClick={() => handleDelete(activity._id)}
                      icon={<DeleteFilled />}
                      size="middle"
                    />
                  </div>
                )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ActivitiesList;
